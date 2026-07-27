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

  // ── Security & Headers ──
  // Menghilangkan header X-Powered-By: Next.js (Low Risk Alert ZAP)
  poweredByHeader: false,
  async headers() {
    return [
      {
        // Menerapkan headers ini ke seluruh rute (routes)
        source: "/(.*)",
        headers: [
          {
            // Memperbaiki Medium Risk Alert: Missing Anti-clickjacking Header
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            // Memperbaiki Low Risk Alert: X-Content-Type-Options Header Missing
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            // Memperbaiki Medium Risk Alert: Content Security Policy (CSP) Header Not Set
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https: wss:;",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
