"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

const steps = [
  {
    num: "01",
    title: "Discovery call",
    desc: "A 45-minute recorded Zoom. We inventory your workflows, tool stack, and time-drains — no pitch, just signal.",
  },
  {
    num: "02",
    title: "AI analysis + report",
    desc: "We run the transcript through a custom analysis skill and deliver a templatized report: effort-vs-impact matrix, tool recommendations with cost and time saved, a 4-day quick-start plan, and an honest ROI slide.",
  },
  {
    num: "03",
    title: "Review + next moves",
    desc: "A 30-minute review call. You leave with quick wins you can run yourself — and a clear \"major projects\" quadrant for anything off-the-shelf can't solve.",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 65%"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="py-[120px] max-[900px]:py-[84px]" id="how-it-works">
      <div className="max-w-wrap mx-auto px-7 relative z-[2]">
        <div className="text-center mb-5">
          <Reveal>
            <span className="font-mono text-[12.5px] tracking-[0.22em] uppercase text-brass inline-flex items-center gap-2.5 before:content-[''] before:w-[22px] before:h-px before:bg-brass before:inline-block">
              How it works
            </span>
          </Reveal>
          <Reveal>
            <h2
              className="font-display font-bold text-[clamp(2rem,4.2vw,3.2rem)] tracking-[-0.025em] leading-[1.02] mt-[18px]"
            >
              Clarity in two weeks.
              <br />
              Not a 40-page deck.
            </h2>
          </Reveal>
          <Reveal>
            <p className="text-smoke text-[clamp(1.05rem,1.7vw,1.25rem)] max-w-[58ch] mx-auto mt-[18px]">
              Here&apos;s the honest state of things: every business can buy
              the same AI today. The tools aren&apos;t the edge anymore. The
              edge is knowing exactly where they belong in your business, where
              they don&apos;t, and what to build for the gaps the tools
              can&apos;t reach. That&apos;s what the assessment finds — and
              what we build.
            </p>
          </Reveal>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 min-[901px]:grid-cols-3 gap-0 relative mt-10 min-[901px]:gap-0 max-[900px]:gap-9"
        >
          <div
            className="absolute top-[34px] left-[8%] right-[8%] h-0.5 bg-hair z-0 max-[900px]:hidden"
            aria-hidden="true"
          >
            {reduce ? (
              <div className="absolute inset-0 bg-brass" />
            ) : (
              <motion.div
                className="absolute inset-0 bg-brass origin-left"
                style={{ scaleX }}
              />
            )}
          </div>

          {steps.map((step) => (
            <Reveal key={step.num} className="px-[22px] relative z-[1] text-center">
              <div
                className="w-[68px] h-[68px] rounded-full mx-auto mb-[22px] grid place-items-center font-mono text-lg text-brass bg-iron border border-hair-strong"
              >
                {step.num}
              </div>
              <h3 className="font-display font-bold text-xl mb-2.5">
                {step.title}
              </h3>
              <p className="text-smoke text-[14.5px] max-w-[32ch] mx-auto">
                {step.desc}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="text-center mt-14 font-mono text-[13px] text-smoke">
            Delivered in ~2 weeks.{" "}
            <b className="text-brass font-semibold">
              {site.assessmentActivePrice} {site.currency}
              {site.assessmentOfferTier !== "standing"
                ? ` · ${site.assessmentTierLabel}`
                : ""}{" "}
              — fully credited
            </b>{" "}
            toward any implementation booked within 90 days.
          </p>
          <p className="text-center mt-4 font-mono text-[13px]">
            <a
              href="/sample-report"
              className="text-brass hover:text-brass-bright underline underline-offset-2 transition-colors"
            >
              Read a complete sample report ↗
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
