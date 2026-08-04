import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { QuizResults } from "@/components/quiz/quiz-results";
import { verifyQuizResult } from "@/lib/quiz/token";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Your Time-Leak Breakdown",
  description: `Full Time-Leak Score breakdown and next step — the ${site.assessmentPrice} ${site.currency} AI Tools Assessment.`,
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<{ t?: string }>;
};

export default async function TimeLeakResultsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const token = params.t ?? "";
  const payload = token ? verifyQuizResult(token) : null;

  return (
    <>
      <Nav />
      <main className="pt-[140px] pb-[100px] max-[900px]:pt-[120px]">
        <div className="max-w-[820px] mx-auto px-7 relative z-[2]">
          {payload ? (
            <QuizResults
              email={payload.email}
              score={payload.score}
              answers={payload.answers}
            />
          ) : (
            <div>
              <span className="font-mono text-[12.5px] tracking-[0.22em] uppercase text-brass inline-flex items-center gap-2.5 before:content-[''] before:w-[22px] before:h-px before:bg-brass before:inline-block">
                Results
              </span>
              <h1 className="font-display font-bold text-[clamp(2rem,4.2vw,3rem)] tracking-[-0.025em] leading-[1.05] mt-[18px] mb-5">
                This results link is invalid or expired.
              </h1>
              <p className="text-smoke text-[16px] max-w-[46ch] mb-8">
                Re-run the free Time-Leak Score — it takes about three minutes —
                and we&apos;ll email you a fresh breakdown.
              </p>
              <Link
                href="/time-leak"
                className="inline-flex items-center gap-[9px] font-semibold text-[15px] px-6 py-3.5 rounded-[11px] bg-brass text-[#1a140a] hover:bg-brass-bright transition-all"
              >
                Get your Time-Leak Score ↗
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
