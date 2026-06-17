export const site = {
  contactEmail: process.env.CONTACT_EMAIL ?? "hello@chainforgelabs.com",
  availability:
    process.env.AVAILABILITY ??
    "2 build slots · 1 of 2 founding seats open",
  githubOrg: process.env.GITHUB_ORG ?? "",
  resendFrom: process.env.RESEND_FROM ?? "Chain Forge <quotes@YOURDOMAIN>",
};

export const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
];
