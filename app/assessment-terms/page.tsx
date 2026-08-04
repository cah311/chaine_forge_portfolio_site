import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Assessment Engagement Terms",
  description:
    "AI Tools Assessment terms: 5 reclaimable hours guarantee, refund mechanics, 90-day build credit, and discovery call recording consent.",
  alternates: { canonical: "/assessment-terms" },
  openGraph: {
    title: `Assessment Engagement Terms — ${site.name}`,
    description:
      "AI Tools Assessment terms: 5 reclaimable hours guarantee, refund mechanics, 90-day build credit, and discovery call recording consent.",
    url: "/assessment-terms",
  },
  twitter: {
    card: "summary_large_image",
    title: `Assessment Engagement Terms — ${site.name}`,
    description:
      "AI Tools Assessment terms: 5 reclaimable hours guarantee, refund mechanics, and 90-day build credit.",
  },
};

const sections = [
  {
    title: "What you're buying",
    body: (
      <>
        A fixed-fee diagnostic — <strong>{site.assessmentActivePrice} {site.currency}</strong>
        {site.assessmentOfferTier !== "standing" ? (
          <>
            {" "}
            ({site.assessmentTierLabel}; standing rate {site.assessmentPrice})
          </>
        ) : null}{" "}
        — delivered in four steps: a 45-minute recorded discovery call, an
        analysis of that conversation, a written report mapping your biggest
        time-drains to specific tools (with cost, setup time, and hours saved
        for each), and a 30-minute review call to walk through it. You receive
        the report and a 4-day quick-start plan regardless of whether you ever
        work with us again.
      </>
    ),
  },
  {
    title: "The guarantee, in plain terms",
    body: (
      <>
        <strong>
          We will identify at least 5 reclaimable hours per week in your
          business, or your {site.assessmentActivePrice} is refunded in full.
        </strong>
        <br />
        <br />
        &quot;Reclaimable hours&quot; means time we <strong>identify</strong> as
        recoverable through the tools and changes recommended in your report —
        quantified line by line, with the method shown. It does not mean hours
        already banked: implementation is your decision (or a separate
        engagement), and results depend on you or your team actually adopting
        the recommendations. We underwrite the diagnosis. You own the execution
        — unless you hire us for it.
      </>
    ),
  },
  {
    title: "How a refund works",
    body: (
      <>
        If your report identifies fewer than 5 reclaimable hours per week, you
        don&apos;t need to ask — we&apos;ll tell you, and refund the full{" "}
        {site.assessmentActivePrice} within 10 business days. If you believe the
        identified hours don&apos;t hold up, email us within 14 days of the
        review call with the line items you dispute. We&apos;ll either show our
        math or refund you. No forms, no friction, no partial credits.
      </>
    ),
  },
  {
    title: "The credit",
    body: (
      <>
        Your {site.assessmentActivePrice} is credited in full toward any
        implementation engagement booked within <strong>90 days</strong> of your
        review call. Our build prices are fixed and published — the price is the
        same number whether or not an assessment preceded it. The credit is a
        real reduction, not a markup handed back.
      </>
    ),
  },
  {
    title: "Recording and your data",
    body: (
      <>
        The discovery call is recorded and transcribed so nothing you tell us is
        lost or misremembered. By paying and booking, you consent to the
        recording. The transcript is analyzed with AI tooling under our control,
        is never used to train third-party models, is shared with no one outside{" "}
        {site.name}, and is deleted on request once your engagement closes. Your
        report is confidential and yours.
      </>
    ),
  },
  {
    title: "Who this is for",
    body: (
      <>
        The guarantee assumes there&apos;s something to find: businesses of
        roughly 2–20 people with real, identifiable manual workflows. If your
        discovery call reveals we&apos;re not confident we can clear the 5-hour
        bar, we&apos;ll say so on the call and cancel the engagement at no
        charge — we&apos;d rather decline than dilute the guarantee.
      </>
    ),
  },
  {
    title: "What this isn't",
    body: (
      <>
        Tool recommendations are our independent professional judgment — we
        accept no referral fees or commissions from any vendor we recommend.
        This assessment is operational advice, not legal, accounting, or
        investment advice.
      </>
    ),
  },
];

export default function AssessmentTermsPage() {
  return (
    <>
      <Nav />
      <main className="pt-[140px] pb-[84px]">
        <div className="max-w-wrap mx-auto px-7 relative z-[2]">
          <Reveal>
            <Link
              href="/#assessment"
              className="font-mono text-xs text-smoke hover:text-brass transition-colors mb-8 inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
            >
              ← Back to assessment
            </Link>
          </Reveal>

          <Reveal>
            <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-brass mb-3.5 inline-block">
              Engagement terms
            </span>
          </Reveal>

          <Reveal>
            <h1 className="font-display font-bold text-[clamp(2rem,4.2vw,3.2rem)] tracking-[-0.025em] leading-[1.02] mb-4 max-w-[22ch]">
              AI Tools Assessment
            </h1>
          </Reveal>

          <Reveal>
            <p className="font-mono text-[12.5px] text-smoke-dim mb-8">
              One page. Plain language. The same terms for every client.
            </p>
          </Reveal>

          <Reveal>
            <p className="text-smoke text-[clamp(1.05rem,1.7vw,1.25rem)] max-w-[52ch] mb-12">
              We write our terms the way we write our quotes: fixed, plain, and
              underwritten before you pay. Here is exactly what you are buying,
              what we guarantee, and how the guarantee works.
            </p>
          </Reveal>

          <div className="grid gap-10 max-w-[720px]">
            {sections.map((section) => (
              <Reveal key={section.title}>
                <section>
                  <h2 className="font-display font-bold text-xl mb-3 text-brass">
                    {section.title}
                  </h2>
                  <p className="text-smoke text-[15px] leading-relaxed [&_strong]:text-bone [&_strong]:font-semibold">
                    {section.body}
                  </p>
                </section>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="font-mono text-xs text-smoke-dim mt-14 max-w-[52ch] leading-relaxed">
              By paying for an assessment, you acknowledge these terms.{" "}
              {site.name} ·{" "}
              <a
                href={`mailto:${site.contactEmail}`}
                className="text-smoke hover:text-brass transition-colors underline underline-offset-2"
              >
                {site.contactEmail}
              </a>
            </p>
          </Reveal>

          <Reveal>
            <Link
              href="/#assessment"
              className="inline-flex items-center gap-[9px] font-semibold text-[15px] px-6 py-3.5 rounded-[11px] bg-brass text-[#1a140a] hover:bg-brass-bright hover:-translate-y-0.5 transition-all mt-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
            >
              Book your assessment ↗
            </Link>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
