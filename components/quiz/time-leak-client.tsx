"use client";

import Link from "next/link";
import { useEffect } from "react";
import { TimeLeakQuiz } from "@/components/quiz/time-leak-quiz";
import {
  captureAttributionFromUrl,
  readAttribution,
} from "@/lib/analytics";
import {
  getQuizName,
  parseQuizVariant,
  type QuizNameVariant,
} from "@/lib/quiz/names";
import { site } from "@/lib/site";

type Props = {
  initialVariant: QuizNameVariant;
};

export function TimeLeakClient({ initialVariant }: Props) {
  useEffect(() => {
    captureAttributionFromUrl(window.location.search, document.referrer);
    const params = new URLSearchParams(window.location.search);
    const fromUrl = parseQuizVariant(params.get("v"));
    if (fromUrl !== initialVariant) {
      // Cookie/URL already resolved on server; keep client in sync for attr.
      const attr = readAttribution();
      if (!attr.quizVariant) {
        captureAttributionFromUrl(`?v=${initialVariant}`, document.referrer);
      }
    }
  }, [initialVariant]);

  const copy = getQuizName(initialVariant);

  return (
    <div className="grid grid-cols-1 min-[901px]:grid-cols-[0.92fr_1.08fr] gap-10 min-[901px]:gap-12 items-start">
      <div>
        <span className="font-mono text-[12.5px] tracking-[0.22em] uppercase text-brass inline-flex items-center gap-2.5 before:content-[''] before:w-[22px] before:h-px before:bg-brass before:inline-block">
          Free · 3 minutes
        </span>
        <h1 className="font-display font-bold text-[clamp(2rem,4.4vw,3.2rem)] tracking-[-0.025em] leading-[1.05] mt-[18px] mb-5">
          {copy.headline}
        </h1>
        <p className="text-smoke text-[clamp(1.05rem,1.7vw,1.2rem)] max-w-[46ch] mb-6">
          {copy.subhead}
        </p>
        <ul className="space-y-3 font-mono text-[12.5px] text-smoke mb-8">
          {[
            "Instant headline score — hours/week + dollar range",
            "Full category breakdown after email",
            `Then: the ${site.assessmentPrice} ${site.currency} assessment for the exact map + guarantee`,
          ].map((line) => (
            <li
              key={line}
              className="flex items-start gap-2.5 before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-brass before:mt-1.5 before:flex-none"
            >
              {line}
            </li>
          ))}
        </ul>
        <p className="text-smoke text-[14.5px] max-w-[44ch]">
          Not ready to book? This is the front door. Prefer to see the paid
          deliverable first?{" "}
          <Link
            href="/sample-report"
            className="text-brass hover:text-brass-bright underline underline-offset-2"
          >
            Read a complete sample report
          </Link>
          .
        </p>
      </div>
      <TimeLeakQuiz variant={initialVariant} />
    </div>
  );
}
