import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["*"]
    }
  },
  typescript: {
    ignoreBuildErrors: true
  },
  // Ensure better-sqlite3 native binaries are included in Vercel output
  outputFileTracingIncludes: {
    "/*": ["./node_modules/better-sqlite3/**/*", "./node_modules/bindings/**/*", "./node_modules/file-uri-to-path/**/*"]
  },
  serverExternalPackages: ["better-sqlite3", "bcryptjs"],
};

export default nextConfig;
