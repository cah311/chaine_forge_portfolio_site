import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="pt-[160px] pb-[100px]">
        <div className="max-w-wrap mx-auto px-7 relative z-[2]">
          <span className="font-mono text-[12.5px] tracking-[0.22em] uppercase text-brass inline-flex items-center gap-2.5 before:content-[''] before:w-[22px] before:h-px before:bg-brass before:inline-block">
            404
          </span>
          <h1 className="font-display font-bold text-[clamp(2rem,4.2vw,3.2rem)] tracking-[-0.025em] leading-[1.02] mt-[18px] mb-5">
            This page doesn&apos;t exist.
          </h1>
          <p className="text-smoke text-[clamp(1.05rem,1.7vw,1.25rem)] max-w-[42ch] mb-9">
            The link may be old, or the page moved. The assessment is still the
            front door.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/#assessment"
              className="inline-flex items-center gap-[9px] font-semibold text-[15px] px-6 py-3.5 rounded-[11px] bg-brass text-[#1a140a] hover:bg-brass-bright hover:-translate-y-0.5 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
            >
              Book your assessment ↗
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-[9px] font-semibold text-[15px] px-6 py-3.5 rounded-[11px] border border-hair-strong text-bone hover:border-brass hover:text-brass transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
            >
              Back to home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
