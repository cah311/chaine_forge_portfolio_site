import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Token Launchpad",
  description:
    "Whitelabel token launchpad on Avalanche / EVM — bonding curves, trading UI, wallet flows. Security-reviewed contract architecture. From $7,500 CAD.",
  alternates: { canonical: "/launchpad" },
  openGraph: {
    title: `Token Launchpad — ${site.name}`,
    description:
      "Whitelabel token launchpad on Avalanche / EVM — bonding curves, trading UI, wallet flows. From $7,500 CAD.",
    url: "/launchpad",
  },
  twitter: {
    card: "summary_large_image",
    title: `Token Launchpad — ${site.name}`,
    description:
      "Whitelabel token launchpad on Avalanche / EVM. From $7,500 CAD.",
  },
};

const inclusions = [
  "Bonding-curve launch contracts",
  "Integrated trading interface",
  "Wallet connect flows",
  "Security-reviewed architecture",
  "Deploy + handover documentation",
];

export default function LaunchpadPage() {
  return (
    <>
      <Nav />
      <main className="pt-[140px] pb-[84px]">
        <div className="max-w-wrap mx-auto px-7 relative z-[2]">
          <Reveal>
            <Link
              href="/"
              className="font-mono text-xs text-smoke hover:text-brass transition-colors mb-8 inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
            >
              ← Back to Chain Forge Labs
            </Link>
          </Reveal>

          <Reveal>
            <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-brass mb-3.5 inline-block">
              Web3 · Separate offer
            </span>
          </Reveal>

          <Reveal>
            <h1 className="font-display font-bold text-[clamp(2rem,4.2vw,3.2rem)] tracking-[-0.025em] leading-[1.02] mb-6 max-w-[18ch]">
              Token Launchpad
            </h1>
          </Reveal>

          <Reveal>
            <p className="text-smoke text-[clamp(1.05rem,1.7vw,1.25rem)] max-w-[48ch] mb-4">
              Whitelabel launch infrastructure for disclosed teams building real
              on-chain products — not stealth pumps. Avalanche or any EVM chain.
            </p>
          </Reveal>

          <Reveal>
            <p className="font-display font-bold text-[2rem] mb-10">
              From $7,500{" "}
              <span className="text-[1rem] text-smoke font-medium">CAD · scoped</span>
            </p>
          </Reveal>

          <Reveal>
            <ul className="grid gap-3 mb-12 max-w-[40ch]">
              {inclusions.map((item) => (
                <li
                  key={item}
                  className="font-mono text-[13.5px] text-bone flex items-center gap-3 before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-brass"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <div className="flex flex-wrap gap-3 mb-14">
              <Link
                href="/#assessment"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold px-[15px] py-[9px] rounded-[9px] bg-brass text-[#1a140a] hover:bg-brass-bright transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
              >
                Inquire via assessment form ↗
              </Link>
              <Link
                href="/work/snowlaunch"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold px-[15px] py-[9px] rounded-[9px] border border-hair-strong hover:border-brass hover:text-brass transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
              >
                See Snowlaunch case study
              </Link>
              <a
                href="https://snowlaunch.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold px-[15px] py-[9px] rounded-[9px] border border-hair-strong hover:border-brass hover:text-brass transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
              >
                Live demo ↗
              </a>
            </div>
          </Reveal>

          <Reveal>
            <div className="border border-hair rounded-[14px] p-8 max-w-[640px] bg-iron-raised">
              <h2 className="font-display font-bold text-xl mb-3 text-brass">
                Why it&apos;s off the main site
              </h2>
              <p className="text-smoke text-[15px] leading-relaxed mb-4">
                Chain Forge Labs&apos; primary offer is AI enablement for small
                businesses. Mixing that trust signal with a crypto whitelabel
                offer muddies the brand — so launchpad lives here, linked from
                the footer and portfolio.
              </p>
              <p className="font-mono text-xs text-smoke-dim">
                Third-party audits quoted separately. Disclosed teams only.{" "}
                <a
                  href={`mailto:${site.contactEmail}`}
                  className="text-brass hover:text-brass-bright"
                >
                  {site.contactEmail}
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
