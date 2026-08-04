import {
  classifyQualification,
  type QualificationOutcome,
} from "@/lib/qualification";
import type { QuizNameVariant } from "@/lib/quiz/names";

export const leakCategories = [
  {
    id: "quoting",
    label: "Quoting & proposals",
    description: "Building quotes, chasing revisions, re-entering line items.",
  },
  {
    id: "scheduling",
    label: "Scheduling & dispatch",
    description: "Booking jobs, reshuffling crews, confirmation ping-pong.",
  },
  {
    id: "invoicing",
    label: "Invoicing & collections",
    description: "Creating invoices, payment follow-ups, reconciliation.",
  },
  {
    id: "followups",
    label: "Lead & customer follow-ups",
    description: "Missed calls, CRM updates, nurture that never ships.",
  },
  {
    id: "data_entry",
    label: "Data entry & spreadsheets",
    description: "Copy-paste between tools, status trackers, weekly reports.",
  },
  {
    id: "support",
    label: "Inbox & support",
    description: "Repetitive email replies, status questions, FAQ loops.",
  },
] as const;

export type LeakCategoryId = (typeof leakCategories)[number]["id"];

export const hourlyValueOptions = [
  { value: "35", label: "$35/hr (admin / junior)" },
  { value: "55", label: "$55/hr (ops / coordinator)" },
  { value: "85", label: "$85/hr (owner / senior time)" },
  { value: "125", label: "$125/hr (billable specialist)" },
] as const;

export const adminHoursOptions = [
  { value: "3", label: "Under 5 hrs/week" },
  { value: "8", label: "5–10 hrs/week" },
  { value: "15", label: "10–20 hrs/week" },
  { value: "28", label: "20–35 hrs/week" },
  { value: "40", label: "35+ hrs/week" },
] as const;

/** Industry → typical reclaimable share of stated admin time + bias labels. */
const industryProfiles: Record<
  string,
  { reclaimShare: number; bias: LeakCategoryId[]; label: string }
> = {
  "Trades / contracting": {
    reclaimShare: 0.55,
    bias: ["quoting", "scheduling", "followups"],
    label: "trades / contracting business",
  },
  "Professional services (law, accounting, consulting)": {
    reclaimShare: 0.5,
    bias: ["data_entry", "invoicing", "followups"],
    label: "professional-services firm",
  },
  "Retail / e-commerce": {
    reclaimShare: 0.48,
    bias: ["support", "invoicing", "data_entry"],
    label: "retail / e-commerce business",
  },
  "Real estate": {
    reclaimShare: 0.52,
    bias: ["followups", "scheduling", "data_entry"],
    label: "real-estate operation",
  },
  "Hospitality / food service": {
    reclaimShare: 0.45,
    bias: ["scheduling", "support", "invoicing"],
    label: "hospitality / food business",
  },
  "Manufacturing / distribution": {
    reclaimShare: 0.5,
    bias: ["data_entry", "scheduling", "invoicing"],
    label: "manufacturing / distribution business",
  },
  "Nonprofit / association": {
    reclaimShare: 0.42,
    bias: ["data_entry", "followups", "support"],
    label: "nonprofit / association",
  },
  "SaaS / tech": {
    reclaimShare: 0.48,
    bias: ["support", "data_entry", "followups"],
    label: "SaaS / tech team",
  },
  Other: {
    reclaimShare: 0.45,
    bias: ["data_entry", "followups", "quoting"],
    label: "business like yours",
  },
  "Financial advisor / wealth management": {
    reclaimShare: 0.4,
    bias: ["data_entry", "followups", "support"],
    label: "wealth / advisory firm",
  },
  "Physician or dentist wealth / financial planning": {
    reclaimShare: 0.4,
    bias: ["data_entry", "followups", "scheduling"],
    label: "physician / dentist planning practice",
  },
  "Medical or dental practice (operations)": {
    reclaimShare: 0.48,
    bias: ["scheduling", "support", "data_entry"],
    label: "medical / dental practice",
  },
};

const teamSizeMultipliers: Record<string, number> = {
  "Just me / solo": 0.75,
  "2–5 people": 1,
  "6–20 people": 1.15,
  "21–50 people": 1.25,
  "50+": 1.35,
};

export type QuizAnswers = {
  industry: string;
  teamSize: string;
  adminHours: string;
  hourlyValue: string;
  categories: LeakCategoryId[];
  variant: QuizNameVariant;
  /** Attribution */
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
};

export type CategoryLeak = {
  id: LeakCategoryId;
  label: string;
  description: string;
  hoursLow: number;
  hoursHigh: number;
  monthlyLow: number;
  monthlyHigh: number;
};

export type QuizScore = {
  industryLabel: string;
  teamSize: string;
  hoursLow: number;
  hoursHigh: number;
  monthlyLow: number;
  monthlyHigh: number;
  weeklyCostMid: number;
  monthlyCostMid: number;
  annualCostMid: number;
  categories: CategoryLeak[];
  outcome: QualificationOutcome;
  deprivationLine: string;
  summaryLine: string;
};

function round1(n: number) {
  return Math.round(n * 10) / 10;
}

function money(n: number) {
  return Math.round(n / 50) * 50;
}

export function computeQuizScore(answers: QuizAnswers): QuizScore {
  const profile =
    industryProfiles[answers.industry] ?? industryProfiles.Other;
  const admin = Number(answers.adminHours) || 8;
  const hourly = Number(answers.hourlyValue) || 55;
  const sizeMul = teamSizeMultipliers[answers.teamSize] ?? 1;

  const midHours = admin * profile.reclaimShare * sizeMul;
  const hoursLow = round1(Math.max(2, midHours * 0.75));
  const hoursHigh = round1(Math.max(hoursLow + 1.5, midHours * 1.25));

  const monthlyLow = money(hoursLow * hourly * 4.3);
  const monthlyHigh = money(hoursHigh * hourly * 4.3);
  const weeklyCostMid = money(((hoursLow + hoursHigh) / 2) * hourly);
  const monthlyCostMid = money(weeklyCostMid * 4.3);
  const annualCostMid = money(monthlyCostMid * 12);

  const selected =
    answers.categories.length > 0
      ? answers.categories
      : (profile.bias.filter((id) =>
          leakCategories.some((c) => c.id === id),
        ) as LeakCategoryId[]);

  const unique = Array.from(new Set(selected)).slice(0, 4);
  const weights = unique.map((_, i) => (i === 0 ? 0.4 : i === 1 ? 0.3 : 0.15));
  const weightSum = weights.reduce((a, b) => a + b, 0) || 1;

  const categories: CategoryLeak[] = unique.map((id, i) => {
    const meta = leakCategories.find((c) => c.id === id)!;
    const share = weights[i]! / weightSum;
    return {
      id,
      label: meta.label,
      description: meta.description,
      hoursLow: round1(hoursLow * share),
      hoursHigh: round1(hoursHigh * share),
      monthlyLow: money(monthlyLow * share),
      monthlyHigh: money(monthlyHigh * share),
    };
  });

  const outcome = classifyQualification(answers.teamSize, answers.industry);

  const summaryLine = `Businesses like yours (${answers.teamSize.toLowerCase()} ${profile.label}) typically leak ${hoursLow}–${hoursHigh} hrs/week ≈ $${monthlyLow.toLocaleString("en-CA")}–$${monthlyHigh.toLocaleString("en-CA")}/mo.`;

  const deprivationLine = `Leaving that alone costs roughly $${monthlyCostMid.toLocaleString("en-CA")}/mo — and it compounds every week you wait.`;

  return {
    industryLabel: profile.label,
    teamSize: answers.teamSize,
    hoursLow,
    hoursHigh,
    monthlyLow,
    monthlyHigh,
    weeklyCostMid,
    monthlyCostMid,
    annualCostMid,
    categories,
    outcome,
    deprivationLine,
    summaryLine,
  };
}

export function formatCad(n: number) {
  return `$${n.toLocaleString("en-CA")}`;
}
