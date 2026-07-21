import Link from "next/link";
import { site } from "@/lib/site";
import { Reveal } from "@/components/reveal";

const services = [
  {
    name: "Quick Automation",
    price: "From $1,950",
    priceNote: " CAD",
    time: "Days, not weeks",
    desc: "A single workflow or integration that kills a recurring manual task — connected to the tools you already use.",
    guar: "Scoped and priced in writing before work starts.",
    bestfor: "↳ Best for: one painful process you want gone this month.",
    feature: false,
    badge: null,
  },
  {
    name: "Knowledge System",
    price: "$3,000–$3,500",
    priceNote: " CAD",
    time: "1–2 weeks",
    desc: "Process redesign plus a custom GPT / knowledge base / SOP system your team actually uses — not another unused Notion wiki.",
    guar: null,
    bestfor: "↳ Best for: teams drowning in tribal knowledge and repeat questions.",
    feature: false,
    badge: null,
  },
  {
    name: "Custom Claude Skills",
    price: "$3,000–$5,000",
    priceNote: " CAD",
    time: "1–3 weeks",
    desc: "A skill suite built with you — reusable AI workflows wired to your real processes, not generic prompts.",
    guar: "Done-with-you sessions so your team can extend what we leave behind.",
    bestfor: "↳ Best for: operators ready to productize how they work with AI.",
    feature: true,
    badge: "High leverage",
  },
  {
    name: "Directory Platform",
    price: "$5,500",
    priceNote: " CAD",
    time: "1–2 weeks",
    desc: "Your own discovery platform: interactive maps, geo search, structured listings, ratings and reviews, user lists, and an admin panel — on a live engine you can inspect today.",
    guar: "Built on a shipped product in our portfolio.",
    bestfor: "↳ Best for: niche communities, associations, local media.",
    feature: false,
    badge: null,
  },
  {
    name: "MVP Sprint",
    price: "$9,500",
    priceNote: " CAD",
    time: "2–4 weeks",
    desc: "A real working product: auth, payments, database, your core workflow, admin basics. Deploy, domain, analytics, handover, and 30 days of Care.",
    guar: "The final 50% is only due when it ships working as the written spec says.",
    bestfor: "↳ Best for: operators who need v1 shipped, not a 6-month agency.",
    feature: true,
    badge: "Flagship build",
  },
  {
    name: "Care Retainer",
    price: "$149 / $379 / $799",
    priceNote: " CAD/mo",
    time: "Ongoing · attaches to any shipped build",
    desc: "Hosting, monitoring, fixes, and small tweaks so what we ship stays healthy. Three tiers by how hands-on you need us — priced so the smoothing layer is an easy yes at handover.",
    guar: "Offered on every delivery email. Pause or cancel anytime.",
    bestfor: "↳ Best for: teams that want the build maintained without hiring.",
    feature: false,
    badge: "Retainer",
  },
  {
    name: "Sprint Subscription",
    price: "$3,950",
    priceNote: " CAD/mo",
    time: "Ongoing · pause anytime",
    desc: "Rolling build capacity. Unlimited request queue, one active build at a time, most requests shipped in 2–4 business days. Pause anytime; unused days bank.",
    guar: null,
    bestfor: "↳ Best for: post-launch teams that need continuous shipping without hiring.",
    feature: false,
    badge: null,
  },
];

export function Services() {
  return (
    <section className="py-[120px] max-[900px]:py-[84px]" id="build">
      <div className="max-w-wrap mx-auto px-7 relative z-[2]">
        <div className="flex justify-between items-end gap-6 mb-[30px] flex-wrap">
          <div>
            <Reveal>
              <span className="font-mono text-[12.5px] tracking-[0.22em] uppercase text-brass inline-flex items-center gap-2.5 before:content-[''] before:w-[22px] before:h-px before:bg-brass before:inline-block">
                Build
              </span>
            </Reveal>
            <Reveal>
              <h2
                className="font-display font-bold text-[clamp(2rem,4.2vw,3.2rem)] tracking-[-0.025em] leading-[1.02] mt-[18px]"
              >
                When off-the-shelf
                <br />
                isn&apos;t enough.
              </h2>
            </Reveal>
          </div>
          <Reveal>
            <p className="text-smoke text-[clamp(1.05rem,1.7vw,1.25rem)] max-w-[46ch] mt-[18px]">
              The assessment&apos;s major-projects quadrant maps here. Fixed
              price, fixed scope, your repo from day one. Assessment fee credited
              in full if you book within 90 days.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div className="flex justify-center mb-[46px]">
            <span
              className="font-mono text-[13px] text-smoke text-center border border-dashed border-hair-strong rounded-full px-[22px] py-[11px] inline-flex gap-2.5 items-center"
            >
              <i className="w-[7px] h-[7px] rounded-full bg-brass shadow-[0_0_8px_var(--brass)]" />
              {site.availability}
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 min-[901px]:grid-cols-2 gap-[22px] mt-2">
          {services.map((svc) => (
            <Reveal key={svc.name}>
              <div
                className={`border rounded-[14px] p-[30px] bg-iron-raised flex flex-col h-full transition-all duration-350 hover:-translate-y-1 hover:border-hair-strong relative ${
                  svc.feature
                    ? "border-[rgba(200,164,92,0.4)] bg-gradient-to-b from-[rgba(200,164,92,0.06)] to-iron-raised"
                    : "border-hair"
                }`}
              >
                {svc.badge && (
                  <span
                    className="absolute -top-px right-[22px] font-mono text-[10.5px] tracking-[0.12em] uppercase bg-brass text-[#1a140a] px-3 py-1.5 rounded-b-lg font-semibold"
                  >
                    {svc.badge}
                  </span>
                )}
                <div className="flex flex-wrap justify-between items-baseline gap-x-3.5 gap-y-1 mb-1.5">
                  <h3 className="font-display font-bold text-[1.4rem]">
                    {svc.name}
                  </h3>
                  <span className="font-display font-bold text-2xl">
                    <span className="whitespace-nowrap">{svc.price}</span>
                    <small className="text-[0.8rem] text-smoke font-medium">
                      {svc.priceNote}
                    </small>
                  </span>
                </div>
                <div className="font-mono text-xs text-brass mb-4">
                  {svc.time}
                </div>
                <p className="text-smoke text-[14.5px] mb-4">{svc.desc}</p>
                {svc.guar && (
                  <div
                    className="text-[13.5px] text-bone border-l-2 border-brass pl-3 mb-4 leading-normal"
                  >
                    {svc.guar}
                  </div>
                )}
                <div className="font-mono text-[11.5px] text-smoke-dim mt-auto pt-2">
                  {svc.bestfor}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-1 min-[901px]:grid-cols-[1.55fr_1fr] gap-[22px] mt-[22px]">
          <Reveal className="h-full">
            <div className="border border-[rgba(200,164,92,0.4)] rounded-[14px] p-[34px] bg-gradient-to-b from-[rgba(200,164,92,0.06)] to-iron-raised h-full flex flex-col">
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-brass mb-4">
                Before you pay
              </span>
              <h3 className="font-display font-bold text-[1.55rem] leading-[1.15] tracking-[-0.015em] mb-4">
                Tested against your real work — before the final invoice.
              </h3>
              <p className="text-smoke text-[15.5px] leading-relaxed">
                Every custom build gets checked against your own history before
                you pay the balance. If we build you a quoting tool, we run your
                last fifty real quotes through it and show you the scorecard:
                what matched, what didn&apos;t, and what we fixed. You
                don&apos;t take our word that it works. You watch it work on
                your own examples.
              </p>
            </div>
          </Reveal>
          <Reveal className="h-full">
            <div className="border border-hair rounded-[14px] p-[34px] bg-iron-raised h-full flex flex-col">
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-brass mb-4">
                Your tools stay
              </span>
              <h3 className="font-display font-bold text-[1.55rem] leading-[1.15] tracking-[-0.015em] mb-4">
                We build on what you already use.
              </h3>
              <p className="text-smoke text-[15.5px] leading-relaxed">
                If you run QuickBooks, Jobber, Gmail, or a spreadsheet that
                works, we build on top of it — we don&apos;t rip it out. New
                software is a last resort, not a sales strategy. The best build
                is the one your team doesn&apos;t have to learn.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <p className="font-mono text-xs text-smoke-dim text-center mt-8 max-w-[62ch] mx-auto leading-relaxed">
            Token launchpad and on-chain infra live on a{" "}
            <Link
              href="/launchpad"
              className="text-brass hover:text-brass-bright transition-colors underline underline-offset-2"
            >
              separate page
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
