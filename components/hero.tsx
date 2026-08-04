"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/projects";
import type { RepoMeta } from "@/lib/github";
import { ForgeLog } from "@/components/forge-log";
import { site } from "@/lib/site";

type HeroProps = {
  projects: Project[];
  meta: RepoMeta[];
};

const ease = [0.2, 0.7, 0.3, 1] as const;

export function Hero({ projects, meta }: HeroProps) {
  const reduce = useReducedMotion();

  const headlineLines = [
    "Find 5+ hours a week",
    "(worth ~$2–3k/mo)",
    "hiding in your business.",
    "Guaranteed — or it's free.",
  ];

  if (reduce) {
    return (
      <header className="relative pt-[170px] pb-24 max-[900px]:pt-[140px] max-[900px]:pb-[70px]" id="top">
        <div className="hero-glow absolute z-0 -right-[6%] top-[8%] w-[620px] h-[620px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(229,104,60,0.20),rgba(200,164,92,0.07)_40%,transparent_68%)] blur-[20px] pointer-events-none" />
        <div className="max-w-wrap mx-auto px-7 relative z-[2]">
          <div className="grid grid-cols-1 min-[901px]:grid-cols-[1.08fr_0.92fr] gap-10 min-[901px]:gap-[54px] items-center">
            <div>
              <Eyebrow />
              <h1 className="font-display font-bold leading-[1.02] tracking-[-0.02em] text-[clamp(2.4rem,5.8vw,4.4rem)] mt-[26px] mb-6">
                {headlineLines.map((line) => (
                  <span key={line} className="block">{line}</span>
                ))}
              </h1>
              <p className="text-smoke text-[clamp(1.05rem,1.7vw,1.25rem)] max-w-[48ch]">
                A fixed-fee AI Tools Assessment maps your biggest time-drains to
                the right tools in two weeks — with a 4-day quick-start plan and
                an honest ROI. Fully credited if you build with us.
              </p>
              <HeroCTAs />
              <TrustBar />
            </div>
            <ForgeLog projects={projects} meta={meta} animate={false} />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="relative pt-[170px] pb-24 max-[900px]:pt-[140px] max-[900px]:pb-[70px]" id="top">
      <div className="hero-glow absolute z-0 -right-[6%] top-[8%] w-[620px] h-[620px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(229,104,60,0.20),rgba(200,164,92,0.07)_40%,transparent_68%)] blur-[20px] pointer-events-none" />
      <div className="max-w-wrap mx-auto px-7 relative z-[2]">
        <div className="grid grid-cols-1 min-[901px]:grid-cols-[1.08fr_0.92fr] gap-10 min-[901px]:gap-[54px] items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.09 } },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
              }}
            >
              <Eyebrow />
            </motion.div>
            <h1 className="font-display font-bold leading-[1.02] tracking-[-0.02em] text-[clamp(2.4rem,5.8vw,4.4rem)] mt-[26px] mb-6">
              {headlineLines.map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    variants={{
                      hidden: { y: "115%" },
                      visible: {
                        y: 0,
                        transition: { duration: 0.9, ease },
                      },
                    }}
                    custom={i}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              className="text-smoke text-[clamp(1.05rem,1.7vw,1.25rem)] max-w-[48ch]"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.7, ease } },
              }}
            >
              A fixed-fee AI Tools Assessment maps your biggest time-drains to
              the right tools in two weeks — with a 4-day quick-start plan and
              an honest ROI. Fully credited if you build with us.
            </motion.p>
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.6, ease } },
              }}
            >
              <HeroCTAs />
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.6, ease } },
              }}
            >
              <TrustBar />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease, delay: 0.5 }}
          >
            <ForgeLog projects={projects} meta={meta} />
          </motion.div>
        </div>
      </div>
    </header>
  );
}

function Eyebrow() {
  return (
    <span className="font-mono text-[12.5px] tracking-[0.22em] uppercase text-brass inline-flex items-center gap-2.5 before:content-[''] before:w-[22px] before:h-px before:bg-brass before:inline-block">
      AI Tools Assessment · {site.assessmentPrice} {site.currency}
    </span>
  );
}

function HeroCTAs() {
  return (
    <div className="flex gap-3.5 mt-9 flex-wrap max-[520px]:flex-col max-[520px]:items-stretch">
      <Link
        href="#assessment"
        className="inline-flex items-center gap-[9px] font-semibold text-[15px] px-6 py-3.5 rounded-[11px] bg-brass text-[#1a140a] hover:bg-brass-bright hover:-translate-y-0.5 transition-all group focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2 max-[520px]:justify-center"
      >
        Book your assessment
        <span className="transition-transform group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
          ↗
        </span>
      </Link>
      <Link
        href="/time-leak"
        className="inline-flex items-center gap-[9px] font-semibold text-[15px] px-6 py-3.5 rounded-[11px] border border-hair-strong text-bone hover:border-brass hover:text-brass hover:-translate-y-0.5 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2 max-[520px]:justify-center"
      >
        Free Time-Leak Score
      </Link>
      <Link
        href="/sample-report"
        className="inline-flex items-center gap-[9px] font-semibold text-[15px] px-6 py-3.5 rounded-[11px] border border-transparent text-smoke hover:text-brass transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2 max-[520px]:justify-center"
      >
        See sample report
      </Link>
    </div>
  );
}

function TrustBar() {
  const items = [
    "5 hrs/week or full refund",
    "Fully credited toward build",
    "We ship software, not just advice",
  ];
  return (
    <div className="flex gap-6 flex-wrap mt-[34px] pt-6 border-t border-hair">
      {items.map((item) => (
        <span
          key={item}
          className="font-mono text-[12.5px] text-smoke flex items-center gap-2 before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-brass"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
