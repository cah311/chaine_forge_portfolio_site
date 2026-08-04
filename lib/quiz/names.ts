/** Quiz-name split-test variants (Hormozi: name converts more than contents). */

export type QuizNameVariant = "a" | "b" | "c";

export const quizNameVariants: Record<
  QuizNameVariant,
  {
    id: QuizNameVariant;
    name: string;
    headline: string;
    subhead: string;
    cta: string;
    shortCta: string;
  }
> = {
  a: {
    id: "a",
    name: "The 5-Hour Finder",
    headline: "See how many hours AI could hand back to your business — in 3 minutes.",
    subhead:
      "Answer a few questions about how work actually moves through your shop. Get a Time-Leak Score with a dollar range — free.",
    cta: "Start the 5-Hour Finder",
    shortCta: "Get your free Time-Leak Score",
  },
  b: {
    id: "b",
    name: "AI Time-Leak Calculator",
    headline: "How much is manual work costing your business every month?",
    subhead:
      "A 3-minute calculator that estimates hours and dollars leaking from admin, quoting, and follow-up — then shows what to do next.",
    cta: "Calculate my time leak",
    shortCta: "Free Time-Leak Calculator",
  },
  c: {
    id: "c",
    name: "Admin Hours Score",
    headline: "How many hours is your admin work stealing?",
    subhead:
      "2–3 minutes. No pitch. A score that shows the hours and roughly what they're worth — then the map to fix them.",
    cta: "Get my Admin Hours Score",
    shortCta: "Free Admin Hours Score",
  },
};

export const defaultQuizVariant: QuizNameVariant = "a";

export function parseQuizVariant(raw: string | null | undefined): QuizNameVariant {
  if (raw === "a" || raw === "b" || raw === "c") return raw;
  return defaultQuizVariant;
}

export function getQuizName(variant: QuizNameVariant = defaultQuizVariant) {
  return quizNameVariants[variant];
}
