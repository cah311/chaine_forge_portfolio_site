import { Resend } from "resend";
import { absoluteUrl, site } from "@/lib/site";
import { formatCad, type QuizScore } from "@/lib/quiz/scoring";
import { getQuizName, type QuizNameVariant } from "@/lib/quiz/names";

export type NurtureContext = {
  email: string;
  firstName?: string;
  score: QuizScore;
  variant: QuizNameVariant;
  resultsUrl: string;
  assessmentUrl: string;
  sampleReportUrl: string;
};

type NurtureStepId =
  | "results"
  | "case_study"
  | "sample_deep"
  | "objections"
  | "capacity"
  | "last_nudge";

type NurtureStep = {
  id: NurtureStepId;
  /** Days after capture (0 = immediate). */
  dayOffset: number;
};

export const nurtureSteps: NurtureStep[] = [
  { id: "results", dayOffset: 0 },
  { id: "case_study", dayOffset: 2 },
  { id: "sample_deep", dayOffset: 4 },
  { id: "objections", dayOffset: 7 },
  { id: "capacity", dayOffset: 10 },
  { id: "last_nudge", dayOffset: 14 },
];

function greeting(ctx: NurtureContext) {
  return ctx.firstName ? `Hi ${ctx.firstName},` : "Hi,";
}

export function nurtureSubject(id: NurtureStepId, ctx: NurtureContext): string {
  const name = getQuizName(ctx.variant).name;
  switch (id) {
    case "results":
      return `Your ${name}: ${ctx.score.hoursLow}–${ctx.score.hoursHigh} hrs/week leaking`;
    case "case_study":
      return `What ${formatCad(2900)}/mo of reclaimable time looks like on paper`;
    case "sample_deep":
      return "The section most people skip — and shouldn't";
    case "objections":
      return `"Can't I just ask ChatGPT?" — honest answer`;
    case "capacity":
      return site.assessmentOfferTier === "founding"
        ? "Founding Five slots are finite — and that's the point"
        : "Assessment capacity this month";
    case "last_nudge":
      return `Still leaking ~${formatCad(ctx.score.monthlyCostMid)}/mo?`;
  }
}

export function nurtureBody(id: NurtureStepId, ctx: NurtureContext): string {
  switch (id) {
    case "results":
      return resultsEmailBody(ctx);
    case "case_study":
      return `${greeting(ctx)}

Your Time-Leak Score put you around ${ctx.score.hoursLow}–${ctx.score.hoursHigh} hours/week (${formatCad(ctx.score.monthlyLow)}–${formatCad(ctx.score.monthlyHigh)}/mo).

Here's a complete sample of what the paid AI Tools Assessment delivers for a business in that range — fictional landscaping company, real process, every number sourced:

${ctx.sampleReportUrl}

They landed at seven reclaimable hours/week (~${formatCad(2900)}/mo). The free score tells you the leak exists. The assessment maps exactly where it is, which tools to use, a 4-day quick-start, and guarantees five hours/week or your money back.

Book here (fee fully credited toward any build within 90 days):
${ctx.assessmentUrl}

— Chain Forge Labs`;
    case "sample_deep":
      return `${greeting(ctx)}

In every assessment we refuse tools as carefully as we recommend them.

In the sample report, Section 05 lists four tools we would not recommend for that business — including a $230/mo "industry standard" — with the exact reason and the trigger that would reverse it.

That's the judgment you're buying. Read it here:
${ctx.sampleReportUrl}

Your score again: ${ctx.score.hoursLow}–${ctx.score.hoursHigh} hrs/week leaking.
Full breakdown: ${ctx.resultsUrl}

Ready for the map + guarantee?
${ctx.assessmentUrl}

— Chain Forge Labs`;
    case "objections":
      return `${greeting(ctx)}

You can. Most of our clients already did.

ChatGPT doesn't inventory your Jobber + QuickBooks + Gmail stack, sit on a recorded discovery call, refuse tools that don't fit, or refund you if it can't find five reclaimable hours a week.

The free Time-Leak Score already showed you're likely leaving ${formatCad(ctx.score.monthlyCostMid)}/mo on the table. The assessment's job is different: the exact map, the 4-day plan, and a guarantee with teeth.

${ctx.assessmentUrl}

Fee: ${site.assessmentActivePrice} ${site.currency}${site.assessmentOfferTier !== "standing" ? ` · ${site.assessmentTierLabel}` : ""}. Fully credited toward any build within 90 days.

— Chain Forge Labs`;
    case "capacity":
      return `${greeting(ctx)}

${site.availability}.

We keep assessment volume low on purpose — hand-built reports, not a PDF mill. If your score (${ctx.score.hoursLow}–${ctx.score.hoursHigh} hrs/week) is in the right neighborhood, the next step is the paid assessment:

${ctx.assessmentUrl}

Or revisit your breakdown anytime:
${ctx.resultsUrl}

— Chain Forge Labs`;
    case "last_nudge":
      return `${greeting(ctx)}

Quick math from your score: doing nothing costs about ${formatCad(ctx.score.monthlyCostMid)} this month and ${formatCad(ctx.score.annualCostMid)} over a year.

The free tool revealed the problem. The AI Tools Assessment builds the fix plan — with a 5-hours-a-week guarantee and the fee credited toward implementation.

Last link in this sequence (reply "stop" to opt out):
${ctx.assessmentUrl}

— Chain Forge Labs`;
  }
}

export function resultsEmailBody(ctx: NurtureContext): string {
  const name = getQuizName(ctx.variant).name;
  const cats = ctx.score.categories
    .map(
      (c) =>
        `• ${c.label}: ${c.hoursLow}–${c.hoursHigh} hrs/week (~${formatCad(c.monthlyLow)}–${formatCad(c.monthlyHigh)}/mo)`,
    )
    .join("\n");

  return `${greeting(ctx)}

Here's your ${name} breakdown.

${ctx.score.summaryLine}
${ctx.score.deprivationLine}

Top leak categories:
${cats}

Full results (bookmark this):
${ctx.resultsUrl}

Important: the free score only reveals that the leak exists and roughly how big it is. It does not tell you which tools to buy, what to build, or guarantee the hours back.

That's the AI Tools Assessment (${site.assessmentActivePrice} ${site.currency}${site.assessmentOfferTier !== "standing" ? ` · ${site.assessmentTierLabel}` : ""}):
• Exact map of where the hours hide
• Tool recommendations with cost / setup / time saved
• 4-day quick-start plan
• 5 hours/week identified — or a full refund
• Fee fully credited toward any build within 90 days

Book here:
${ctx.assessmentUrl}

Sample of the full deliverable:
${ctx.sampleReportUrl}

— Chain Forge Labs
${site.url}`;
}

function addDays(iso: string, days: number) {
  const d = new Date(iso);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString();
}

export async function sendQuizNurtureSequence(ctx: NurtureContext) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { sent: 0, scheduled: 0, error: "RESEND_API_KEY missing" as const };
  }

  const resend = new Resend(apiKey);
  const now = new Date().toISOString();
  let sent = 0;
  let scheduled = 0;

  try {
    await resend.emails.send({
      from: site.resendFrom,
      to: ctx.email,
      subject: nurtureSubject("results", ctx),
      text: nurtureBody("results", ctx),
    });
    sent += 1;
  } catch {
    return { sent, scheduled, error: "results_send_failed" as const };
  }

  for (const step of nurtureSteps.filter((e) => e.dayOffset > 0)) {
    try {
      await resend.emails.send({
        from: site.resendFrom,
        to: ctx.email,
        subject: nurtureSubject(step.id, ctx),
        text: nurtureBody(step.id, ctx),
        scheduledAt: addDays(now, step.dayOffset),
      });
      scheduled += 1;
    } catch {
      // Continue scheduling remaining steps.
    }
  }

  return { sent, scheduled, error: null };
}

export function buildNurtureUrls(token: string) {
  return {
    resultsUrl: absoluteUrl(
      `/time-leak/results?t=${encodeURIComponent(token)}`,
    ),
    assessmentUrl: absoluteUrl("/#assessment"),
    sampleReportUrl: absoluteUrl("/sample-report"),
  };
}
