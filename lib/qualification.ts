/** Shared qualification rules for the assessment form. */

export const interestOptions = [
  "AI Tools Assessment",
  "Assessment → likely build",
  "AI Concierge",
  "MVP / custom build",
  "Not sure yet",
] as const;

export const sizeOptions = [
  "Just me / solo",
  "2–5 people",
  "6–20 people",
  "21–50 people",
  "50+",
] as const;

/** Ideal ICP for paid assessments today. */
export const icpSizeOptions = new Set<string>(["2–5 people", "6–20 people"]);

export const revenueOptions = [
  "Under $250k CAD",
  "$250k–$1M CAD",
  "$1M–$5M CAD",
  "$5M+ CAD",
  "Prefer not to say",
] as const;

export const timelineOptions = [
  "This month",
  "Next 1–2 months",
  "This quarter",
  "Just exploring",
] as const;

/**
 * Industries we pause while Chain Forge is a side gig (day-job conflict).
 * Not a permanent decline — capture as future prospects and circle back.
 */
export const deferredConflictIndustries = [
  "Financial advisor / wealth management",
  "Physician or dentist wealth / financial planning",
  "Medical or dental practice (operations)",
] as const;

export const industryOptions = [
  "Trades / contracting",
  "Professional services (law, accounting, consulting)",
  "Retail / e-commerce",
  "Real estate",
  "Hospitality / food service",
  "Manufacturing / distribution",
  "Nonprofit / association",
  "SaaS / tech",
  "Other",
  ...deferredConflictIndustries,
] as const;

export const deferredConflictSet = new Set<string>(deferredConflictIndustries);

export type QualificationOutcome = "pay" | "nurture_conflict" | "nurture_size";

export function classifyQualification(
  teamSize: string,
  industry: string,
): QualificationOutcome {
  if (deferredConflictSet.has(industry)) return "nurture_conflict";
  if (!icpSizeOptions.has(teamSize)) return "nurture_size";
  return "pay";
}
