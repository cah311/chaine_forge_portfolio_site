"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/site";

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-7 transition-all duration-400 border-b ${
        solid
          ? "bg-[rgba(16,13,11,0.82)] backdrop-blur-[14px] border-hair py-[13px]"
          : "border-transparent py-[18px]"
      }`}
    >
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

      <div
        className={`nav-links items-center gap-[30px] ${
          menuOpen
            ? "max-[900px]:flex max-[900px]:absolute max-[900px]:top-full max-[900px]:left-0 max-[900px]:right-0 max-[900px]:flex-col max-[900px]:bg-[rgba(16,13,11,0.97)] max-[900px]:p-6 max-[900px]:gap-[18px] max-[900px]:border-b max-[900px]:border-hair"
            : "max-[900px]:hidden"
        } hidden min-[901px]:flex`}
        id="navLinks"
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[14.5px] text-smoke hover:text-bone transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="#contact"
          className="inline-flex items-center gap-[9px] font-semibold text-sm px-[18px] py-[10px] rounded-[11px] bg-brass text-[#1a140a] hover:bg-brass-bright hover:-translate-y-0.5 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
          onClick={() => setMenuOpen(false)}
        >
          Get a quote
        </Link>
      </div>

      <button
        type="button"
        className="min-[901px]:hidden grid place-items-center w-10 h-10 border border-hair-strong rounded-[9px] bg-transparent text-bone cursor-pointer text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
        aria-label="Menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((o) => !o)}
      >
        ☰
      </button>
    </nav>
  );
}
