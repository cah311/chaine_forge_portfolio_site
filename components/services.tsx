"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";
import { doors, offersForDoor, type OfferDoor } from "@/lib/pricing";
import { Reveal } from "@/components/reveal";

const ease = [0.2, 0.7, 0.3, 1] as const;

function doorFromHash(hash: string): OfferDoor | null {
  const id = hash.replace(/^#/, "");
  if (id === "automate" || id === "build" || id === "maintain") return id;
  return null;
}

export function Services() {
  const [open, setOpen] = useState<OfferDoor | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const apply = () => {
      const fromHash = doorFromHash(window.location.hash);
      if (fromHash) setOpen(fromHash);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  return (
    <section className="py-[120px] max-[900px]:py-[84px]" id="paths">
      <div className="max-w-wrap mx-auto px-7 relative z-[2]">
        <div className="flex justify-between items-end gap-6 mb-[30px] flex-wrap">
          <div>
            <Reveal>
              <span className="font-mono text-[12.5px] tracking-[0.22em] uppercase text-brass inline-flex items-center gap-2.5 before:content-[''] before:w-[22px] before:h-px before:bg-brass before:inline-block">
                Three doors
              </span>
            </Reveal>
            <Reveal>
              <h2 className="font-display font-bold text-[clamp(2rem,4.2vw,3.2rem)] tracking-[-0.025em] leading-[1.02] mt-[18px]">
                Automate. Build.
                <br />
                Maintain.
              </h2>
            </Reveal>
          </div>
          <Reveal>
            <p className="text-smoke text-[clamp(1.05rem,1.7vw,1.25rem)] max-w-[46ch] mt-[18px]">
              Pick the job you need done. Details live one click deeper —
              assessment fee credited in full toward any build booked within 90
              days.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div className="flex justify-center mb-[46px]">
            <span className="font-mono text-[13px] text-smoke text-center border border-dashed border-hair-strong rounded-full px-[22px] py-[11px] inline-flex gap-2.5 items-center">
              <i className="w-[7px] h-[7px] rounded-full bg-brass shadow-[0_0_8px_var(--brass)]" />
              {site.availability}
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 min-[901px]:grid-cols-3 gap-[18px]">
          {doors.map((door, i) => {
            const isOpen = open === door.id;
            return (
              <Reveal key={door.id} delay={reduce ? 0 : i * 0.06}>
                <button
                  type="button"
                  id={door.id}
                  aria-expanded={isOpen}
                  onClick={() => {
                    const next = isOpen ? null : door.id;
                    setOpen(next);
                    if (typeof window !== "undefined") {
                      window.history.replaceState(
                        null,
                        "",
                        next ? `#${next}` : "#paths",
                      );
                    }
                  }}
                  className={`w-full text-left border rounded-[14px] p-[28px] min-[901px]:p-[32px] transition-all duration-350 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2 group ${
                    isOpen
                      ? "border-[rgba(200,164,92,0.45)] bg-gradient-to-b from-[rgba(200,164,92,0.08)] to-iron-raised"
                      : "border-hair bg-iron-raised hover:border-hair-strong hover:-translate-y-1"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-3 mb-4">
                    <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-brass">
                      {String(i + 1).padStart(2, "0")} · {door.label}
                    </span>
                    <span
                      className={`font-mono text-xl text-brass transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden
                    >
                      +
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-[1.55rem] leading-[1.12] tracking-[-0.015em] mb-3">
                    {door.headline}
                  </h3>
                  <p className="text-smoke text-[14.5px] leading-relaxed">
                    {door.blurb}
                  </p>
                  <p className="font-mono text-[11.5px] text-smoke-dim mt-5 group-hover:text-brass transition-colors">
                    {isOpen ? "Hide offers" : "See offers"} →
                  </p>
                </button>
              </Reveal>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {open && (
            <motion.div
              key={open}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: 8 }}
              transition={{ duration: 0.35, ease }}
              className="mt-[22px]"
            >
              <DoorOffers door={open} />
            </motion.div>
          )}
        </AnimatePresence>

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

function DoorOffers({ door }: { door: OfferDoor }) {
  const list = offersForDoor(door);
  const meta = doors.find((d) => d.id === door);

  return (
    <div className="border border-hair rounded-[14px] overflow-hidden bg-iron-deep">
      <div className="px-[28px] py-[18px] border-b border-hair flex flex-wrap items-baseline justify-between gap-3">
        <span className="font-mono text-[12px] tracking-[0.16em] uppercase text-brass">
          {meta?.label} offers
        </span>
        <span className="font-mono text-[11.5px] text-smoke-dim">
          Fixed price · fixed scope
        </span>
      </div>
      <div className="grid grid-cols-1 min-[901px]:grid-cols-2 gap-px bg-hair">
        {list.map((svc) => (
          <div
            key={svc.name}
            className={`bg-iron-raised p-[28px] flex flex-col relative ${
              svc.feature
                ? "bg-gradient-to-b from-[rgba(200,164,92,0.06)] to-iron-raised"
                : ""
            }`}
          >
            {svc.badge && (
              <span className="absolute top-0 right-[22px] font-mono text-[10.5px] tracking-[0.12em] uppercase bg-brass text-[#1a140a] px-3 py-1.5 rounded-b-lg font-semibold">
                {svc.badge}
              </span>
            )}
            <div className="flex flex-wrap justify-between items-baseline gap-x-3.5 gap-y-1 mb-1.5">
              <h4 className="font-display font-bold text-[1.25rem]">{svc.name}</h4>
              <span className="font-display font-bold text-[1.35rem]">
                <span className="whitespace-nowrap">{svc.price}</span>
                <small className="text-[0.75rem] text-smoke font-medium">
                  {svc.priceNote}
                </small>
              </span>
            </div>
            <div className="font-mono text-xs text-brass mb-3.5">{svc.time}</div>
            <p className="text-smoke text-[14.5px] mb-3.5">{svc.desc}</p>
            {svc.guar && (
              <div className="text-[13.5px] text-bone border-l-2 border-brass pl-3 mb-3.5 leading-normal">
                {svc.guar}
              </div>
            )}
            <div className="font-mono text-[11.5px] text-smoke-dim mt-auto pt-2">
              {svc.bestfor}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
