"use client";

import { useActionState } from "react";
import { submitQuote } from "@/app/actions/quote";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

const interestOptions = [
  "AI Tools Assessment",
  "Assessment → likely build",
  "AI Concierge",
  "MVP / custom build",
  "Not sure yet",
];

const sizeOptions = [
  "Just me / solo",
  "2–5 people",
  "6–20 people",
  "21–50 people",
  "50+",
];

const timelineOptions = [
  "This month",
  "Next 1–2 months",
  "This quarter",
  "Just exploring",
];

export function QuoteForm() {
  const [state, action, pending] = useActionState(submitQuote, {
    ok: false,
    msg: "",
  });

  return (
    <section
      className="py-[120px] max-[900px]:py-[84px] bg-iron-deep border-t border-hair"
      id="assessment"
    >
      <div className="max-w-wrap mx-auto px-7 relative z-[2]">
        <div className="grid grid-cols-1 min-[901px]:grid-cols-[0.9fr_1.1fr] gap-10 min-[901px]:gap-[54px] items-start">
          <div>
            <Reveal>
              <span className="font-mono text-[12.5px] tracking-[0.22em] uppercase text-brass inline-flex items-center gap-2.5 before:content-[''] before:w-[22px] before:h-px before:bg-brass before:inline-block">
                Book
              </span>
            </Reveal>
            <Reveal>
              <h2
                className="font-display font-bold text-[clamp(2rem,4.2vw,3.2rem)] tracking-[-0.025em] leading-[1.02] mt-[18px] mb-[18px]"
              >
                Book your AI Tools Assessment.
              </h2>
            </Reveal>
            <Reveal>
              <p className="text-smoke text-[clamp(1.05rem,1.7vw,1.25rem)] max-w-[46ch]">
                {site.assessmentPrice} {site.currency}. Five reclaimable hours a
                week identified, or a full refund. Fully credited toward any
                build within 90 days. Submit the form, then pay to lock your
                slot.
              </p>
            </Reveal>
            <Reveal>
              <ul className="mt-8 space-y-3 font-mono text-[12.5px] text-smoke">
                {[
                  "45-min discovery + written report + review call",
                  "Quick wins you can run yourself",
                  "Major-projects map if you need to build",
                ].map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-2.5 before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-brass before:mt-1.5 before:flex-none"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal>
            {state.ok ? (
              <div className="grid gap-5 rounded-[14px] border border-hair-strong bg-iron-raised p-7">
                <p className="font-mono text-[12.5px] tracking-[0.12em] uppercase text-brass">
                  Step 2 of 2
                </p>
                <h3 className="font-display font-bold text-[clamp(1.4rem,2.5vw,1.85rem)] tracking-[-0.02em] leading-tight text-bone">
                  Confirm with payment.
                </h3>
                <p className="text-smoke text-[15px] leading-relaxed max-w-[42ch]">
                  {state.msg} After checkout, we&apos;ll email you within two
                  business days to book discovery. Not a fit? We refund before
                  work starts.
                </p>
                <a
                  href={site.stripeAssessmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-[9px] font-semibold text-[15px] px-6 py-3.5 rounded-[11px] bg-brass text-[#1a140a] hover:bg-brass-bright hover:-translate-y-0.5 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2 group"
                >
                  Pay {site.assessmentPrice} {site.currency} — lock your slot
                  <span className="transition-transform group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
                    ↗
                  </span>
                </a>
                <p className="font-mono text-xs text-smoke-dim">
                  Secure checkout via Stripe. Questions?{" "}
                  <a
                    href={`mailto:${site.contactEmail}`}
                    className="text-smoke hover:text-brass transition-colors underline underline-offset-2"
                  >
                    {site.contactEmail}
                  </a>
                </p>
              </div>
            ) : (
              <form action={action} className="grid gap-4">
                <div>
                  <label
                    htmlFor="f-build"
                    className="block font-mono text-xs text-smoke mb-2 tracking-[0.04em]"
                  >
                    Where does time disappear in your business?
                  </label>
                  <textarea
                    id="f-build"
                    name="build"
                    placeholder="The messy workflows, handoffs, or repetitive work that eat your week…"
                    className="w-full bg-iron-raised border border-hair-strong rounded-[10px] text-bone text-[15px] px-[15px] py-[13px] transition-colors focus:outline-none focus:border-brass resize-y min-h-[84px]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 min-[520px]:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="f-sku"
                      className="block font-mono text-xs text-smoke mb-2 tracking-[0.04em]"
                    >
                      What are you looking for?
                    </label>
                    <select
                      id="f-sku"
                      name="sku"
                      className="w-full bg-iron-raised border border-hair-strong rounded-[10px] text-bone text-[15px] px-[15px] py-[13px] transition-colors focus:outline-none focus:border-brass"
                      defaultValue="AI Tools Assessment"
                    >
                      {interestOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="f-budget"
                      className="block font-mono text-xs text-smoke mb-2 tracking-[0.04em]"
                    >
                      Team size
                    </label>
                    <select
                      id="f-budget"
                      name="budget"
                      className="w-full bg-iron-raised border border-hair-strong rounded-[10px] text-bone text-[15px] px-[15px] py-[13px] transition-colors focus:outline-none focus:border-brass"
                      defaultValue="2–5 people"
                    >
                      {sizeOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 min-[520px]:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="f-time"
                      className="block font-mono text-xs text-smoke mb-2 tracking-[0.04em]"
                    >
                      Timeline
                    </label>
                    <select
                      id="f-time"
                      name="timeline"
                      className="w-full bg-iron-raised border border-hair-strong rounded-[10px] text-bone text-[15px] px-[15px] py-[13px] transition-colors focus:outline-none focus:border-brass"
                      defaultValue="This month"
                    >
                      {timelineOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="f-email"
                      className="block font-mono text-xs text-smoke mb-2 tracking-[0.04em]"
                    >
                      Email
                    </label>
                    <input
                      id="f-email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      className="w-full bg-iron-raised border border-hair-strong rounded-[10px] text-bone text-[15px] px-[15px] py-[13px] transition-colors focus:outline-none focus:border-brass"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="f-links"
                    className="block font-mono text-xs text-smoke mb-2 tracking-[0.04em]"
                  >
                    Website or LinkedIn (optional)
                  </label>
                  <input
                    id="f-links"
                    name="links"
                    type="text"
                    placeholder="company.com or linkedin.com/…"
                    className="w-full bg-iron-raised border border-hair-strong rounded-[10px] text-bone text-[15px] px-[15px] py-[13px] transition-colors focus:outline-none focus:border-brass"
                  />
                </div>

                <button
                  type="submit"
                  disabled={pending}
                  className="inline-flex items-center justify-center gap-[9px] font-semibold text-[15px] px-6 py-3.5 rounded-[11px] bg-brass text-[#1a140a] hover:bg-brass-bright hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2 group"
                >
                  {pending ? "Sending…" : "Continue to payment"}
                  {!pending && (
                    <span className="transition-transform group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
                      ↗
                    </span>
                  )}
                </button>

                {state.msg && (
                  <div className="text-sm min-h-[18px] text-smoke">
                    {state.msg}
                  </div>
                )}

                <p className="font-mono text-xs text-smoke-dim mt-1">
                  Next: secure Stripe checkout for {site.assessmentPrice}{" "}
                  {site.currency}. No spam, no drip.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
