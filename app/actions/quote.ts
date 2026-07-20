"use server";

import { Resend } from "resend";
import {
  classifyQualification,
  type QualificationOutcome,
} from "@/lib/qualification";
import { site } from "@/lib/site";

export type QuoteState = {
  ok: boolean;
  msg: string;
  outcome?: QualificationOutcome | null;
};

export async function submitQuote(
  _prev: QuoteState,
  fd: FormData,
): Promise<QuoteState> {
  const w1 = String(fd.get("workflow1") ?? "").trim();
  const w2 = String(fd.get("workflow2") ?? "").trim();
  const w3 = String(fd.get("workflow3") ?? "").trim();
  const email = String(fd.get("email") ?? "").trim();
  const teamSize = String(fd.get("teamSize") ?? "").trim();
  const industry = String(fd.get("industry") ?? "").trim();
  const revenue = String(fd.get("revenue") ?? "").trim();
  const interest = String(fd.get("sku") ?? "").trim();
  const timeline = String(fd.get("timeline") ?? "").trim();
  const links = String(fd.get("links") ?? "").trim();

  if (!w1 || !w2 || !w3) {
    return {
      ok: false,
      msg: "Name three manual workflows — that’s how we know there’s real work to assess.",
      outcome: null,
    };
  }
  if (!teamSize) {
    return { ok: false, msg: "Select your team size.", outcome: null };
  }
  if (!industry) {
    return { ok: false, msg: "Select your industry.", outcome: null };
  }
  if (!revenue) {
    return { ok: false, msg: "Select a revenue band.", outcome: null };
  }
  if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
    return {
      ok: false,
      msg: "Add a valid email so we can reply.",
      outcome: null,
    };
  }

  const outcome = classifyQualification(teamSize, industry);
  const tag =
    outcome === "pay"
      ? "READY TO PAY"
      : outcome === "nurture_conflict"
        ? "FUTURE PROSPECT — conflict pause"
        : "NURTURE — outside 2–20 ICP";

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: site.resendFrom,
      to: site.contactEmail,
      replyTo: email,
      subject: `[${tag}] Assessment — ${industry}`,
      text: `Status: ${tag}
Outcome: ${outcome}

Email: ${email}
Industry: ${industry}
Team size: ${teamSize}
Revenue: ${revenue}
Interest: ${interest}
Timeline: ${timeline}
Links: ${links || "—"}

Manual workflows:
1. ${w1}
2. ${w2}
3. ${w3}`,
    });

    if (outcome === "nurture_conflict") {
      return {
        ok: true,
        outcome,
        msg: "Thanks — you're on our shortlist for when we open this vertical.",
      };
    }
    if (outcome === "nurture_size") {
      return {
        ok: true,
        outcome,
        msg: "Thanks — we've got your details. We'll follow up with what fits your size.",
      };
    }
    return {
      ok: true,
      outcome: "pay",
      msg: "Request received. Pay below to lock your assessment slot.",
    };
  } catch {
    return {
      ok: false,
      msg: `Something broke — email ${site.contactEmail} directly.`,
      outcome: null,
    };
  }
}
