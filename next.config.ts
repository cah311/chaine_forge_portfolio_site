import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/sample-report",
        destination: "/sample-report.html",
      },
    ];
  },
};

export default nextConfig;
