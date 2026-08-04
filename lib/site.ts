const defaultUrl = "https://chainforgelabs.io";

export const site = {
  name: "Chain Forge Labs",
  tagline: "Find where AI saves your business time — then build the rest",
  description:
    "Free Time-Leak Score in 3 minutes, then a fixed-fee AI Tools Assessment that maps your biggest time-drains to the right tools — with a 5-hours-a-week guarantee. Credited in full if you build with us.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? defaultUrl,
  contactEmail: process.env.CONTACT_EMAIL ?? "hello@chainforgelabs.io",
  availability:
    process.env.AVAILABILITY ??
    "8 assessment slots / month · hand-built reports",
  githubOrg: process.env.GITHUB_ORG ?? "",
  resendFrom:
    process.env.RESEND_FROM ?? "Chain Forge <quotes@chainforgelabs.io>",
  /** Public assessment price — root 6. Founding Five ($500) is campaign-only, not site pricing. */
  assessmentPrice: "$1,500",
  assessmentPriceAmount: "1500.00",
  currency: "CAD",
  /** Live Stripe Payment Link for the AI Tools Assessment ($1,500 CAD). */
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
  { href: "/time-leak", label: "Free score" },
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
