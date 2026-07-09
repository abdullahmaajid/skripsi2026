import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Output ──
  // "standalone" bundles only what's needed — optimal for Vercel & Docker
  output: "standalone",

  // ── Images ──
  // Allow external image sources if needed (e.g. avatars from Google/GitHub OAuth)
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.googleusercontent.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },

  // ── Logging ──
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === "development",
    },
  },
};

export default nextConfig;
