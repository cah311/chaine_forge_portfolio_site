"use server";

import { persistLead } from "@/lib/leads";
import { buildNurtureUrls, sendQuizNurtureSequence } from "@/lib/nurture";
import { parseQuizVariant } from "@/lib/quiz/names";
import {
  computeQuizScore,
  leakCategories,
  type LeakCategoryId,
  type QuizAnswers,
} from "@/lib/quiz/scoring";
import { signQuizResult } from "@/lib/quiz/token";
import {
  industryOptions,
  sizeOptions,
} from "@/lib/qualification";

export type QuizSubmitState = {
  ok: boolean;
  msg: string;
  token?: string;
  resultsPath?: string;
};

function isEmail(v: string) {
  return /^[^@]+@[^@]+\.[^@]+$/.test(v);
}

export async function submitQuizLead(
  _prev: QuizSubmitState,
  fd: FormData,
): Promise<QuizSubmitState> {
  const email = String(fd.get("email") ?? "").trim().toLowerCase();
  const industry = String(fd.get("industry") ?? "").trim();
  const teamSize = String(fd.get("teamSize") ?? "").trim();
  const adminHours = String(fd.get("adminHours") ?? "").trim();
  const hourlyValue = String(fd.get("hourlyValue") ?? "").trim();
  const categoriesRaw = String(fd.get("categories") ?? "").trim();
  const variant = parseQuizVariant(String(fd.get("variant") ?? ""));
  const utmSource = String(fd.get("utmSource") ?? "").trim() || undefined;
  const utmMedium = String(fd.get("utmMedium") ?? "").trim() || undefined;
  const utmCampaign = String(fd.get("utmCampaign") ?? "").trim() || undefined;
  const referrer = String(fd.get("referrer") ?? "").trim() || undefined;

  if (!isEmail(email)) {
    return { ok: false, msg: "Add a valid email so we can send your breakdown." };
  }
  if (!(industryOptions as readonly string[]).includes(industry)) {
    return { ok: false, msg: "Select your industry." };
  }
  if (!(sizeOptions as readonly string[]).includes(teamSize)) {
    return { ok: false, msg: "Select your team size." };
  }
  if (!adminHours || !hourlyValue) {
    return { ok: false, msg: "Finish the quiz questions before unlocking results." };
  }

  const validIds = new Set(leakCategories.map((c) => c.id));
  const categories = categoriesRaw
    .split(",")
    .map((s) => s.trim())
    .filter((id): id is LeakCategoryId => validIds.has(id as LeakCategoryId));

  const answers: QuizAnswers = {
    industry,
    teamSize,
    adminHours,
    hourlyValue,
    categories,
    variant,
    utmSource,
    utmMedium,
    utmCampaign,
    referrer,
  };

  const score = computeQuizScore(answers);
  const payload = {
    email,
    answers,
    score,
    createdAt: new Date().toISOString(),
  };
  const token = signQuizResult(payload);
  const urls = buildNurtureUrls(token);

  const tag =
    score.outcome === "pay"
      ? "QUIZ — QUALIFIED"
      : score.outcome === "nurture_conflict"
        ? "QUIZ — CONFLICT PAUSE"
        : "QUIZ — NURTURE SIZE";

  await persistLead({
    email,
    source: "quiz",
    outcome: score.outcome,
    industry,
    teamSize,
    quizVariant: variant,
    monthlyCostMid: score.monthlyCostMid,
    hoursLow: score.hoursLow,
    hoursHigh: score.hoursHigh,
    utmSource,
    utmMedium,
    utmCampaign,
    referrer,
    tags: [tag],
    notifyExtra: `Score: ${score.hoursLow}–${score.hoursHigh} hrs/wk
Monthly: $${score.monthlyLow}–$${score.monthlyHigh}
Mid: $${score.monthlyCostMid}/mo
Results: ${urls.resultsUrl}
Categories: ${score.categories.map((c) => c.label).join(", ")}`,
  });

  await sendQuizNurtureSequence({
    email,
    score,
    variant,
    ...urls,
  });

  return {
    ok: true,
    msg: "Breakdown unlocked. We also emailed it to you.",
    token,
    resultsPath: `/time-leak/results?t=${encodeURIComponent(token)}`,
  };
}
