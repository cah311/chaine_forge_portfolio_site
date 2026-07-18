"use server";

import { Resend } from "resend";
import { site } from "@/lib/site";

export type QuoteState = { ok: boolean; msg: string };

export async function submitQuote(
  _prev: QuoteState,
  fd: FormData,
): Promise<QuoteState> {
  const build = String(fd.get("build") ?? "").trim();
  const email = String(fd.get("email") ?? "").trim();
  if (!build)
    return { ok: false, msg: "Tell us where time disappears first." };
  if (!/^[^@]+@[^@]+\.[^@]+$/.test(email))
    return { ok: false, msg: "Add a valid email so we can reply." };

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: site.resendFrom,
      to: site.contactEmail,
      replyTo: email,
      subject: `Assessment request — ${fd.get("sku")}`,
      text: `Time drains: ${build}
Interest: ${fd.get("sku")}
Team size: ${fd.get("budget")}
Timeline: ${fd.get("timeline")}
Links: ${fd.get("links")}
Email: ${email}`,
    });
    return {
      ok: true,
      msg: "Request received. Pay below to lock your assessment slot.",
    };
  } catch {
    return {
      ok: false,
      msg: `Something broke — email ${site.contactEmail} directly.`,
    };
  }
}
