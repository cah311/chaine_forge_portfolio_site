export type Project = {
  slug: string;
  repo: string;
  name: string;
  live: string;
  tag: string;
  lang: string;
  /** Screenshot in /public/work/<slug>.png. Falls back to a branded panel if absent. */
  preview: string;
  /** Extra screenshots for the case-study gallery. First entry should match `preview`. */
  gallery?: { src: string; label: string }[];
  blurb: string;
  caseStudy: {
    problem: string;
    approach: string;
    stack: string[];
    outcome: string;
  };
};

export const projects: Project[] = [
  {
    slug: "mosaic-finance",
    repo: "mosaic-finance",
    name: "Mosaic Finance",
    live: "https://mosaicfinance.ai",
    tag: "Fintech · Demo",
    lang: "TypeScript",
    preview: "/work/mosaic-finance.png",
    gallery: [
      { src: "/work/mosaic-finance.png", label: "Landing page" },
      { src: "/work/mosaic-finance-2.png", label: "Client dashboard" },
      { src: "/work/mosaic-finance-3.png", label: "Plan review" },
    ],
    blurb:
      "AI-powered financial planning — conversational fact-find, automated plan generation, full dashboard.",
    caseStudy: {
      problem:
        "Most Canadians never get a real financial plan; advice is gated behind asset minimums.",
      approach:
        "A conversational fact-find that feeds an automated, account-aware planning engine (RRSP/TFSA/FHSA/CPP) and renders a full client dashboard.",
      stack: ["Next.js", "TypeScript", "Postgres", "AI orchestration"],
      outcome:
        "A complete, demo-ready planning product built solo. Showcased as a build; not operated.",
    },
  },
  {
    slug: "snowlaunch",
    repo: "snowlaunch",
    name: "Snowlaunch",
    live: "https://snowlaunch.io",
    tag: "Web3 · Live",
    lang: "Solidity",
    preview: "/work/snowlaunch.png",
    blurb:
      "Token launchpad on Avalanche — bonding curves, on-chain trading, wallet integration.",
    caseStudy: {
      problem:
        "Launching a token on Avalanche meant stitching together contracts, a trading UI, and wallet plumbing.",
      approach:
        "A bonding-curve launchpad with security-reviewed contracts, an integrated trading interface, and one-click wallet flows.",
      stack: ["Solidity", "Foundry", "Next.js", "Avalanche/EVM"],
      outcome:
        "A full launchpad shipped end-to-end — proof we can ship security-reviewed, production on-chain systems solo.",
    },
  },
  {
    slug: "bestfoodapp",
    repo: "bestfoodapp",
    name: "BestFoodApp",
    live: "https://bestfoodapp.com",
    tag: "Consumer · Live",
    lang: "TypeScript",
    preview: "/work/bestfoodapp.png",
    blurb:
      "Map-based discovery platform — geo search, structured listings, ratings, reviews, user lists.",
    caseStudy: {
      problem:
        "Niche communities want a Beli-style discovery app but can't build maps, geo search, and a ratings system.",
      approach:
        "A reusable discovery engine: interactive maps, geo search, structured listings, a ratings/review system, and user lists with an admin panel.",
      stack: ["Next.js", "TypeScript", "Postgres", "Maps API"],
      outcome:
        "The proven engine behind the Directory Platform service and a hosted-SaaS candidate.",
    },
  },
  {
    slug: "platos-library",
    repo: "platos-library",
    name: "Plato's Library",
    live: "https://platoslibrary.com",
    tag: "Content · Live",
    lang: "TypeScript",
    preview: "/work/platos-library.png",
    blurb:
      "Content & curation platform with newsletter and multi-channel distribution.",
    caseStudy: {
      problem:
        "Editorial/curation brands need a fast content platform with capture and distribution baked in.",
      approach:
        "A content platform with structured reviews across categories, newsletter capture, and multi-channel syndication.",
      stack: ["Next.js", "TypeScript", "CMS"],
      outcome:
        "A live content brand demonstrating editorial UX and distribution wiring.",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
