import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { AttributionCapture } from "@/components/attribution-capture";
import { TimeLeakClient } from "@/components/quiz/time-leak-client";
import {
  defaultQuizVariant,
  getQuizName,
  parseQuizVariant,
  type QuizNameVariant,
} from "@/lib/quiz/names";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Time-Leak Score",
  description:
    "See how many hours AI could hand back to your business in 3 minutes. Free Time-Leak Score with a dollar range — then the map to fix it.",
  alternates: { canonical: "/time-leak" },
  openGraph: {
    title: `Free Time-Leak Score — ${site.name}`,
    description:
      "3-minute calculator: hours and dollars leaking from admin work. Free score, then the guaranteed assessment.",
    url: "/time-leak",
  },
};

const VARIANT_COOKIE = "cfl_quiz_v";

type PageProps = {
  searchParams: Promise<{ v?: string }>;
};

async function resolveVariant(fromQuery?: string): Promise<QuizNameVariant> {
  if (fromQuery === "a" || fromQuery === "b" || fromQuery === "c") {
    return fromQuery;
  }
  const hdrs = await headers();
  const fromProxy = hdrs.get("x-quiz-variant");
  if (fromProxy === "a" || fromProxy === "b" || fromProxy === "c") {
    return fromProxy;
  }
  const jar = await cookies();
  const stored = jar.get(VARIANT_COOKIE)?.value;
  return parseQuizVariant(stored) || defaultQuizVariant;
}

export default async function TimeLeakPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const variant = await resolveVariant(params.v);
  const copy = getQuizName(variant);

  return (
    <>
      <AttributionCapture />
      <Nav />
      <main className="pt-[140px] pb-[100px] max-[900px]:pt-[120px]">
        <div className="max-w-wrap mx-auto px-7 relative z-[2]">
          <TimeLeakClient initialVariant={variant} />
          <div className="mt-12 rounded-[14px] border border-hair bg-iron-deep/80 px-5 py-4 max-w-[720px] mx-auto">
            <p className="font-mono text-[12px] text-smoke leading-relaxed text-center">
              <span className="text-brass">Ad split-test:</span> force a quiz
              name with{" "}
              <code className="text-bone">/time-leak?v=a</code> (5-Hour Finder),{" "}
              <code className="text-bone">?v=b</code> (Time-Leak Calculator), or{" "}
              <code className="text-bone">?v=c</code> (Admin Hours Score). Cookie
              sticks for 90 days. Current:{" "}
              <span className="text-brass">
                {variant} · {copy.name}
              </span>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
