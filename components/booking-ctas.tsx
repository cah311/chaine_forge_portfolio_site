"use client";

import { track } from "@vercel/analytics";
import { site } from "@/lib/site";

type BookingCtasProps = {
  /** thanks = primary discovery CTA; pay = secondary after Stripe button */
  variant: "thanks" | "pay";
};

export function BookingCtas({ variant }: BookingCtasProps) {
  if (variant === "thanks") {
    return (
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a
          href={site.bookingDiscoveryUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("booking_discovery_clicked", { from: "thanks" })}
          className="inline-flex items-center justify-center gap-[9px] font-semibold text-[15px] px-6 py-3.5 rounded-[11px] bg-brass text-[#1a140a] hover:bg-brass-bright hover:-translate-y-0.5 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2 group"
        >
          Book 45-min discovery
          <span className="transition-transform group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
            ↗
          </span>
        </a>
        <a
          href={`mailto:${site.contactEmail}`}
          className="inline-flex items-center justify-center gap-[9px] font-semibold text-[15px] px-6 py-3.5 rounded-[11px] border border-hair-strong text-bone hover:border-brass hover:text-brass transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
        >
          Email us instead
        </a>
      </div>
    );
  }

  return (
    <p className="font-mono text-xs text-smoke-dim leading-relaxed">
      After you pay,{" "}
      <a
        href={site.bookingDiscoveryUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("booking_discovery_clicked", { from: "pay_panel" })}
        className="text-brass hover:text-brass-bright underline underline-offset-2"
      >
        book your 45-min discovery
      </a>{" "}
      (or use the link on the thank-you page). Review is scheduled after your
      report is ready.
    </p>
  );
}
