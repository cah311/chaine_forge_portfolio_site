import { Reveal } from "@/components/reveal";

const rows = [
  {
    k: "QUOTE",
    v: "A fixed written quote in <b>48 hours</b> — or an honest \"not a fit.\"",
  },
  {
    k: "START",
    v: "First commit within <b>2 business days</b> of your deposit.",
  },
  {
    k: "LAUNCH PACK",
    v: "Live in 5 business days from content handoff, <b>or it's free</b>.",
  },
  {
    k: "EVERY BUILD",
    v: "The final 50% is due <b>only when it works</b> as the spec says.",
  },
  {
    k: "OWNERSHIP",
    v: "Your code, repo, and IP — <b>from the first commit</b>.",
  },
  {
    k: "AFTER SHIP",
    v: "A <b>14-day</b> fix window, no quibbling.",
  },
];

export function RiskBand() {
  return (
    <section
      className="py-[120px] max-[900px]:py-[84px] bg-iron-deep border-t border-b border-hair relative before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-ember before:to-transparent before:opacity-50"
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
                The risk sits with us.
              </h2>
            </Reveal>
            <Reveal>
              <p className="text-smoke text-[clamp(1.05rem,1.7vw,1.25rem)] max-w-[46ch]">
                A faceless studio earns trust structurally — not with a founder
                story. So we put the risk on our side of the table and write it
                into every quote.
              </p>
            </Reveal>
            <Reveal>
              <p className="font-mono text-xs text-smoke-dim mt-[22px] italic">
                Conditions are written into every quote — the clock pauses when
                we&apos;re waiting on you. Fair both ways.
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
