/** Public offer ladder — digit roots drive the spine (mostly 8s). */

export type OfferDoor = "automate" | "build" | "maintain";

export type Offer = {
  name: string;
  price: string;
  priceNote: string;
  time: string;
  desc: string;
  guar: string | null;
  bestfor: string;
  feature: boolean;
  badge: string | null;
  door: OfferDoor;
};

export const offers: Offer[] = [
  {
    name: "Quick Automation",
    price: "$1,700",
    priceNote: " CAD",
    time: "Days, not weeks",
    desc: "A single workflow or integration that kills a recurring manual task — connected to the tools you already use.",
    guar: "Scoped and priced in writing before work starts.",
    bestfor: "↳ Best for: one painful process you want gone this month.",
    feature: false,
    badge: null,
    door: "automate",
  },
  {
    name: "Knowledge System",
    price: "$3,500",
    priceNote: " CAD",
    time: "1–2 weeks",
    desc: "Process redesign plus a custom GPT / knowledge base / SOP system your team actually uses — not another unused Notion wiki.",
    guar: null,
    bestfor: "↳ Best for: teams drowning in tribal knowledge and repeat questions.",
    feature: false,
    badge: null,
    door: "automate",
  },
  {
    name: "Custom Claude Skills",
    price: "$3,800",
    priceNote: " CAD",
    time: "1–3 weeks",
    desc: "A skill suite built with you — reusable AI workflows wired to your real processes, not generic prompts.",
    guar: "Done-with-you sessions so your team can extend what we leave behind.",
    bestfor: "↳ Best for: operators ready to productize how they work with AI.",
    feature: true,
    badge: "High leverage",
    door: "automate",
  },
  {
    name: "Directory Platform",
    price: "$5,500",
    priceNote: " CAD",
    time: "1–2 weeks",
    desc: "Your own discovery platform: interactive maps, geo search, structured listings, ratings and reviews, user lists, and an admin panel — on a live engine you can inspect today.",
    guar: "Built on a shipped product in our portfolio.",
    bestfor: "↳ Best for: niche communities, associations, local media — be the first directory in your niche.",
    feature: false,
    badge: null,
    door: "build",
  },
  {
    name: "MVP Sprint",
    price: "$9,800",
    priceNote: " CAD",
    time: "2–4 weeks",
    desc: "A real working product: auth, payments, database, your core workflow, admin basics. Deploy, domain, analytics, handover, and 30 days of Care.",
    guar: "The final 50% is only due when it ships working as the written spec says.",
    bestfor: "↳ Best for: operators who need v1 shipped, not a 6-month agency.",
    feature: true,
    badge: "Flagship build",
    door: "build",
  },
  {
    name: "Care Retainer",
    price: "$168 / $368 / $868",
    priceNote: " CAD/mo",
    time: "Ongoing · attaches to any shipped build",
    desc: "Hosting, monitoring, fixes, and small tweaks so what we ship stays healthy. Three tiers by how hands-on you need us — priced so the smoothing layer is an easy yes at handover.",
    guar: "Offered on every delivery email. Pause or cancel anytime.",
    bestfor: "↳ Best for: teams that want the build maintained without hiring.",
    feature: false,
    badge: "Retainer",
    door: "maintain",
  },
  {
    name: "Sprint Subscription",
    price: "$3,950",
    priceNote: " CAD/mo",
    time: "Ongoing · pause anytime",
    desc: "Rolling build capacity. Unlimited request queue, one active build at a time, most requests shipped in 2–4 business days. Pause anytime; unused days bank.",
    guar: null,
    bestfor: "↳ Best for: post-launch teams that need continuous shipping without hiring.",
    feature: false,
    badge: null,
    door: "maintain",
  },
  {
    name: "AI Concierge",
    price: "$1,800–$2,800",
    priceNote: " CAD/mo",
    time: "Ongoing · capped at 5–6 clients",
    desc: "Done-with-you retainer that turns AI from a dabble into a working system: two 45-minute Zoom builds a month, async access with a 12-business-hour SLA, a 90-day win defined upfront, and a living accomplishment hub.",
    guar: "Real capacity — we publish the cap.",
    bestfor: "↳ Best for: operators who want ongoing AI leverage after the assessment.",
    feature: true,
    badge: "Ongoing",
    door: "maintain",
  },
];

export const doors: {
  id: OfferDoor;
  label: string;
  headline: string;
  blurb: string;
}[] = [
  {
    id: "automate",
    label: "Automate",
    headline: "Kill the recurring work.",
    blurb:
      "Workflows, knowledge systems, and skill suites that remove manual drag — without ripping out the tools you already trust.",
  },
  {
    id: "build",
    label: "Build",
    headline: "Ship what doesn't exist yet.",
    blurb:
      "Fixed-price products with your repo from day one — niche directories and MVPs that work as the written spec says.",
  },
  {
    id: "maintain",
    label: "Maintain",
    headline: "Keep it healthy. Keep shipping.",
    blurb:
      "Retainers and rolling capacity so what we ship stays live — and the next request doesn't wait on a new hire.",
  },
];

export function offersForDoor(door: OfferDoor): Offer[] {
  return offers.filter((o) => o.door === door);
}
