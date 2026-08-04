"use client";

import { useActionState, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { submitQuizLead, type QuizSubmitState } from "@/app/actions/quiz";
import {
  funnelEvents,
  readAttribution,
  trackFunnel,
} from "@/lib/analytics";
import {
  getQuizName,
  type QuizNameVariant,
} from "@/lib/quiz/names";
import {
  adminHoursOptions,
  computeQuizScore,
  formatCad,
  hourlyValueOptions,
  leakCategories,
  type LeakCategoryId,
  type QuizAnswers,
} from "@/lib/quiz/scoring";
import {
  industryOptions,
  sizeOptions,
} from "@/lib/qualification";
import { site } from "@/lib/site";

const fieldClass =
  "w-full bg-iron-raised border border-hair-strong rounded-[10px] text-bone text-[15px] px-[15px] py-[13px] transition-colors focus:outline-none focus:border-brass";
const labelClass =
  "block font-mono text-xs text-smoke mb-2 tracking-[0.04em]";

type Step = "industry" | "size" | "hours" | "value" | "categories" | "score" | "gate";

const steps: Step[] = [
  "industry",
  "size",
  "hours",
  "value",
  "categories",
  "score",
  "gate",
];

type Props = {
  variant: QuizNameVariant;
};

export function TimeLeakQuiz({ variant }: Props) {
  const router = useRouter();
  const copy = getQuizName(variant);
  const [step, setStep] = useState<Step>("industry");
  const [industry, setIndustry] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [adminHours, setAdminHours] = useState("");
  const [hourlyValue, setHourlyValue] = useState("");
  const [categories, setCategories] = useState<LeakCategoryId[]>([]);
  const started = useRef(false);
  const gateTracked = useRef(false);
  const [attr, setAttr] = useState({
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
    referrer: "",
  });

  const [state, action, pending] = useActionState(submitQuizLead, {
    ok: false,
    msg: "",
  } satisfies QuizSubmitState);

  useEffect(() => {
    const a = readAttribution();
    setAttr({
      utmSource: a.utmSource ?? "",
      utmMedium: a.utmMedium ?? "",
      utmCampaign: a.utmCampaign ?? "",
      referrer: a.referrer ?? (typeof document !== "undefined" ? document.referrer : ""),
    });
  }, []);

  const answers: QuizAnswers | null = useMemo(() => {
    if (!industry || !teamSize || !adminHours || !hourlyValue) return null;
    return {
      industry,
      teamSize,
      adminHours,
      hourlyValue,
      categories,
      variant,
    };
  }, [industry, teamSize, adminHours, hourlyValue, categories, variant]);

  const previewScore = useMemo(
    () => (answers ? computeQuizScore(answers) : null),
    [answers],
  );

  useEffect(() => {
    if (!started.current) {
      started.current = true;
      trackFunnel(funnelEvents.quizStarted, { variant });
    }
  }, [variant]);

  useEffect(() => {
    trackFunnel(funnelEvents.quizStep, { step, variant });
  }, [step, variant]);

  useEffect(() => {
    if (step === "score" && previewScore) {
      trackFunnel(funnelEvents.quizCompleted, {
        variant,
        hours_mid: Math.round(
          (previewScore.hoursLow + previewScore.hoursHigh) / 2,
        ),
        outcome: previewScore.outcome,
      });
    }
    if (step === "gate" && !gateTracked.current) {
      gateTracked.current = true;
      trackFunnel(funnelEvents.quizEmailGateShown, { variant });
    }
  }, [step, previewScore, variant]);

  useEffect(() => {
    if (state.ok && state.resultsPath) {
      trackFunnel(funnelEvents.quizEmailCaptured, {
        variant,
        outcome: previewScore?.outcome,
      });
      router.push(state.resultsPath);
    }
  }, [state.ok, state.resultsPath, router, variant, previewScore?.outcome]);

  const stepIndex = steps.indexOf(step);
  const progress = ((stepIndex + 1) / steps.length) * 100;

  function toggleCategory(id: LeakCategoryId) {
    setCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id].slice(0, 4),
    );
  }

  function nextFromCategories() {
    if (categories.length === 0) {
      // Allow empty — scoring falls back to industry bias.
    }
    setStep("score");
  }

  return (
    <div className="rounded-[18px] border border-hair-strong bg-iron-raised/80 overflow-hidden">
      <div className="h-1 bg-iron-deep">
        <div
          className="h-full bg-brass transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="p-7 max-[520px]:p-5">
        <div className="flex items-center justify-between gap-3 mb-6">
          <span className="font-mono text-[12.5px] tracking-[0.18em] uppercase text-brass">
            {copy.name}
          </span>
          <span className="font-mono text-[12px] text-smoke-dim">
            Step {stepIndex + 1} / {steps.length}
          </span>
        </div>

        {step === "industry" && (
          <StepShell
            title="What kind of business is this?"
            body="We'll bias the estimate toward how work usually leaks in your vertical."
          >
            <label className={labelClass} htmlFor="industry">
              Industry
            </label>
            <select
              id="industry"
              className={fieldClass}
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              <option value="">Select…</option>
              {industryOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <NavRow
              onNext={() => industry && setStep("size")}
              nextDisabled={!industry}
            />
          </StepShell>
        )}

        {step === "size" && (
          <StepShell
            title="How big is the team?"
            body="Team size changes how much reclaimable time usually shows up."
          >
            <label className={labelClass} htmlFor="teamSize">
              Team size
            </label>
            <select
              id="teamSize"
              className={fieldClass}
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
            >
              <option value="">Select…</option>
              {sizeOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <NavRow
              onBack={() => setStep("industry")}
              onNext={() => teamSize && setStep("hours")}
              nextDisabled={!teamSize}
            />
          </StepShell>
        )}

        {step === "hours" && (
          <StepShell
            title="How many hours/week go to admin work?"
            body="Quoting, scheduling, invoicing, CRM updates, inbox — the recurring glue work."
          >
            <label className={labelClass} htmlFor="adminHours">
              Admin hours / week
            </label>
            <select
              id="adminHours"
              className={fieldClass}
              value={adminHours}
              onChange={(e) => setAdminHours(e.target.value)}
            >
              <option value="">Select…</option>
              {adminHoursOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <NavRow
              onBack={() => setStep("size")}
              onNext={() => adminHours && setStep("value")}
              nextDisabled={!adminHours}
            />
          </StepShell>
        )}

        {step === "value" && (
          <StepShell
            title="What's an hour of that work roughly worth?"
            body="Use the loaded cost of whoever usually does it — owner time counts."
          >
            <label className={labelClass} htmlFor="hourlyValue">
              Hourly value
            </label>
            <select
              id="hourlyValue"
              className={fieldClass}
              value={hourlyValue}
              onChange={(e) => setHourlyValue(e.target.value)}
            >
              <option value="">Select…</option>
              {hourlyValueOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <NavRow
              onBack={() => setStep("hours")}
              onNext={() => hourlyValue && setStep("categories")}
              nextDisabled={!hourlyValue}
            />
          </StepShell>
        )}

        {step === "categories" && (
          <StepShell
            title="Where does time leak most?"
            body="Pick up to four. Skip if you're not sure — we'll use industry defaults."
          >
            <div className="grid gap-2.5">
              {leakCategories.map((c) => {
                const on = categories.includes(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggleCategory(c.id)}
                    className={`text-left rounded-[11px] border px-4 py-3 transition-colors ${
                      on
                        ? "border-brass bg-brass/10 text-bone"
                        : "border-hair-strong text-smoke hover:border-brass/60 hover:text-bone"
                    }`}
                  >
                    <div className="font-semibold text-[15px]">{c.label}</div>
                    <div className="font-mono text-[12px] text-smoke-dim mt-1">
                      {c.description}
                    </div>
                  </button>
                );
              })}
            </div>
            <NavRow
              onBack={() => setStep("value")}
              onNext={nextFromCategories}
              nextLabel="See my score"
            />
          </StepShell>
        )}

        {step === "score" && previewScore && (
          <StepShell
            title="Your Time-Leak Score"
            body="This is the headline only — the full category breakdown unlocks next."
          >
            <div className="rounded-[14px] border border-brass/40 bg-iron-deep px-5 py-6 mb-5">
              <p className="font-mono text-[12.5px] tracking-[0.14em] uppercase text-brass mb-3">
                Estimated reclaimable time
              </p>
              <p className="font-display font-bold text-[clamp(2rem,5vw,3rem)] leading-none tracking-[-0.03em]">
                {previewScore.hoursLow}–{previewScore.hoursHigh}{" "}
                <span className="text-[0.45em] text-smoke font-semibold tracking-normal">
                  hrs/week
                </span>
              </p>
              <p className="text-brass-bright text-[clamp(1.2rem,2.4vw,1.6rem)] font-semibold mt-4">
                ≈ {formatCad(previewScore.monthlyLow)}–
                {formatCad(previewScore.monthlyHigh)}
                <span className="text-smoke font-normal text-[0.7em]">
                  {" "}
                  / month
                </span>
              </p>
              <p className="text-smoke text-[15px] mt-5 max-w-[48ch]">
                {previewScore.summaryLine}
              </p>
              <p className="text-ember text-[14.5px] mt-3 max-w-[48ch]">
                {previewScore.deprivationLine}
              </p>
            </div>
            <NavRow
              onBack={() => setStep("categories")}
              onNext={() => setStep("gate")}
              nextLabel="Unlock full breakdown"
            />
          </StepShell>
        )}

        {step === "gate" && previewScore && (
          <StepShell
            title="Where should we send the full breakdown?"
            body="Per-category leaks + a shortlist of what usually fixes them. No spam — a short follow-up sequence, then silence unless you reply."
          >
            <form action={action} className="space-y-4">
              <input type="hidden" name="industry" value={industry} />
              <input type="hidden" name="teamSize" value={teamSize} />
              <input type="hidden" name="adminHours" value={adminHours} />
              <input type="hidden" name="hourlyValue" value={hourlyValue} />
              <input
                type="hidden"
                name="categories"
                value={categories.join(",")}
              />
              <input type="hidden" name="variant" value={variant} />
              <input
                type="hidden"
                name="utmSource"
                value={attr.utmSource ?? ""}
              />
              <input
                type="hidden"
                name="utmMedium"
                value={attr.utmMedium ?? ""}
              />
              <input
                type="hidden"
                name="utmCampaign"
                value={attr.utmCampaign ?? ""}
              />
              <input
                type="hidden"
                name="referrer"
                value={attr.referrer ?? ""}
              />

              <div>
                <label className={labelClass} htmlFor="email">
                  Work email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  className={fieldClass}
                />
              </div>

              {state.msg && !state.ok && (
                <p className="font-mono text-[13px] text-ember">{state.msg}</p>
              )}

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep("score")}
                  className="inline-flex items-center justify-center font-semibold text-[15px] px-5 py-3 rounded-[11px] border border-hair-strong text-bone hover:border-brass hover:text-brass transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={pending}
                  className="inline-flex items-center justify-center gap-2 font-semibold text-[15px] px-6 py-3 rounded-[11px] bg-brass text-[#1a140a] hover:bg-brass-bright transition-all disabled:opacity-60"
                >
                  {pending ? "Unlocking…" : "Email me the breakdown"}
                </button>
              </div>

              <p className="font-mono text-[11.5px] text-smoke-dim leading-relaxed">
                By continuing you agree we may email your results and a short
                sequence about the {site.assessmentActivePrice}{" "}
                {site.currency} AI Tools Assessment. Reply stop to opt out.
              </p>
            </form>
          </StepShell>
        )}
      </div>
    </div>
  );
}

function StepShell({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h2 className="font-display font-bold text-[clamp(1.45rem,3vw,1.9rem)] tracking-[-0.02em] leading-[1.15] mb-2">
        {title}
      </h2>
      <p className="text-smoke text-[15px] max-w-[48ch] mb-6">{body}</p>
      {children}
    </div>
  );
}

function NavRow({
  onBack,
  onNext,
  nextDisabled,
  nextLabel = "Continue",
}: {
  onBack?: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
}) {
  return (
    <div className="flex flex-wrap gap-3 mt-7">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center justify-center font-semibold text-[15px] px-5 py-3 rounded-[11px] border border-hair-strong text-bone hover:border-brass hover:text-brass transition-all"
        >
          Back
        </button>
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className="inline-flex items-center justify-center font-semibold text-[15px] px-6 py-3 rounded-[11px] bg-brass text-[#1a140a] hover:bg-brass-bright transition-all disabled:opacity-50 disabled:pointer-events-none"
      >
        {nextLabel}
      </button>
      <Link
        href="/sample-report"
        className="inline-flex items-center text-[14px] text-smoke hover:text-brass transition-colors ml-auto"
      >
        Prefer a sample report? ↗
      </Link>
    </div>
  );
}
