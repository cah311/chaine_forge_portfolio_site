"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";

const items = [
  {
    q: "Why no calls?",
    a: "Async keeps us fast and keeps your price down. Everything lives in writing, so nothing gets lost. If a voice call is genuinely needed, we do one after the deposit — scoping happens in writing.",
  },
  {
    q: "Why do you sound like a finance firm?",
    a: "The team's background is institutional capital markets, where scope is written, fees are disclosed, and risk is controlled before work begins. We run software delivery the same way — which is why the guarantees exist in writing instead of on a sales call.",
  },
  {
    q: "Who owns the code and IP?",
    a: "You do, from the first commit. We build in a repo under your account, so you're never locked in and never waiting on a handover.",
  },
  {
    q: "What's the stack?",
    a: "TypeScript, Next.js/React, Postgres, and Stripe on the web side. Solidity and Foundry on-chain. We'll deviate if your project genuinely needs it.",
  },
  {
    q: "How does the Sprint Subscription work?",
    a: "You load a request queue; we work one request at a time, top to bottom. A request is anything buildable in about two days — bigger asks get split into sequential requests or quoted as a fixed-price project. Most requests ship in 2–4 business days. Pause whenever; unused days bank toward your next cycle.",
  },
  {
    q: "Is the seat scarcity real?",
    a: "Yes. Two subscription seats and two concurrent builds — ever. We publish actual availability and never invent urgency. The entire brand rests on you being able to verify what we say.",
  },
  {
    q: "What if my scope changes mid-build?",
    a: "Written change order, fixed price, your approval before we continue. The original scope stays the original price.",
  },
  {
    q: "Who are you?",
    a: "Operators with an institutional capital-markets background who learned to ship. We work under a brand, not a face — written specs, disclosed pricing, audit-trail delivery. Judge the work — every demo is live.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-[120px] max-[900px]:py-[84px]" id="faq">
      <div className="max-w-wrap mx-auto px-7 relative z-[2]">
        <div className="text-center mb-[50px]">
          <Reveal>
            <span className="font-mono text-[12.5px] tracking-[0.22em] uppercase text-brass inline-flex items-center gap-2.5 before:content-[''] before:w-[22px] before:h-px before:bg-brass before:inline-block">
              Questions
            </span>
          </Reveal>
          <Reveal>
            <h2
              className="font-display font-bold text-[clamp(2rem,4.2vw,3.2rem)] tracking-[-0.025em] leading-[1.02] mt-[18px]"
            >
              The honest FAQ.
            </h2>
          </Reveal>
        </div>
        <Reveal>
          <div className="max-w-[820px] mx-auto">
            {items.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={item.q} className="border-b border-hair">
                  <button
                    type="button"
                    className="w-full text-left bg-transparent border-none cursor-pointer text-bone font-display font-medium text-[1.2rem] py-[26px] pr-11 relative tracking-[-0.01em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                  >
                    {item.q}
                    <span
                      className={`absolute right-1.5 top-1/2 -translate-y-1/2 font-mono text-[22px] text-brass transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-[max-height] duration-400 ease-in-out"
                    style={{
                      maxHeight: isOpen ? "500px" : "0",
                    }}
                  >
                    <p className="text-smoke text-[15.5px] pr-[30px] pb-[26px]">
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
