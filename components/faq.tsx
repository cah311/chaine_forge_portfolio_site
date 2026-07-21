"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";

const items: { q: string; a: ReactNode }[] = [
  {
    q: "What exactly do I get for $1,500?",
    a: (
      <>
        A 45-minute recorded discovery call, AI analysis of the transcript, a
        written report (executive summary, effort-vs-impact matrix, tool
        recommendations with cost/setup/time saved, a 4-day quick-start plan,
        ROI slide, and a major-projects quadrant), plus a 30-minute review call.
        Fully credited toward any implementation booked within 90 days.{" "}
        <Link
          href="/sample-report"
          className="text-brass hover:text-brass-bright underline underline-offset-2"
        >
          Read a complete sample report
        </Link>
        .
      </>
    ),
  },
  {
    q: "What's the 5-hours guarantee, precisely?",
    a: (
      <>
        We identify at least five reclaimable hours per week — opportunities that
        are real and actionable, not already implemented. If we can&apos;t, your
        $1,500 is refunded in full. Full definitions, refund mechanics, and
        recording consent are in the{" "}
        <Link
          href="/assessment-terms"
          className="text-brass hover:text-brass-bright underline underline-offset-2"
        >
          Assessment Engagement Terms
        </Link>
        , disclosed before you pay.
      </>
    ),
  },
  {
    q: "Who is this for?",
    a: "Small businesses with roughly 2–20 employees, identifiable manual workflows, and budget for a $1,500 assessment. Most verticals are fair game. Advice-, wealth-, and healthcare-practice-adjacent firms are a natural long-term fit — we hold those on a shortlist while we sequence capacity, then circle back. Not a hard no.",
  },
  {
    q: "Do you only recommend tools you sell?",
    a: "No. We recommend free and cheap off-the-shelf tools generously in the quick-wins quadrant. Build recommendations only appear when nothing on the shelf solves the problem — and because we can actually ship software, those recommendations are honest, not a bait-and-switch.",
  },
  {
    q: "What happens after the assessment?",
    a: "Three paths: run the quick wins yourself, book a fixed-price build from the major-projects quadrant (assessment fee credited), or move into the AI Concierge retainer for ongoing done-with-you skill building. No obligation on any of them.",
  },
  {
    q: "How does AI Concierge work?",
    a: "Two 45-minute Zoom working sessions per month building Claude skills with you, plus async access with a 12-business-hour SLA. Capped at 5–6 clients — real capacity, published openly. $1,800–$2,800 CAD/mo depending on scope.",
  },
  {
    q: "Who owns code if we build?",
    a: "You do, from the first commit. We build in a repo under your account. Final 50% on builds is due only when the product works as the written spec says.",
  },
  {
    q: "Who are you?",
    a: "A studio that ships under a brand, not a face. Capital-markets discipline on scope and risk; AI-native delivery on speed. Judge the work — every product in the portfolio is live.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-[120px] max-[900px]:py-[84px]" id="faq">
      <div className="max-w-wrap mx-auto px-7 relative z-[2]">
        <div className="text-center mb-[50px]">
          <Reveal>
            <span className="font-mono text-[12.5px] tracking-[0.22em] uppercase text-brass inline-flex items-center gap-2.5 before:content-[''] before:w-[22px] before:h-px before:bg-brass before:inline-block">
              Questions
            </span>
          </Reveal>
          <Reveal>
            <h2
              className="font-display font-bold text-[clamp(2rem,4.2vw,3.2rem)] tracking-[-0.025em] leading-[1.02] mt-[18px]"
            >
              The honest FAQ.
            </h2>
          </Reveal>
        </div>
        <Reveal>
          <div className="max-w-[820px] mx-auto">
            {items.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={item.q} className="border-b border-hair">
                  <button
                    type="button"
                    className="w-full text-left bg-transparent border-none cursor-pointer text-bone font-display font-medium text-[1.2rem] py-[26px] pr-11 relative tracking-[-0.01em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                  >
                    {item.q}
                    <span
                      className={`absolute right-1.5 top-1/2 -translate-y-1/2 font-mono text-[22px] text-brass transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-[max-height] duration-400 ease-in-out"
                    style={{
                      maxHeight: isOpen ? "500px" : "0",
                    }}
                  >
                    <p className="text-smoke text-[15.5px] pr-[30px] pb-[26px]">
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
