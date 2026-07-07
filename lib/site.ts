const defaultUrl = "https://chainforgelabs.io";

export const site = {
  name: "Chain Forge Labs",
  tagline: "Working software in weeks",
  description:
    "An AI-native product studio. We design, build, and ship full-stack web apps, fintech tools, and on-chain platforms — fixed price, fixed scope, you own everything.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? defaultUrl,
  contactEmail: process.env.CONTACT_EMAIL ?? "hello@chainforgelabs.io",
  availability:
    process.env.AVAILABILITY ??
    "2 build slots · 1 of 2 founding seats open",
  githubOrg: process.env.GITHUB_ORG ?? "",
  resendFrom:
    process.env.RESEND_FROM ?? "Chain Forge <quotes@chainforgelabs.io>",
} as const;

export const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
];

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path: string): string {
  const base = site.url.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
