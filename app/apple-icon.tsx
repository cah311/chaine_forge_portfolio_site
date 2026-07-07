import { ImageResponse } from "next/og";

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
          background: "#15120F",
          borderRadius: 40,
        }}
      >
        <svg
          width="112"
          height="112"
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
    ),
    { ...size },
  );
}
