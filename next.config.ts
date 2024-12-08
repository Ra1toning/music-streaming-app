import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
      },
      {
        hostname: "khqmudymcervnlczfktx.supabase.co",
      },
    ]
  }
};

export default nextConfig;
