"use client";

import Link from "next/link";
import { useEffect } from "react";
import {
  funnelEvents,
  trackFunnel,
} from "@/lib/analytics";
import { getQuizName } from "@/lib/quiz/names";
import { formatCad, type QuizScore } from "@/lib/quiz/scoring";
import type { QuizAnswers } from "@/lib/quiz/scoring";
import { site } from "@/lib/site";

type Props = {
  email: string;
  score: QuizScore;
  answers: QuizAnswers;
};

export function QuizResults({ email, score, answers }: Props) {
  const copy = getQuizName(answers.variant);
  const qualified = score.outcome === "pay";

  useEffect(() => {
    trackFunnel(funnelEvents.quizResultsViewed, {
      variant: answers.variant,
      outcome: score.outcome,
      hours_mid: Math.round((score.hoursLow + score.hoursHigh) / 2),
    });
  }, [answers.variant, score.outcome, score.hoursLow, score.hoursHigh]);

  return (
    <div className="space-y-10">
      <div className="rounded-[18px] border border-brass/35 bg-iron-raised/80 p-7 max-[520px]:p-5">
        <p className="font-mono text-[12.5px] tracking-[0.18em] uppercase text-brass mb-3">
          {copy.name} · full breakdown
        </p>
        <h1 className="font-display font-bold text-[clamp(1.8rem,4vw,2.8rem)] tracking-[-0.025em] leading-[1.08] mb-4">
          You&apos;re leaking {score.hoursLow}–{score.hoursHigh} hours a week.
        </h1>
        <p className="text-brass-bright text-[clamp(1.15rem,2.2vw,1.45rem)] font-semibold">
          ≈ {formatCad(score.monthlyLow)}–{formatCad(score.monthlyHigh)} / month
          <span className="block text-smoke font-normal text-[0.72em] mt-1">
            Midpoint ~{formatCad(score.monthlyCostMid)}/mo · ~
            {formatCad(score.annualCostMid)}/yr if nothing changes
          </span>
        </p>
        <p className="text-smoke text-[16px] mt-5 max-w-[56ch]">
          {score.summaryLine}
        </p>
        <p className="text-ember text-[15px] mt-3 max-w-[56ch]">
          {score.deprivationLine}
        </p>
        <p className="font-mono text-[12px] text-smoke-dim mt-6">
          Sent to {email}
        </p>
      </div>

      <div>
        <h2 className="font-display font-bold text-[clamp(1.4rem,3vw,1.85rem)] tracking-[-0.02em] mb-4">
          Where it usually hides
        </h2>
        <div className="grid gap-3">
          {score.categories.map((c, i) => (
            <div
              key={c.id}
              className="rounded-[14px] border border-hair-strong bg-iron-deep px-5 py-4 flex flex-wrap gap-4 justify-between"
            >
              <div className="min-w-[200px] flex-1">
                <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-brass mb-1">
                  0{i + 1}
                </div>
                <div className="font-semibold text-[16px]">{c.label}</div>
                <div className="text-smoke text-[14px] mt-1">{c.description}</div>
              </div>
              <div className="text-right">
                <div className="font-display font-bold text-[1.35rem] tracking-[-0.02em]">
                  {c.hoursLow}–{c.hoursHigh}{" "}
                  <span className="text-smoke text-[0.55em] font-semibold">
                    hrs/wk
                  </span>
                </div>
                <div className="font-mono text-[12.5px] text-brass mt-1">
                  {formatCad(c.monthlyLow)}–{formatCad(c.monthlyHigh)}/mo
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[18px] border border-hair-strong bg-iron-raised p-7 max-[520px]:p-5">
        <p className="font-mono text-[12.5px] tracking-[0.18em] uppercase text-brass mb-3">
          Free score vs paid assessment
        </p>
        <h2 className="font-display font-bold text-[clamp(1.4rem,3vw,1.9rem)] tracking-[-0.02em] mb-3">
          You know the leak exists. Now get the map.
        </h2>
        <p className="text-smoke text-[16px] max-w-[54ch] mb-5">
          The free {copy.name} only reveals that time is leaking and roughly how
          much. It does <span className="text-bone">not</span> tell you which
          tools to buy, what to build, or guarantee hours back. That&apos;s the
          AI Tools Assessment.
        </p>
        <ul className="space-y-2.5 font-mono text-[12.5px] text-smoke mb-7">
          {[
            "Exact map of where the hours hide in your stack",
            "Tool recommendations with cost / setup / time saved",
            "4-day quick-start plan you can run yourself",
            "5 reclaimable hours/week identified — or a full refund",
            `Fee fully credited toward any build within 90 days`,
          ].map((line) => (
            <li
              key={line}
              className="flex items-start gap-2.5 before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-brass before:mt-1.5 before:flex-none"
            >
              {line}
            </li>
          ))}
        </ul>

        {qualified ? (
          <>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/#assessment"
                onClick={() =>
                  trackFunnel(funnelEvents.quizBookClicked, {
                    variant: answers.variant,
                    outcome: score.outcome,
                  })
                }
                className="inline-flex items-center gap-[9px] font-semibold text-[15px] px-6 py-3.5 rounded-[11px] bg-brass text-[#1a140a] hover:bg-brass-bright hover:-translate-y-0.5 transition-all group"
              >
                Book the {site.assessmentPrice} {site.currency} assessment
                <span className="transition-transform group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
                  ↗
                </span>
              </Link>
              <Link
                href="/sample-report"
                onClick={() =>
                  trackFunnel(funnelEvents.quizSampleClicked, {
                    variant: answers.variant,
                  })
                }
                className="inline-flex items-center gap-[9px] font-semibold text-[15px] px-6 py-3.5 rounded-[11px] border border-hair-strong text-bone hover:border-brass hover:text-brass transition-all"
              >
                Read a complete sample report
              </Link>
            </div>
            <p className="font-mono text-[12px] text-smoke-dim mt-4">
              {site.availability}. Guaranteed 5 hrs/week or it&apos;s free.
            </p>
          </>
        ) : score.outcome === "nurture_conflict" ? (
          <div className="rounded-[12px] border border-hair-strong bg-iron-deep px-5 py-4">
            <p className="text-bone font-semibold mb-2">
              You&apos;re on our shortlist for this vertical.
            </p>
            <p className="text-smoke text-[15px] max-w-[52ch]">
              Advice-, wealth-, and healthcare-practice-adjacent firms are a
              natural long-term fit — we sequence capacity carefully. We&apos;ll
              follow up when we open your lane. Meanwhile, the sample report
              shows exactly how the deliverable reads.
            </p>
            <Link
              href="/sample-report"
              className="inline-flex mt-4 text-brass hover:text-brass-bright font-semibold text-[15px]"
            >
              Read the sample report ↗
            </Link>
          </div>
        ) : (
          <div className="rounded-[12px] border border-hair-strong bg-iron-deep px-5 py-4">
            <p className="text-bone font-semibold mb-2">
              The paid assessment is built for teams of roughly 2–20.
            </p>
            <p className="text-smoke text-[15px] max-w-[52ch]">
              We&apos;ve saved your score and will follow up with what fits your
              size — including DIY paths from the sample report. If you&apos;re
              growing into the ICP soon, reply to your results email.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Link
                href="/sample-report"
                className="inline-flex text-brass hover:text-brass-bright font-semibold text-[15px]"
              >
                Read the sample report ↗
              </Link>
              <Link
                href="/#paths"
                className="inline-flex text-smoke hover:text-brass font-semibold text-[15px]"
              >
                See implementation paths
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
