"use client";

import { track } from "@vercel/analytics";

export type FunnelProps = Record<string, string | number | boolean | undefined>;

function clean(props?: FunnelProps) {
  if (!props) return undefined;
  const out: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(props)) {
    if (v !== undefined) out[k] = v;
  }
  return Object.keys(out).length ? out : undefined;
}

/** Client-side funnel events (Vercel Analytics). */
export function trackFunnel(event: string, props?: FunnelProps) {
  try {
    track(event, clean(props));
  } catch {
    // Analytics must never break UX.
  }
}

export const funnelEvents = {
  quizStarted: "quiz_started",
  quizStep: "quiz_step",
  quizCompleted: "quiz_completed",
  quizEmailGateShown: "quiz_email_gate_shown",
  quizEmailCaptured: "quiz_email_captured",
  quizResultsViewed: "quiz_results_viewed",
  quizBookClicked: "quiz_book_assessment_clicked",
  quizSampleClicked: "quiz_sample_report_clicked",
  assessmentFormSubmitted: "assessment_form_submitted",
  assessmentPayEligible: "assessment_pay_eligible",
  assessmentPayClicked: "assessment_pay_clicked",
  bookingDiscoveryClicked: "booking_discovery_clicked",
} as const;

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "v",
] as const;

export type Attribution = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  quizVariant?: string;
  referrer?: string;
};

const STORAGE_KEY = "cfl_attribution";

export function captureAttributionFromUrl(search: string, referrer?: string) {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(search);
  const existing = readAttribution();
  const next: Attribution = { ...existing };
  for (const key of UTM_KEYS) {
    const val = params.get(key);
    if (!val) continue;
    if (key === "utm_source") next.utmSource = val;
    if (key === "utm_medium") next.utmMedium = val;
    if (key === "utm_campaign") next.utmCampaign = val;
    if (key === "utm_content") next.utmContent = val;
    if (key === "utm_term") next.utmTerm = val;
    if (key === "v") next.quizVariant = val;
  }
  if (referrer && !next.referrer) next.referrer = referrer;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}

export function readAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Attribution;
  } catch {
    return {};
  }
}
