const defaultUrl = "https://chainforgelabs.io";

/**
 * Assessment offer ladder (Founding Five → Next Five → standing):
 * $500 (root 5) → $800 (root 8) → $1,500 (root 6).
 * Flip via NEXT_PUBLIC_ASSESSMENT_TIER=founding|second|standing when a batch sells out.
 */
export type AssessmentOfferTier = "founding" | "second" | "standing";

function resolveAssessmentTier(
  raw: string | undefined,
): AssessmentOfferTier {
  if (raw === "second" || raw === "standing" || raw === "founding") return raw;
  return "founding";
}

const assessmentOfferTier = resolveAssessmentTier(
  process.env.NEXT_PUBLIC_ASSESSMENT_TIER,
);

const assessmentPrices = {
  founding: "$500",
  second: "$800",
  standing: "$1,500",
} as const;

const assessmentPriceAmounts = {
  founding: "500.00",
  second: "800.00",
  standing: "1500.00",
} as const;

const assessmentTierLabels = {
  founding: "Founding Five",
  second: "Next Five",
  standing: "Standing rate",
} as const;

export const site = {
  name: "Chain Forge Labs",
  tagline: "Find where AI saves your business time — then build the rest",
  description:
    "A fixed-fee AI Tools Assessment maps your biggest time-drains to the right tools — with a 5-hours-a-week guarantee. Then we build what off-the-shelf can't. Credited in full if you build with us.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? defaultUrl,
  contactEmail: process.env.CONTACT_EMAIL ?? "hello@chainforgelabs.io",
  availability:
    process.env.AVAILABILITY ??
    (assessmentOfferTier === "founding"
      ? "Founding Five · five slots at $500"
      : assessmentOfferTier === "second"
        ? "Next Five · five slots at $800"
        : "8 assessment slots / month · hand-built reports"),
  githubOrg: process.env.GITHUB_ORG ?? "",
  resendFrom:
    process.env.RESEND_FROM ?? "Chain Forge <quotes@chainforgelabs.io>",
  /** Standing rate after founding batches — root 6. */
  assessmentPrice: "$1,500",
  assessmentFoundingPrice: "$500",
  assessmentSecondBatchPrice: "$800",
  assessmentOfferTier,
  assessmentTierLabel: assessmentTierLabels[assessmentOfferTier],
  /** Price currently charged on the public CTA. */
  assessmentActivePrice: assessmentPrices[assessmentOfferTier],
  assessmentActivePriceAmount: assessmentPriceAmounts[assessmentOfferTier],
  currency: "CAD",
  /**
   * Stripe Payment Link for the active assessment tier.
   * While Founding Five is live, point NEXT_PUBLIC_STRIPE_ASSESSMENT_URL at the $500 link.
   */
  stripeAssessmentUrl:
    process.env.NEXT_PUBLIC_STRIPE_ASSESSMENT_URL ??
    "https://buy.stripe.com/bJe6oIddy8VUeOx2Hobo400",
  /** Calendly — 45-min discovery (send after payment). */
  bookingDiscoveryUrl:
    process.env.NEXT_PUBLIC_BOOKING_DISCOVERY_URL ??
    "https://calendly.com/hello-chainforgelabs/discovery",
  /** Calendly — 30-min review (send after the report is ready). */
  bookingReviewUrl:
    process.env.NEXT_PUBLIC_BOOKING_REVIEW_URL ??
    "https://calendly.com/hello-chainforgelabs/review",
} as const;

export const navLinks = [
  { href: "/#assessment", label: "Assessment" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#paths", label: "Paths" },
  { href: "/#work", label: "Work" },
];

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path: string): string {
  const base = site.url.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
