import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**", // Allows all paths under this domain
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
        port: "",
        pathname: "/**", // Allows all paths under this domain
      },
    ],
  },
};

export default nextConfig;
