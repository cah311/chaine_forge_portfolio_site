"use client";

import { useActionState } from "react";
import { submitQuote } from "@/app/actions/quote";
import { Reveal } from "@/components/reveal";

const skuOptions = [
  "Not sure yet",
  "Launch Pack",
  "MVP Sprint",
  "Directory Platform",
  "Token Launchpad",
  "Sprint Subscription",
];

const budgetOptions = [
  "Under $2k",
  "$2–5k",
  "$5–10k",
  "$10–20k",
  "$20k+",
];

const timelineOptions = [
  "ASAP",
  "2–4 weeks",
  "1–3 months",
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
      id="contact"
    >
      <div className="max-w-wrap mx-auto px-7 relative z-[2]">
        <div className="grid grid-cols-1 min-[901px]:grid-cols-[0.9fr_1.1fr] gap-10 min-[901px]:gap-[54px] items-start">
          <div>
            <Reveal>
              <span className="font-mono text-[12.5px] tracking-[0.22em] uppercase text-brass inline-flex items-center gap-2.5 before:content-[''] before:w-[22px] before:h-px before:bg-brass before:inline-block">
                Start
              </span>
            </Reveal>
            <Reveal>
              <h2
                className="font-display font-bold text-[clamp(2rem,4.2vw,3.2rem)] tracking-[-0.025em] leading-[1.02] mt-[18px] mb-[18px]"
              >
                Tell us what you&apos;re building.
              </h2>
            </Reveal>
            <Reveal>
              <p className="text-smoke text-[clamp(1.05rem,1.7vw,1.25rem)] max-w-[46ch]">
                We reply within 48 hours with a fixed quote or an honest
                &quot;not a fit.&quot; Either way, you&apos;ll know more than
                you do now.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <form action={action} className="grid gap-4">
              <div>
                <label
                  htmlFor="f-build"
                  className="block font-mono text-xs text-smoke mb-2 tracking-[0.04em]"
                >
                  What are you building?
                </label>
                <textarea
                  id="f-build"
                  name="build"
                  placeholder="A few sentences on the product and the core problem it solves…"
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
                    Which offer fits best?
                  </label>
                  <select
                    id="f-sku"
                    name="sku"
                    className="w-full bg-iron-raised border border-hair-strong rounded-[10px] text-bone text-[15px] px-[15px] py-[13px] transition-colors focus:outline-none focus:border-brass"
                    defaultValue="Not sure yet"
                  >
                    {skuOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="f-budget"
                    className="block font-mono text-xs text-smoke mb-2 tracking-[0.04em]"
                  >
                    Budget range
                  </label>
                  <select
                    id="f-budget"
                    name="budget"
                    className="w-full bg-iron-raised border border-hair-strong rounded-[10px] text-bone text-[15px] px-[15px] py-[13px] transition-colors focus:outline-none focus:border-brass"
                    defaultValue="Under $2k"
                  >
                    {budgetOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
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
                    defaultValue="ASAP"
                  >
                    {timelineOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
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
                  Links — anything relevant (optional)
                </label>
                <input
                  id="f-links"
                  name="links"
                  type="text"
                  placeholder="Figma, repo, existing site…"
                  className="w-full bg-iron-raised border border-hair-strong rounded-[10px] text-bone text-[15px] px-[15px] py-[13px] transition-colors focus:outline-none focus:border-brass"
                />
              </div>

              <button
                type="submit"
                disabled={pending}
                className="inline-flex items-center justify-center gap-[9px] font-semibold text-[15px] px-6 py-3.5 rounded-[11px] bg-brass text-[#1a140a] hover:bg-brass-bright hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2 group"
              >
                {pending ? "Sending…" : "Send it — get a quote in 48h"}
                {!pending && (
                  <span className="transition-transform group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
                    ↗
                  </span>
                )}
              </button>

              {state.msg && (
                <div
                  className={`text-sm min-h-[18px] ${state.ok ? "text-brass" : "text-smoke"}`}
                >
                  {state.msg}
                </div>
              )}

              <p className="font-mono text-xs text-smoke-dim mt-1">
                No spam, no drip sequence. One human reply.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
