import { absoluteUrl } from "@/lib/site";
import {
  quizNameVariants,
  type QuizNameVariant,
} from "@/lib/quiz/names";

/**
 * Landing URLs for Meta/Google ad split tests.
 * Point each ad set at a different `v=` so Vercel Analytics can attribute
 * quiz_started / quiz_email_captured / quiz_book_assessment_clicked by variant.
 *
 * Suggested first test budget: $10–20/day total, split evenly across a/b/c,
 * for 7–14 days or until ~50 email captures — then kill the losers.
 */
export function quizAdLandingUrl(
  variant: QuizNameVariant,
  utm: { source: string; medium?: string; campaign?: string },
) {
  const params = new URLSearchParams({
    v: variant,
    utm_source: utm.source,
    utm_medium: utm.medium ?? "paid",
    utm_campaign: utm.campaign ?? `quiz_name_${variant}`,
  });
  return absoluteUrl(`/time-leak?${params.toString()}`);
}

export const quizAdTestPlan = {
  dailyBudgetCad: "10–20",
  durationDays: "7–14",
  primaryMetric: "quiz_email_captured (then quiz_book_assessment_clicked)",
  variants: (Object.keys(quizNameVariants) as QuizNameVariant[]).map((id) => ({
    id,
    name: quizNameVariants[id].name,
    headline: quizNameVariants[id].headline,
    exampleUrl: quizAdLandingUrl(id, {
      source: "meta",
      campaign: "quiz_name_test_v1",
    }),
  })),
} as const;
