const defaultUrl = "https://chainforgelabs.io";

export const site = {
  name: "Chain Forge Labs",
  tagline: "Find where AI saves your business time — then build the rest",
  description:
    "A fixed-fee AI Tools Assessment maps your biggest time-drains to the right tools — with a 5-hours-a-week guarantee. Then we build what off-the-shelf can't. Credited in full if you build with us.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? defaultUrl,
  contactEmail: process.env.CONTACT_EMAIL ?? "hello@chainforgelabs.io",
  availability:
    process.env.AVAILABILITY ??
    "Limited assessments each month · hand-built reports",
  githubOrg: process.env.GITHUB_ORG ?? "",
  resendFrom:
    process.env.RESEND_FROM ?? "Chain Forge <quotes@chainforgelabs.io>",
  assessmentPrice: "$1,500",
  currency: "CAD",
  /** Live Stripe Payment Link for the AI Tools Assessment ($1,500 CAD). */
  stripeAssessmentUrl:
    process.env.NEXT_PUBLIC_STRIPE_ASSESSMENT_URL ??
    "https://buy.stripe.com/bJe6oIddy8VUeOx2Hobo400",
} as const;

export const navLinks = [
  { href: "/#assessment", label: "Assessment" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#build", label: "Build" },
  { href: "/#concierge", label: "AI Concierge" },
  { href: "/#work", label: "Work" },
];

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path: string): string {
  const base = site.url.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
