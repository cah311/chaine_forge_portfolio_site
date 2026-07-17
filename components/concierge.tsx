import Link from "next/link";
import { Reveal } from "@/components/reveal";

const inclusions = [
  {
    title: "Two working sessions / month",
    desc: "45-minute Zoom builds — we construct Claude skills and workflows with you, not for you.",
  },
  {
    title: "Async access",
    desc: "Questions and reviews between sessions with a 12-business-hour SLA.",
  },
  {
    title: "90-day win defined upfront",
    desc: "Onboarding locks a measurable outcome so renewal is earned, not assumed.",
  },
  {
    title: "Living accomplishment hub",
    desc: "A shared Notion inventory of what we shipped — the receipt for every month.",
  },
];

export function Concierge() {
  return (
    <section
      className="py-[120px] max-[900px]:py-[84px] bg-iron-deep border-t border-b border-hair"
      id="concierge"
    >
      <div className="max-w-wrap mx-auto px-7 relative z-[2]">
        <div className="grid grid-cols-1 min-[901px]:grid-cols-[0.95fr_1.05fr] gap-12 min-[901px]:gap-16 items-start">
          <div>
            <Reveal>
              <span className="font-mono text-[12.5px] tracking-[0.22em] uppercase text-brass inline-flex items-center gap-2.5 before:content-[''] before:w-[22px] before:h-px before:bg-brass before:inline-block">
                AI Concierge
              </span>
            </Reveal>
            <Reveal>
              <h2
                className="font-display font-bold text-[clamp(2rem,4.2vw,3.2rem)] tracking-[-0.025em] leading-[1.02] mt-[18px] mb-[18px]"
              >
                Ongoing AI leverage.
                <br />
                Hard-capped at 5–6 clients.
              </h2>
            </Reveal>
            <Reveal>
              <p className="text-smoke text-[clamp(1.05rem,1.7vw,1.25rem)] max-w-[46ch] mb-8">
                The crown jewel after the assessment: a done-with-you retainer
                that turns AI from a dabble into a working system inside your
                business. Real capacity — we say the number out loud.
              </p>
            </Reveal>
            <Reveal>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-8">
                <span className="font-display font-bold text-[2.4rem] tracking-[-0.02em]">
                  $1,800–$2,800
                </span>
                <span className="font-mono text-sm text-smoke">CAD / month</span>
              </div>
            </Reveal>
            <Reveal>
              <Link
                href="#assessment"
                className="inline-flex items-center gap-[9px] font-semibold text-[15px] px-6 py-3.5 rounded-[11px] bg-brass text-[#1a140a] hover:bg-brass-bright hover:-translate-y-0.5 transition-all group focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
              >
                Start with an assessment
                <span className="transition-transform group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
                  ↗
                </span>
              </Link>
            </Reveal>
          </div>

          <Reveal>
            <div className="grid gap-px bg-hair border border-hair rounded-[14px] overflow-hidden">
              {inclusions.map((item, i) => (
                <div
                  key={item.title}
                  className="bg-iron p-7 min-[901px]:px-8 flex gap-5"
                >
                  <span className="font-mono text-xs text-brass flex-none pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-[1.15rem] mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-smoke text-[14.5px]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
