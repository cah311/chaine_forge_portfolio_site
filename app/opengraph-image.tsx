import { ImageResponse } from "next/og";
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
          background: "#15120F",
          color: "#F2EDE4",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#15120F",
              border: "2px solid rgba(242,237,228,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="42"
              height="42"
              viewBox="0 0 32 32"
              fill="#C8A45C"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4 4h24v24H13L4 19Zm4.5 4.5v8.64l6.36 6.36h8.64V8.5Z"
              />
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
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            {site.tagline}
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#A39A8C",
              maxWidth: 820,
              lineHeight: 1.35,
            }}
          >
            Fixed-price builds for web apps, fintech tools, and on-chain
            platforms.
          </div>
        </div>

        <div style={{ fontSize: 24, color: "#C8A45C" }}>
          chainforgelabs.io
        </div>
      </div>
    ),
    { ...size },
  );
}
