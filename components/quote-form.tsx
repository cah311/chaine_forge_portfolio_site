"use client";

import { useActionState, useEffect, useRef } from "react";
import { track } from "@vercel/analytics";
import { submitQuote } from "@/app/actions/quote";
import { Reveal } from "@/components/reveal";
import {
  industryOptions,
  interestOptions,
  revenueOptions,
  sizeOptions,
  timelineOptions,
} from "@/lib/qualification";
import { site } from "@/lib/site";

const fieldClass =
  "w-full bg-iron-raised border border-hair-strong rounded-[10px] text-bone text-[15px] px-[15px] py-[13px] transition-colors focus:outline-none focus:border-brass";
const labelClass =
  "block font-mono text-xs text-smoke mb-2 tracking-[0.04em]";

export function QuoteForm() {
  const [state, action, pending] = useActionState(submitQuote, {
    ok: false,
    msg: "",
    outcome: null,
  });
  const trackedSubmit = useRef(false);

  useEffect(() => {
    if (state.ok && state.outcome && !trackedSubmit.current) {
      trackedSubmit.current = true;
      track("assessment_form_submitted", { outcome: state.outcome });
      if (state.outcome === "pay") track("assessment_pay_eligible");
      if (state.outcome === "nurture_conflict")
        track("assessment_nurture_conflict");
      if (state.outcome === "nurture_size") track("assessment_nurture_size");
    }
  }, [state.ok, state.outcome]);

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
                {site.assessmentPrice} {site.currency}. Built for teams of
                roughly 2–20 with real manual workflows. Five reclaimable hours
                a week identified, or a full refund — credited toward any build
                within 90 days.
              </p>
            </Reveal>
            <Reveal>
              <ul className="mt-8 space-y-3 font-mono text-[12.5px] text-smoke">
                {[
                  "Qualify in ~2 minutes — then pay to lock your slot",
                  "45-min discovery + written report + review call",
                  "Quick wins you can run + a major-projects map",
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
            {state.ok && state.outcome === "pay" ? (
              <PaySuccess msg={state.msg} />
            ) : state.ok && state.outcome === "nurture_conflict" ? (
              <NurtureConflict msg={state.msg} />
            ) : state.ok && state.outcome === "nurture_size" ? (
              <NurtureSize msg={state.msg} />
            ) : (
              <form action={action} className="grid gap-4">
                <div>
                  <p className={labelClass}>
                    Name three manual workflows that eat your week
                  </p>
                  <div className="grid gap-2.5">
                    {(
                      [
                        ["workflow1", "e.g. Manual invoicing / follow-ups"],
                        ["workflow2", "e.g. Client intake or scheduling"],
                        ["workflow3", "e.g. Reporting, handoffs, data entry"],
                      ] as const
                    ).map(([name, placeholder], i) => (
                      <input
                        key={name}
                        id={name}
                        name={name}
                        type="text"
                        placeholder={`${i + 1}. ${placeholder}`}
                        className={fieldClass}
                        required
                      />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 min-[520px]:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="f-size" className={labelClass}>
                      Team size
                    </label>
                    <select
                      id="f-size"
                      name="teamSize"
                      className={fieldClass}
                      defaultValue="2–5 people"
                      required
                    >
                      {sizeOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="f-revenue" className={labelClass}>
                      Approx. annual revenue
                    </label>
                    <select
                      id="f-revenue"
                      name="revenue"
                      className={fieldClass}
                      defaultValue="$250k–$1M CAD"
                      required
                    >
                      {revenueOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="f-industry" className={labelClass}>
                    Industry
                  </label>
                  <select
                    id="f-industry"
                    name="industry"
                    className={fieldClass}
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Select your industry…
                    </option>
                    {industryOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 min-[520px]:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="f-sku" className={labelClass}>
                      What are you looking for?
                    </label>
                    <select
                      id="f-sku"
                      name="sku"
                      className={fieldClass}
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
                    <label htmlFor="f-time" className={labelClass}>
                      Timeline
                    </label>
                    <select
                      id="f-time"
                      name="timeline"
                      className={fieldClass}
                      defaultValue="This month"
                    >
                      {timelineOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 min-[520px]:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="f-email" className={labelClass}>
                      Email
                    </label>
                    <input
                      id="f-email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      className={fieldClass}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="f-links" className={labelClass}>
                      Website or LinkedIn (optional)
                    </label>
                    <input
                      id="f-links"
                      name="links"
                      type="text"
                      placeholder="company.com or linkedin.com/…"
                      className={fieldClass}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={pending}
                  className="inline-flex items-center justify-center gap-[9px] font-semibold text-[15px] px-6 py-3.5 rounded-[11px] bg-brass text-[#1a140a] hover:bg-brass-bright hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2 group"
                >
                  {pending ? "Sending…" : "Submit qualification"}
                  {!pending && (
                    <span className="transition-transform group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
                      ↗
                    </span>
                  )}
                </button>

                {state.msg && !state.ok && (
                  <div className="text-sm min-h-[18px] text-smoke">
                    {state.msg}
                  </div>
                )}

                <p className="font-mono text-xs text-smoke-dim mt-1">
                  Fits 2–20 people with clear workflows go straight to checkout.
                  A few verticals are on a short waitlist for capacity reasons —
                  we&apos;ll keep your spot.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PaySuccess({ msg }: { msg: string }) {
  return (
    <div className="grid gap-5 rounded-[14px] border border-hair-strong bg-iron-raised p-7">
      <p className="font-mono text-[12.5px] tracking-[0.12em] uppercase text-brass">
        Step 2 of 2
      </p>
      <h3 className="font-display font-bold text-[clamp(1.4rem,2.5vw,1.85rem)] tracking-[-0.02em] leading-tight text-bone">
        Confirm with payment.
      </h3>
      <p className="text-smoke text-[15px] leading-relaxed max-w-[42ch]">
        {msg} After checkout, we&apos;ll email you within two business days to
        book discovery. Not a fit? We refund before work starts.
      </p>
      <a
        href={site.stripeAssessmentUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("assessment_pay_clicked")}
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
  );
}

function NurtureConflict({ msg }: { msg: string }) {
  return (
    <div className="grid gap-5 rounded-[14px] border border-hair-strong bg-iron-raised p-7">
      <p className="font-mono text-[12.5px] tracking-[0.12em] uppercase text-brass">
        On the list
      </p>
      <h3 className="font-display font-bold text-[clamp(1.4rem,2.5vw,1.85rem)] tracking-[-0.02em] leading-tight text-bone">
        Not closed — just not this month.
      </h3>
      <p className="text-smoke text-[15px] leading-relaxed max-w-[44ch]">
        {msg} Advice-, wealth-, and healthcare-practice firms are a natural fit
        for us long term. Right now we&apos;re sequencing capacity carefully, so
        we&apos;re holding your details and will reach out when we open that
        lane — no payment needed today.
      </p>
      <p className="font-mono text-xs text-smoke-dim">
        Questions in the meantime?{" "}
        <a
          href={`mailto:${site.contactEmail}`}
          className="text-smoke hover:text-brass transition-colors underline underline-offset-2"
        >
          {site.contactEmail}
        </a>
      </p>
    </div>
  );
}

function NurtureSize({ msg }: { msg: string }) {
  return (
    <div className="grid gap-5 rounded-[14px] border border-hair-strong bg-iron-raised p-7">
      <p className="font-mono text-[12.5px] tracking-[0.12em] uppercase text-brass">
        Got it
      </p>
      <h3 className="font-display font-bold text-[clamp(1.4rem,2.5vw,1.85rem)] tracking-[-0.02em] leading-tight text-bone">
        Thanks — we&apos;ll follow up.
      </h3>
      <p className="text-smoke text-[15px] leading-relaxed max-w-[44ch]">
        {msg} The fixed-fee assessment is tuned for teams of about 2–20. We
        still want the conversation; we&apos;ll reply with the right next step
        instead of taking payment today.
      </p>
      <p className="font-mono text-xs text-smoke-dim">
        Prefer to write us?{" "}
        <a
          href={`mailto:${site.contactEmail}`}
          className="text-smoke hover:text-brass transition-colors underline underline-offset-2"
        >
          {site.contactEmail}
        </a>
      </p>
    </div>
  );
}
