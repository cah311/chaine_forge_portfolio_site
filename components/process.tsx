"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/reveal";

const steps = [
  {
    num: "01",
    title: "Scope",
    desc: "Fill out the form. You get a written, underwritten quote and a one-page spec in 48 hours — or an honest \"not a fit.\" No discovery calls, no sales theater.",
  },
  {
    num: "02",
    title: "Build",
    desc: "Daily written updates and recorded walkthroughs. You watch the product take shape in a repo you own from day one.",
  },
  {
    num: "03",
    title: "Ship",
    desc: "Deployed on your infrastructure with a handover doc — your audit trail — and a 14-day fix window. Fire us anytime and lose nothing.",
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
    <section className="py-[120px] max-[900px]:py-[84px]" id="process">
      <div className="max-w-wrap mx-auto px-7 relative z-[2]">
        <div className="text-center mb-5">
          <Reveal>
            <span className="font-mono text-[12.5px] tracking-[0.22em] uppercase text-brass inline-flex items-center gap-2.5 before:content-[''] before:w-[22px] before:h-px before:bg-brass before:inline-block">
              Process
            </span>
          </Reveal>
          <Reveal>
            <h2
              className="font-display font-bold text-[clamp(2rem,4.2vw,3.2rem)] tracking-[-0.025em] leading-[1.02] mt-[18px]"
            >
              Async by design.
            </h2>
          </Reveal>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 min-[901px]:grid-cols-3 gap-0 relative mt-5 min-[901px]:gap-0 max-[900px]:gap-9"
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
              <p className="text-smoke text-[14.5px] max-w-[30ch] mx-auto">
                {step.desc}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="text-center mt-14 font-mono text-[13px] text-smoke">
            Payment:{" "}
            <b className="text-brass font-semibold">50% to start, 50% at delivery.</b>{" "}
            Stripe or USDC. Larger builds split into milestones.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
