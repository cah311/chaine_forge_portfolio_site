import { Reveal } from "@/components/reveal";

const cells = [
  {
    n: "01",
    title: "We prescribe and we build",
    desc: "Most AI consultants stop at a slide deck. We can recommend free tools generously — and honestly recommend building when nothing off-the-shelf solves it. Same team does both.",
  },
  {
    n: "02",
    title: "Paid assessment, not a free audit",
    desc: "Paid diagnostics self-qualify and convert. $1,500 CAD filters tire-kickers, sits below the $2,500–$4,500 \"readiness\" band, and disappears entirely if you proceed to a build.",
  },
  {
    n: "03",
    title: "Guarantee with teeth",
    desc: "Five reclaimable hours per week, or a full refund. Capacity is limited so every report is hand-built. No fake urgency — just real constraints.",
  },
  {
    n: "04",
    title: "Vertical-agnostic by design",
    desc: "If you have 2–20 people, real workflows, and a budget for $1,500, we can assess you. A few verticals sit on a shortlist while we sequence capacity — not because they aren't a fit long term.",
  },
  {
    n: "05",
    title: "Proof you can click",
    desc: "Four products we built ourselves are live. Judge the work before you pay for advice about work.",
  },
  {
    n: "06",
    title: "Written, underwritten delivery",
    desc: "Capital-markets habits: written specs, disclosed pricing, audit-trail delivery. When we build, final payment is due only when it works as the spec says.",
  },
];

export function Why() {
  return (
    <section className="py-[84px]" id="about">
      <div className="max-w-wrap mx-auto px-7 relative z-[2]">
        <div className="flex justify-between items-end gap-6 mb-10 flex-wrap">
          <div>
            <Reveal>
              <span className="font-mono text-[12.5px] tracking-[0.22em] uppercase text-brass inline-flex items-center gap-2.5 before:content-[''] before:w-[22px] before:h-px before:bg-brass before:inline-block">
                Why Chain Forge
              </span>
            </Reveal>
            <Reveal>
              <h2
                className="font-display font-bold text-[clamp(2rem,4.2vw,3.2rem)] tracking-[-0.025em] leading-[1.02] mt-[18px]"
              >
                We find where AI saves your business time — then build what
                off-the-shelf tools can&apos;t.
              </h2>
            </Reveal>
          </div>
        </div>
        <Reveal>
          <div
            className="grid grid-cols-1 min-[901px]:grid-cols-3 gap-px bg-hair border border-hair rounded-[14px] overflow-hidden"
          >
            {cells.map((cell) => (
              <div key={cell.n} className="bg-iron p-[34px] min-[901px]:px-[30px]">
                <div className="font-mono text-xs text-brass mb-4">{cell.n}</div>
                <h3 className="font-display font-bold text-[1.2rem] mb-2.5">
                  {cell.title}
                </h3>
                <p className="text-smoke text-[14.5px]">{cell.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
