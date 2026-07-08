import { site } from "@/lib/site";
import { Reveal } from "@/components/reveal";

const services = [
  {
    name: "Launch Pack",
    price: "$1,950",
    priceNote: " USD",
    time: "5 days",
    desc: "Validate before you build. A conversion-focused landing page, waitlist with email capture, analytics, and basic SEO — deployed on your domain.",
    guar: "Live in 5 business days from content handoff — or it's free.",
    bestfor: "↳ Best for: pre-build founders who need validation signal.",
    feature: false,
    badge: null,
    fullWidth: false,
  },
  {
    name: "MVP Sprint",
    price: "$9,500",
    priceNote: " USD",
    time: "2–4 weeks",
    desc: "A real, working product: auth, payments, database, your core workflow done properly, admin basics. Includes deploy, domain, analytics, handover doc, and 30 days of Care.",
    guar: "The final 50% is only due when it ships working as the written spec says.",
    bestfor: "↳ Best for: operators who need v1 shipped, not a 6-month agency.",
    feature: true,
    badge: "Flagship",
    fullWidth: false,
  },
  {
    name: "Directory Platform",
    price: "$5,500",
    priceNote: " USD",
    time: "1–2 weeks",
    desc: "Your own Beli-style platform: interactive maps, geo search, structured listings, ratings and reviews, user lists, and an admin panel — under your brand, on our proven engine.",
    guar: "Built on a live, shipped codebase you can inspect today.",
    bestfor: "↳ Best for: creators, niche publications, associations, local media.",
    feature: false,
    badge: null,
    fullWidth: false,
  },
  {
    name: "Web3 Build",
    price: "From $12,000",
    priceNote: " USD · scoped",
    time: "Quoted per project",
    desc: "On-chain products built properly: NFT mints, dApp frontends, analytics dashboards, custom contracts, wallet integration. Security-reviewed contract architecture on Avalanche or any EVM chain. Scoped and priced per project — third-party audits quoted and billed separately.",
    guar: "Disclosed teams only. We decline stealth-pump operations.",
    bestfor: "↳ Best for: established crypto teams building real, audited products.",
    feature: false,
    badge: null,
    fullWidth: false,
  },
  {
    name: "Sprint Subscription",
    price: "$3,950",
    priceNote: " USD/mo · founding rate",
    time: "Ongoing · pause anytime",
    desc: "Your product team on tap. Unlimited request queue, one active build at a time, most requests shipped in 2–4 business days. Pause anytime and unused days bank. Cancel anytime. The founding rate locks for life — it becomes $4,950 USD/mo once the founding seats are gone.",
    guar: null,
    bestfor: "↳ Best for: post-launch founders who need continuous shipping without hiring.",
    feature: true,
    badge: "2 seats only",
    fullWidth: true,
  },
];

export function Services() {
  return (
    <section className="py-[120px] max-[900px]:py-[84px]" id="services">
      <div className="max-w-wrap mx-auto px-7 relative z-[2]">
        <div className="flex justify-between items-end gap-6 mb-[30px] flex-wrap">
          <div>
            <Reveal>
              <span className="font-mono text-[12.5px] tracking-[0.22em] uppercase text-brass inline-flex items-center gap-2.5 before:content-[''] before:w-[22px] before:h-px before:bg-brass before:inline-block">
                Services
              </span>
            </Reveal>
            <Reveal>
              <h2
                className="font-display font-bold text-[clamp(2rem,4.2vw,3.2rem)] tracking-[-0.025em] leading-[1.02] mt-[18px]"
              >
                Fixed price. Fixed scope.
                <br />
                Real capacity limits.
              </h2>
            </Reveal>
          </div>
          <Reveal>
            <p className="text-smoke text-[clamp(1.05rem,1.7vw,1.25rem)] max-w-[46ch] mt-[18px]">
              Pick a deliverable, not a retainer. Every engagement is scoped and
              priced in writing before a dollar changes hands.
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
            <Reveal
              key={svc.name}
              className={svc.fullWidth ? "min-[901px]:col-span-2" : ""}
            >
              <div
                className={`border rounded-[14px] p-[30px] bg-iron-raised flex flex-col transition-all duration-350 hover:-translate-y-1 hover:border-hair-strong relative ${
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
        <p className="font-mono text-xs text-smoke-dim text-center mt-6">
          Care plans from $750 USD/mo — hosting, monitoring, fixes, small tweaks.
          Attaches to any shipped build.
        </p>
      </div>
    </section>
  );
}
