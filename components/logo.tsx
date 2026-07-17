import Link from "next/link";
import { brand } from "@/lib/assets";
import { site } from "@/lib/site";

type LogoMarkProps = {
  size?: number;
  className?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
};

export function LogoMark({
  size = 32,
  className,
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden,
}: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={brand.mark.viewBox}
      fill="currentColor"
      fillRule="evenodd"
      aria-label={ariaLabel}
      aria-hidden={ariaHidden ?? (ariaLabel ? undefined : true)}
      className={className}
    >
      <path d={brand.mark.d} />
    </svg>
  );
}

type LogoBadgeProps = {
  size?: number;
  className?: string;
};

/** Brass mark on iron rounded square — nav, footer, favicon source. */
export function LogoBadge({ size = 30, className }: LogoBadgeProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={brand.badge.viewBox}
      aria-hidden
      className={`flex-none ${className ?? ""}`}
    >
      <rect
        width="40"
        height="40"
        rx={brand.badge.cornerRadius}
        fill={brand.colors.iron}
      />
      <path
        fill={brand.colors.brass}
        fillRule="evenodd"
        d={brand.badge.d}
      />
    </svg>
  );
}

type BrandLinkProps = {
  className?: string;
};

export function BrandLink({ className }: BrandLinkProps) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-3 font-display font-extrabold text-[18px] tracking-[-0.01em] ${className ?? ""}`}
    >
      <LogoBadge size={30} />
      {site.name}
    </Link>
  );
}
