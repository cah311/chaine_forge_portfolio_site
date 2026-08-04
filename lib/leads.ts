import { promises as fs } from "fs";
import path from "path";
import { Resend } from "resend";
import { site } from "@/lib/site";
import type { QualificationOutcome } from "@/lib/qualification";
import type { QuizNameVariant } from "@/lib/quiz/names";

export type LeadSource = "quiz" | "assessment_form";

export type LeadRecord = {
  id: string;
  email: string;
  source: LeadSource;
  outcome: QualificationOutcome | "unknown";
  industry?: string;
  teamSize?: string;
  quizVariant?: QuizNameVariant;
  monthlyCostMid?: number;
  hoursLow?: number;
  hoursHigh?: number;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
  createdAt: string;
  tags: string[];
};

function leadsDir() {
  if (process.env.LEADS_DIR) return process.env.LEADS_DIR;
  if (process.env.VERCEL) return "/tmp/chain-forge-leads";
  return path.join(process.cwd(), ".data");
}

function leadsPath() {
  return path.join(leadsDir(), "leads.jsonl");
}

function makeId() {
  return `lead_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

async function appendJsonl(record: LeadRecord) {
  try {
    await fs.mkdir(leadsDir(), { recursive: true });
    await fs.appendFile(leadsPath(), `${JSON.stringify(record)}\n`, "utf8");
  } catch {
    // Filesystem may be unavailable — Resend + owner email remain primary.
  }
}

async function upsertResendContact(record: LeadRecord) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const audienceId = process.env.RESEND_AUDIENCE_ID;
  const segmentId = process.env.RESEND_SEGMENT_ID;
  const resend = new Resend(apiKey);

  const properties: Record<string, string | number | null> = {
    source: record.source,
    outcome: record.outcome,
    industry: record.industry ?? null,
    team_size: record.teamSize ?? null,
    quiz_variant: record.quizVariant ?? null,
    monthly_cost_mid: record.monthlyCostMid ?? null,
    utm_source: record.utmSource ?? null,
    utm_medium: record.utmMedium ?? null,
    utm_campaign: record.utmCampaign ?? null,
  };

  try {
    if (audienceId) {
      await resend.contacts.create({
        audienceId,
        email: record.email,
        unsubscribed: false,
        properties,
      });
      return;
    }
    await resend.contacts.create({
      email: record.email,
      unsubscribed: false,
      properties,
      ...(segmentId ? { segments: [{ id: segmentId }] } : {}),
    });
  } catch {
    // Contact create can 409 on duplicates — ignore.
  }
}

async function notifyOwner(record: LeadRecord, extra?: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const resend = new Resend(apiKey);
  const tag = record.tags[0] ?? record.source.toUpperCase();
  try {
    await resend.emails.send({
      from: site.resendFrom,
      to: site.contactEmail,
      replyTo: record.email,
      subject: `[${tag}] Lead — ${record.email}`,
      text: `New lead captured

ID: ${record.id}
Email: ${record.email}
Source: ${record.source}
Outcome: ${record.outcome}
Industry: ${record.industry ?? "—"}
Team size: ${record.teamSize ?? "—"}
Quiz variant: ${record.quizVariant ?? "—"}
Hours: ${record.hoursLow ?? "—"}–${record.hoursHigh ?? "—"} /wk
Monthly mid: ${record.monthlyCostMid ?? "—"}
UTM: ${record.utmSource ?? "—"} / ${record.utmMedium ?? "—"} / ${record.utmCampaign ?? "—"}
Referrer: ${record.referrer ?? "—"}
Created: ${record.createdAt}

${extra ?? ""}`,
    });
  } catch {
    // Owner notify failure shouldn't block lead flow.
  }
}

export async function persistLead(
  input: Omit<LeadRecord, "id" | "createdAt" | "tags"> & {
    tags?: string[];
    notifyExtra?: string;
    notifyOwnerEmail?: boolean;
  },
): Promise<LeadRecord> {
  const record: LeadRecord = {
    id: makeId(),
    createdAt: new Date().toISOString(),
    tags: input.tags ?? [input.source.toUpperCase()],
    email: input.email.trim().toLowerCase(),
    source: input.source,
    outcome: input.outcome,
    industry: input.industry,
    teamSize: input.teamSize,
    quizVariant: input.quizVariant,
    monthlyCostMid: input.monthlyCostMid,
    hoursLow: input.hoursLow,
    hoursHigh: input.hoursHigh,
    utmSource: input.utmSource,
    utmMedium: input.utmMedium,
    utmCampaign: input.utmCampaign,
    referrer: input.referrer,
  };

  await appendJsonl(record);
  await upsertResendContact(record);
  if (input.notifyOwnerEmail !== false) {
    await notifyOwner(record, input.notifyExtra);
  }

  return record;
}

export async function readRecentLeads(limit = 50): Promise<LeadRecord[]> {
  try {
    const raw = await fs.readFile(leadsPath(), "utf8");
    const lines = raw.trim().split("\n").filter(Boolean);
    return lines
      .slice(-limit)
      .map((line) => JSON.parse(line) as LeadRecord)
      .reverse();
  } catch {
    return [];
  }
}
