import Link from "next/link";
import { navLinks } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-[54px] border-t border-hair">
      <div className="max-w-wrap mx-auto px-7 relative z-[2]">
        <div className="flex justify-between items-center gap-6 flex-wrap">
          <Link
            href="#top"
            className="flex items-center gap-3 font-display font-extrabold text-[18px] tracking-[-0.01em]"
          >
            <span
              className="w-[30px] h-[30px] rounded-lg grid place-items-center flex-none bg-gradient-to-br from-brass to-[#8a6f33] text-[#17120b] font-mono font-semibold text-[15px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
            >
              CF
            </span>
            Chain Forge Labs
          </Link>
          <div className="flex gap-6 font-mono text-[13px] text-smoke">
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
              href="#contact"
              className="hover:text-brass transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
            >
              Contact
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
