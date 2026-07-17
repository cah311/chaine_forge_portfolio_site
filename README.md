# Chain Forge Labs

Site for Chain Forge Labs: a fixed-fee **AI Tools Assessment** as the front door, then builds and an AI Concierge retainer for what off-the-shelf tools can't solve. Portfolio products stay public as proof we ship.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Logo

The mark is a **blacksmith's touchmark** — the kind of stamp a forge punches into hot metal to claim ownership. That framing drove every decision: one symbol, heavy geometry, no decoration, built to read at favicon size.

**Chain link, not an anvil.** The name is *Chain Forge*, so the primary read is a single squared chain link: a hollow square with a uniform stroke. We avoided drawing an anvil outright; the forge reference lives in the *making* of the mark, not a literal illustration.

**The 45° facet.** The bottom-left corner is sheared at exactly 45° on both the outer and inner edges. That cut does two jobs: it breaks the perfect symmetry so the link feels hand-struck rather than generic, and the negative space it creates resolves into a flat-topped pentagon — a subtle anvil silhouette for anyone who looks twice.

**Stroke weight.** The link wall is ~14% of the viewBox width (4.5 units in a 32×32 grid). At 16px that lands around 2.25px — thick enough to survive favicons and nav chips without the facet disappearing.

**Technical choices.** The geometry is a single path with `fill-rule="evenodd"` and `currentColor` fill so it themes with CSS. No gradients, no strokes-on-strokes — just fill shapes that scale cleanly. The wordmark lockup uses Bricolage Grotesque 800 outlined to paths so it renders identically everywhere without a font dependency.

**Variants** (in `public/brand/`, paths in `lib/assets.ts`):

| File | Use |
|---|---|
| `cfl-mark.svg` | Standalone mark, theming via `currentColor` |
| `cfl-badge.svg` | Brass mark on iron rounded square — nav, footer, JSON-LD |
| `cfl-lockup.svg` | Horizontal mark + wordmark for dark surfaces |
| `cfl-stamp.svg` | One-color knockout for embossing, foil, watermarks |

## Deploy

Built for static export / Vercel. See [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).

