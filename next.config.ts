import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: "default",
    unoptimized: true,
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.buymeacoffee.com",
        pathname: "/button-api/**",
      },
    ],
  },
};

export default nextConfig;
