import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["*"]
    }
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
