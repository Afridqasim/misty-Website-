import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  // Standard Webpack build is preferred for restricted shared hosting environments
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;

