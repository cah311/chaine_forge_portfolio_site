import { ImageResponse } from "next/og";
import { brand } from "@/lib/assets";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: brand.colors.iron,
          color: brand.colors.bone,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: brand.colors.iron,
              border: "2px solid rgba(242,237,228,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="42"
              height="42"
              viewBox={brand.mark.viewBox}
              fill={brand.colors.brass}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fillRule="evenodd" d={brand.mark.d} />
            </svg>
          </div>
          <div
            style={{
              fontSize: 34,
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: 960,
            }}
          >
            Find 5+ hours a week. Guaranteed — or it&apos;s free.
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#A39A8C",
              maxWidth: 820,
              lineHeight: 1.35,
            }}
          >
            Fixed-fee AI Tools Assessment · credited toward build · we ship what
            off-the-shelf can&apos;t.
          </div>
        </div>

        <div style={{ fontSize: 24, color: brand.colors.brass }}>
          chainforgelabs.io
        </div>
      </div>
    ),
    { ...size },
  );
}
