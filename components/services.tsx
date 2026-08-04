import Link from "next/link";
import { site } from "@/lib/site";
import { doors, offersForDoor, type Offer } from "@/lib/pricing";
import { Reveal } from "@/components/reveal";

export function Services() {
  return (
    <section className="py-[120px] max-[900px]:py-[84px]" id="paths">
      <div className="max-w-wrap mx-auto px-7 relative z-[2]">
        {/* Hormozi: one front-door cash offer — not a peer menu of SKUs */}
        <div className="mb-[52px]">
          <Reveal>
            <span className="font-mono text-[12.5px] tracking-[0.22em] uppercase text-brass inline-flex items-center gap-2.5 before:content-[''] before:w-[22px] before:h-px before:bg-brass before:inline-block">
              Start here
            </span>
          </Reveal>
          <div className="grid grid-cols-1 min-[901px]:grid-cols-[1.15fr_0.85fr] gap-10 min-[901px]:gap-14 items-end mt-[18px]">
            <div>
              <Reveal>
                <h2 className="font-display font-bold text-[clamp(2rem,4.2vw,3.2rem)] tracking-[-0.025em] leading-[1.02]">
                  Book the assessment.
                  <br />
                  We prescribe the path.
                </h2>
              </Reveal>
              <Reveal>
                <p className="text-smoke text-[clamp(1.05rem,1.7vw,1.25rem)] max-w-[46ch] mt-[18px]">
                  Don&apos;t pick a SKU cold. The {site.assessmentPrice}{" "}
                  {site.currency} AI Tools Assessment maps the leak, names the
                  one door that fits, and credits the fee toward any build
                  booked within 90 days.
                </p>
              </Reveal>
              <Reveal>
                <div className="flex flex-wrap gap-3.5 mt-8">
                  <Link
                    href="#assessment"
                    className="inline-flex items-center gap-[9px] font-semibold text-[15px] px-6 py-3.5 rounded-[11px] bg-brass text-[#1a140a] hover:bg-brass-bright hover:-translate-y-0.5 transition-all group focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
                  >
                    Book assessment · {site.assessmentPrice}
                    <span className="transition-transform group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
                      ↗
                    </span>
                  </Link>
                  <Link
                    href="/time-leak"
                    className="inline-flex items-center gap-[9px] font-semibold text-[15px] px-6 py-3.5 rounded-[11px] border border-hair-strong text-bone hover:border-brass hover:text-brass hover:-translate-y-0.5 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
                  >
                    Free Time-Leak Score
                  </Link>
                </div>
              </Reveal>
            </div>
            <Reveal>
              <div className="border border-[rgba(200,164,92,0.35)] rounded-[14px] p-[26px] bg-gradient-to-b from-[rgba(200,164,92,0.07)] to-iron-raised">
                <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-brass mb-3">
                  The stack
                </p>
                <ul className="space-y-3 font-mono text-[12.5px] text-smoke">
                  {[
                    "Attract — free Time-Leak Score",
                    `Cash — ${site.assessmentPrice} assessment + guarantee`,
                    "Upsell — Automate or Build (fee credited)",
                    "Continuity — Care / Sprint / Concierge",
                  ].map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-2.5 before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-brass before:mt-1.5 before:flex-none"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
                <p className="font-mono text-[12px] text-smoke-dim mt-5 pt-4 border-t border-hair">
                  {site.availability}
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
            <div>
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-brass">
                What the assessment routes into
              </span>
              <h3 className="font-display font-bold text-[clamp(1.45rem,2.8vw,1.85rem)] tracking-[-0.02em] mt-2">
                Automate · Build · Maintain
              </h3>
            </div>
            <p className="font-mono text-[12px] text-smoke-dim max-w-[36ch]">
              Fixed price · fixed scope · prices shown. Not eight equal “buy
              now” buttons — a prescription menu.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 min-[901px]:grid-cols-3 gap-px bg-hair border border-hair rounded-[14px] overflow-hidden">
          {doors.map((door, i) => (
            <Reveal key={door.id} delay={i * 0.05} className="bg-iron-deep h-full">
              <div id={door.id} className="bg-iron-raised h-full p-[26px] min-[901px]:p-[28px] flex flex-col">
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-brass mb-3">
                  {String(i + 1).padStart(2, "0")} · {door.label}
                </span>
                <h4 className="font-display font-bold text-[1.35rem] leading-[1.15] tracking-[-0.015em] mb-2">
                  {door.headline}
                </h4>
                <p className="text-smoke text-[14px] leading-relaxed mb-6">
                  {door.blurb}
                </p>
                <div className="mt-auto space-y-0 divide-y divide-hair border-t border-hair">
                  {offersForDoor(door.id).map((svc) => (
                    <OfferRow key={svc.name} offer={svc} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-1 min-[901px]:grid-cols-[1.55fr_1fr] gap-[22px] mt-[22px]">
          <Reveal className="h-full">
            <div className="border border-[rgba(200,164,92,0.4)] rounded-[14px] p-[34px] bg-gradient-to-b from-[rgba(200,164,92,0.06)] to-iron-raised h-full flex flex-col">
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-brass mb-4">
                Risk reversal on builds
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
                your own examples. Flagship MVP: final 50% only when it ships
                as the written spec says.
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

function OfferRow({ offer }: { offer: Offer }) {
  return (
    <div className="py-4 first:pt-5">
      <div className="flex flex-wrap justify-between items-baseline gap-x-3 gap-y-1">
        <span className="font-display font-bold text-[1.05rem] text-bone">
          {offer.name}
        </span>
        <span className="font-display font-bold text-[1.05rem] whitespace-nowrap">
          {offer.price}
          <small className="text-[0.7rem] text-smoke font-medium">
            {offer.priceNote}
          </small>
        </span>
      </div>
      <p className="font-mono text-[11px] text-brass mt-1">{offer.time}</p>
      <p className="text-smoke text-[13.5px] mt-2 leading-relaxed">
        {offer.desc}
      </p>
      {offer.guar && (
        <p className="text-[12.5px] text-bone border-l-2 border-brass pl-2.5 mt-2.5 leading-snug">
          {offer.guar}
        </p>
      )}
    </div>
  );
}
