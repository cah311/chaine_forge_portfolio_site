"use client";

import Link from "next/link";
import { getQuizName, defaultQuizVariant } from "@/lib/quiz/names";

type Props = {
  className?: string;
};

/** Site-wide secondary CTA into the free quiz. */
export function QuizCtaBand({ className = "" }: Props) {
  const copy = getQuizName(defaultQuizVariant);

  return (
    <section
      className={`py-[72px] max-[900px]:py-[56px] border-t border-hair bg-iron-deep ${className}`}
      id="time-leak"
    >
      <div className="max-w-wrap mx-auto px-7 relative z-[2]">
        <div className="rounded-[18px] border border-hair-strong bg-iron-raised/70 px-7 py-8 max-[520px]:px-5 flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-[54ch]">
            <span className="font-mono text-[12.5px] tracking-[0.22em] uppercase text-brass inline-flex items-center gap-2.5 before:content-[''] before:w-[22px] before:h-px before:bg-brass before:inline-block">
              Not ready to book?
            </span>
            <h2 className="font-display font-bold text-[clamp(1.45rem,3vw,2rem)] tracking-[-0.02em] leading-[1.15] mt-3 mb-2">
              {copy.shortCta} in 3 minutes.
            </h2>
            <p className="text-smoke text-[15px]">
              Free headline score with a dollar range. Full breakdown after
              email. Then the paid assessment for the exact map — guaranteed.
            </p>
          </div>
          <Link
            href="/time-leak"
            className="inline-flex items-center gap-[9px] font-semibold text-[15px] px-6 py-3.5 rounded-[11px] bg-brass text-[#1a140a] hover:bg-brass-bright hover:-translate-y-0.5 transition-all group shrink-0"
          >
            {copy.cta}
            <span className="transition-transform group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
              ↗
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
