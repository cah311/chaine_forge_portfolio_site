"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/projects";
import type { RepoMeta } from "@/lib/github";
import { relTime } from "@/lib/rel-time";

type ForgeLogProps = {
  projects: Project[];
  meta: RepoMeta[];
  animate?: boolean;
};

const ease = [0.2, 0.7, 0.3, 1] as const;

export function ForgeLog({ projects, meta, animate = true }: ForgeLogProps) {
  const reduce = useReducedMotion();
  const shouldAnimate = animate && !reduce;

  return (
    <div
      className="bg-gradient-to-b from-iron-raised to-[#181410] border border-hair rounded-2xl overflow-hidden shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7),0_0_0_1px_rgba(200,164,92,0.06)] relative after:content-[''] after:absolute after:inset-0 after:rounded-2xl after:pointer-events-none after:shadow-[inset_0_1px_0_rgba(242,237,228,0.05)]"
    >
      <div className="flex items-center gap-2 px-4 py-[13px] border-b border-hair bg-black/18">
        <span className="w-[11px] h-[11px] rounded-full bg-[#2c2620]" />
        <span className="w-[11px] h-[11px] rounded-full bg-[#2c2620]" />
        <span className="w-[11px] h-[11px] rounded-full bg-[#2c2620]" />
        <span className="ml-2 font-mono text-xs text-smoke-dim">
          ~ forge-log · shipped work
        </span>
        <span className="ml-auto font-mono text-[11px] text-ember flex items-center gap-1.5">
          <i
            className="w-1.5 h-1.5 rounded-full bg-ember shadow-[0_0_8px_var(--ember)] animate-pulse-ember"
          />
          live
        </span>
      </div>
      <div className="px-[18px] py-4 font-mono text-[13px] leading-[2]">
        {projects.map((project, i) => {
          const m = meta[i];
          const stars = m ? `★ ${m.stars}` : "★ —";
          const lang = m?.lang ?? project.lang;
          const when = m?.pushedAt ? relTime(m.pushedAt) : "";
          const line = (
            <div
              className="flex items-baseline gap-2.5 whitespace-nowrap overflow-hidden"
            >
              <span className="text-brass min-w-[46px]">{stars}</span>
              <span className="text-smoke before:content-['●'] before:mr-1.5 before:text-[9px] before:align-middle">
                {lang}
              </span>
              <span className="text-bone">{project.repo}</span>
              <span className="text-smoke-dim ml-auto">
                {when ? `updated ${when}` : ""}
              </span>
            </div>
          );

          if (!shouldAnimate) return <div key={project.slug}>{line}</div>;

          return (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                ease,
                delay: 0.7 + i * 0.12,
              }}
            >
              {line}
            </motion.div>
          );
        })}
        <div className="flex items-baseline gap-2.5">
          <span className="text-brass animate-blink">▌</span>
        </div>
      </div>
    </div>
  );
}
