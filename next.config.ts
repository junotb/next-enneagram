import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
