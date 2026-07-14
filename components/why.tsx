import { Reveal } from "@/components/reveal";

const cells = [
  {
    n: "01",
    title: "Capital-markets discipline",
    desc: "We come from a world where an unwritten scope is a liability and \"trust me\" isn't a control. The habits came with us: written specs, disclosed pricing, audit-trail delivery — and the boring parts (data integrity, edge cases, security) done right.",
  },
  {
    n: "02",
    title: "AI-native pipeline",
    desc: "Senior-level architecture plus frontier-model leverage. What took agencies a quarter takes us weeks — and the savings are priced in.",
  },
  {
    n: "03",
    title: "Fixed price, fixed scope",
    desc: "No hourly meter. Quotes are underwritten in writing before a dollar moves. Scope changes are written, priced, and approved before work continues. No surprise invoices.",
  },
  {
    n: "04",
    title: "You own everything",
    desc: "Your code, your repo, your custody — from the first commit. Zero lock-in: fire us anytime and walk away whole.",
  },
  {
    n: "05",
    title: "Async-first",
    desc: "Everything on the record: written specs, recorded demos, daily updates. Your calendar stays empty and nothing gets lost in a call.",
  },
  {
    n: "06",
    title: "Proof over pitch",
    desc: "Four live products, public code. We'd rather you click a demo than read a testimonial wall.",
  },
];

export function Why() {
  return (
    <section className="py-[84px]">
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
                Most studios are salespeople who learned to prompt. We&apos;re capital-markets operators who learned to ship.
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
