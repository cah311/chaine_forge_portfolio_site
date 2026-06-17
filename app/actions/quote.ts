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
    return { ok: false, msg: "Tell us what you're building first." };
  if (!/^[^@]+@[^@]+\.[^@]+$/.test(email))
    return { ok: false, msg: "Add a valid email so we can reply." };

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: site.resendFrom,
      to: site.contactEmail,
      replyTo: email,
      subject: `New project — ${fd.get("sku")}`,
      text: `What: ${build}
Offer: ${fd.get("sku")}
Budget: ${fd.get("budget")}
Timeline: ${fd.get("timeline")}
Links: ${fd.get("links")}
Email: ${email}`,
    });
    return { ok: true, msg: "Got it — we'll reply within 48 hours." };
  } catch {
    return {
      ok: false,
      msg: `Something broke — email ${site.contactEmail} directly.`,
    };
  }
}
