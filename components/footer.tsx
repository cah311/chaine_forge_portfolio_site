import Link from "next/link";
import { BrandLink } from "@/components/logo";
import { navLinks } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-[54px] border-t border-hair">
      <div className="max-w-wrap mx-auto px-7 relative z-[2]">
        <div className="flex justify-between items-center gap-6 flex-wrap">
          <BrandLink />
          <div className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-[13px] text-smoke">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-brass transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#assessment"
              className="hover:text-brass transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
            >
              Book
            </Link>
            <Link
              href="/assessment-terms"
              className="hover:text-brass transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
            >
              Terms
            </Link>
            <Link
              href="/sample-report"
              className="hover:text-brass transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
            >
              Sample report
            </Link>
            <Link
              href="/launchpad"
              className="hover:text-brass transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
            >
              Launchpad
            </Link>
          </div>
          <div className="font-mono text-[12.5px] text-smoke-dim">
            © {year} Chain Forge Labs
          </div>
        </div>
      </div>
    </footer>
  );
}
