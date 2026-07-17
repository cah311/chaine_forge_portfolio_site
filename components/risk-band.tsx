import { Reveal } from "@/components/reveal";

const rows = [
  {
    k: "GUARANTEE",
    v: "We identify at least <b>5 reclaimable hours per week</b> — or your $1,500 is refunded in full.",
  },
  {
    k: "CREDITED",
    v: "The full fee is <b>credited toward any build</b> booked within 90 days.",
  },
  {
    k: "HONEST MATRIX",
    v: "Quick wins you can run yourself <b>and</b> a major-projects quadrant for what needs to be built.",
  },
  {
    k: "CAPACITY",
    v: "A limited number of assessments each month — every report is <b>hand-built</b>, not templated spam.",
  },
  {
    k: "OWNERSHIP",
    v: "When we build, your code, repo, and IP — <b>from the first commit</b>.",
  },
  {
    k: "BUILDS",
    v: "Final 50% on implementations due <b>only when it works</b> as the written spec says.",
  },
];

export function RiskBand() {
  return (
    <section
      className="py-[120px] max-[900px]:py-[84px] bg-iron-deep border-t border-b border-hair relative before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-ember before:to-transparent before:opacity-50"
      id="guarantee"
    >
      <div className="max-w-wrap mx-auto px-7 relative z-[2]">
        <div className="grid grid-cols-1 min-[901px]:grid-cols-[0.85fr_1.15fr] gap-10 min-[901px]:gap-[50px] items-center">
          <div>
            <Reveal>
              <span className="font-mono text-[12.5px] tracking-[0.22em] uppercase text-brass inline-flex items-center gap-2.5 before:content-[''] before:w-[22px] before:h-px before:bg-brass before:inline-block">
                The Guarantee
              </span>
            </Reveal>
            <Reveal>
              <h2
                className="font-display font-bold text-[clamp(2rem,4.2vw,3.2rem)] tracking-[-0.025em] leading-[1.02] mt-[18px] mb-[18px]"
              >
                5 hours a week, or your money back.
              </h2>
            </Reveal>
            <Reveal>
              <p className="text-smoke text-[clamp(1.05rem,1.7vw,1.25rem)] max-w-[46ch]">
                Most small businesses are dabbling in ChatGPT without
                integrating anything into core operations. We find the reclaimable
                hours — then show you which tools to buy and which systems to
                build.
              </p>
            </Reveal>
            <Reveal>
              <p className="font-mono text-xs text-smoke-dim mt-[22px] italic">
                &quot;Reclaimable hours&quot; means identified opportunities, not
                already-implemented ones. Terms disclosed before you pay.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <div className="flex flex-col gap-0.5">
              {rows.map((row) => (
                <div
                  key={row.k}
                  className="flex gap-[18px] py-[18px] border-b border-hair items-baseline last:border-b-0"
                >
                  <span
                    className="font-mono text-xs text-brass min-w-[104px] flex-none tracking-[0.05em]"
                  >
                    {row.k}
                  </span>
                  <span
                    className="text-[15px] text-bone [&_b]:text-brass-bright [&_b]:font-semibold"
                    dangerouslySetInnerHTML={{ __html: row.v }}
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
