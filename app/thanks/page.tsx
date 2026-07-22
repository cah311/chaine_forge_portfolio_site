import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { BookingCtas } from "@/components/booking-ctas";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Payment received",
  description:
    "Thanks for booking your AI Tools Assessment. Schedule your 45-minute discovery call next.",
  alternates: { canonical: "/thanks" },
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <>
      <Nav />
      <main className="pt-[140px] pb-[84px]">
        <div className="max-w-wrap mx-auto px-7 relative z-[2] max-w-[640px]">
          <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-brass mb-3.5 inline-block">
            You&apos;re in
          </span>
          <h1 className="font-display font-bold text-[clamp(2rem,4.2vw,3.2rem)] tracking-[-0.025em] leading-[1.02] mb-5">
            Payment received.
            <br />
            Book discovery next.
          </h1>
          <p className="text-smoke text-[clamp(1.05rem,1.7vw,1.25rem)] max-w-[46ch] mb-8">
            Thanks for confirming your AI Tools Assessment ({site.assessmentPrice}{" "}
            {site.currency}). Grab a 45-minute discovery slot — we&apos;ll record
            the call (per the{" "}
            <Link
              href="/assessment-terms"
              className="text-brass hover:text-brass-bright underline underline-offset-2"
            >
              engagement terms
            </Link>
            ) and turn it into your report.
          </p>
          <BookingCtas variant="thanks" />
          <p className="font-mono text-xs text-smoke-dim mt-10 leading-relaxed">
            After the report is ready, we&apos;ll send the 30-minute review link.
            Questions?{" "}
            <a
              href={`mailto:${site.contactEmail}`}
              className="text-smoke hover:text-brass underline underline-offset-2 transition-colors"
            >
              {site.contactEmail}
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
