import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.bitsika.com",
      },
      {
        protocol: "https",
        hostname: "filez.bitsika.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/crypto-virtual-card-iran",
        destination: "/iran-ofac-clarification",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
