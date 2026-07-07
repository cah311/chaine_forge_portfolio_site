import { ImageResponse } from "next/og";
import { brand } from "@/lib/assets";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: brand.colors.iron,
          borderRadius: 40,
        }}
      >
        <svg
          width="112"
          height="112"
          viewBox={brand.mark.viewBox}
          fill={brand.colors.brass}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fillRule="evenodd" d={brand.mark.d} />
        </svg>
      </div>
    ),
    { ...size },
  );
}
