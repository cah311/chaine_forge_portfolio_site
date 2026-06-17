export function Marquee() {
  const items =
    "TypeScript · Next.js · React · Solidity · Foundry · Postgres · Supabase · Stripe · Tailwind · Avalanche · EVM · AI-Native";

  return (
    <div
      className="border-t border-b border-hair py-[22px] overflow-hidden whitespace-nowrap relative z-[2]"
    >
      <div className="inline-flex gap-[46px] animate-marquee font-mono text-[13px] text-smoke-dim tracking-[0.08em]">
        <span className="inline-flex items-center gap-[46px] after:content-['◆'] after:text-brass after:opacity-50">
          {items}
        </span>
        <span className="inline-flex items-center gap-[46px] after:content-['◆'] after:text-brass after:opacity-50">
          {items}
        </span>
      </div>
    </div>
  );
}
