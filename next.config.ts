import type { NextConfig } from "next";
import withPWA from "next-pwa";

const isDevelopment = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: isDevelopment,
})(nextConfig);
