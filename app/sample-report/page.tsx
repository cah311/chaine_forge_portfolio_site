import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { SampleReportFrame } from "@/components/sample-report-frame";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sample AI Tools Assessment",
  description: `A complete sample assessment, start to finish — fictional landscaping company, real process. See exactly what ${site.assessmentActivePrice} ${site.currency} buys before you book.`,
  alternates: { canonical: "/sample-report" },
  openGraph: {
    title: `Sample AI Tools Assessment — ${site.name}`,
    description: `A complete sample assessment, start to finish. Fictional client, real process. See exactly what ${site.assessmentActivePrice} ${site.currency} buys.`,
    url: "/sample-report",
  },
  twitter: {
    card: "summary_large_image",
    title: `Sample AI Tools Assessment — ${site.name}`,
    description: `A complete sample assessment — fictional client, real process. ${site.assessmentActivePrice} ${site.currency}.`,
  },
};

const noticeItems = [
  {
    n: "01",
    title: "Every number says where it came from.",
    body: (
      <>
        <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-brass">
          STATED
        </span>{" "}
        means the owner said it on the call.{" "}
        <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-brass">
          INFERRED
        </span>{" "}
        means we estimated it, with the arithmetic shown. No figure appears
        without a source. If you can&apos;t audit the math, you can&apos;t trust
        the ROI.
      </>
    ),
  },
  {
    n: "02",
    title: "Section 05 is the one to read.",
    body: "Anyone can list tools. That section lists the four we refused to recommend — including the $230/month platform that's the industry-standard answer for this business — with the reason for each and the exact trigger that would reverse it. That's the judgment you're buying.",
  },
  {
    n: "03",
    title: "Three of six recommendations cost nothing.",
    body: "One was a feature already sitting switched off inside software the client pays for. We take no commission from any tool we name, which is why the cheapest answer wins whenever it's the right one.",
  },
];

export default function SampleReportPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="pt-[140px] pb-16 max-[900px]:pt-[120px] max-[900px]:pb-12">
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
              <span className="font-mono text-[12.5px] tracking-[0.22em] uppercase text-brass inline-flex items-center gap-2.5 before:content-[''] before:w-[22px] before:h-px before:bg-brass before:inline-block">
                A complete sample assessment
              </span>
            </Reveal>

            <Reveal>
              <h1 className="font-display font-bold text-[clamp(2rem,4.2vw,3.2rem)] tracking-[-0.025em] leading-[1.02] mt-[18px] mb-6 max-w-[18ch]">
                This is the entire deliverable. Nothing held back.
              </h1>
            </Reveal>

            <Reveal>
              <div className="text-smoke text-[clamp(1.05rem,1.7vw,1.25rem)] max-w-[58ch] space-y-5">
                <p>
                  Most firms show you a redacted page and ask you to imagine the
                  rest. Here&apos;s a full assessment, start to finish, produced
                  by our real process from a mock discovery call with a fictional
                  eight-person landscaping company.
                </p>
                <p>
                  <b className="text-bone font-semibold">
                    It&apos;s a landscaper. You&apos;re probably not.
                  </b>{" "}
                  The tools in it almost certainly aren&apos;t your tools —
                  that&apos;s the point. What transfers is the method: how the
                  time gets found, how the numbers get sourced, and what gets
                  ruled out.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="grid grid-cols-1 min-[901px]:grid-cols-3 gap-px bg-hair border border-hair rounded-[14px] overflow-hidden mt-12 mb-14">
                {noticeItems.map((item) => (
                  <div
                    key={item.n}
                    className="bg-iron p-7 min-[901px]:px-7 min-[901px]:py-8"
                  >
                    <div className="font-mono text-xs text-brass mb-3">
                      {item.n}
                    </div>
                    <h2 className="font-display font-bold text-[1.15rem] mb-2.5 leading-snug">
                      {item.title}
                    </h2>
                    <p className="text-smoke text-[14.5px] leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="pb-16 max-[900px]:pb-12">
          <div className="max-w-[820px] mx-auto px-7 relative z-[2]">
            <SampleReportFrame />
          </div>
        </section>

        <section className="py-[100px] max-[900px]:py-[72px] bg-iron-deep border-t border-hair">
          <div className="max-w-wrap mx-auto px-7 relative z-[2]">
            <div className="max-w-[52ch]">
              <Reveal>
                <h2 className="font-display font-bold text-[clamp(1.8rem,3.6vw,2.6rem)] tracking-[-0.025em] leading-[1.05] mb-5">
                  Yours would look like this. About your business.
                </h2>
              </Reveal>
              <Reveal>
                <div className="text-smoke text-[clamp(1.05rem,1.7vw,1.2rem)] space-y-5 mb-8">
                  <p>
                    Same structure, same guarantee, your workflows. A 45-minute
                    recorded call, two weeks, then a 30-minute review call where
                    we walk it through together.
                  </p>
                  <p>
                    <b className="text-bone font-semibold">
                      {site.assessmentActivePrice} {site.currency}, credited in full
                      against any build you commission within 90 days
                    </b>{" "}
                    — so if we end up doing the work, the assessment cost you
                    nothing.
                  </p>
                  <p>
                    <b className="text-bone font-semibold">
                      If we can&apos;t find at least 5 reclaimable hours a week,
                      you get the full {site.assessmentActivePrice} back.
                    </b>{" "}
                    In this sample we found seven. The average lands between five
                    and ten.
                  </p>
                </div>
              </Reveal>
              <Reveal>
                <div className="flex flex-wrap gap-3 mb-8">
                  <Link
                    href="/#assessment"
                    className="inline-flex items-center gap-[9px] font-semibold text-[15px] px-6 py-3.5 rounded-[11px] bg-brass text-[#1a140a] hover:bg-brass-bright hover:-translate-y-0.5 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
                  >
                    Book your assessment ↗
                  </Link>
                  <Link
                    href="/#paths"
                    className="inline-flex items-center gap-[9px] font-semibold text-[15px] px-6 py-3.5 rounded-[11px] border border-hair-strong text-bone hover:border-brass hover:text-brass transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
                  >
                    See what implementation costs
                  </Link>
                </div>
              </Reveal>
              <Reveal>
                <p className="font-mono text-[12.5px] text-smoke-dim max-w-[46ch] leading-relaxed">
                  We take a limited number of assessments each month so every
                  report is built by hand. {site.availability}.
                </p>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
