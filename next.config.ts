import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    useLightningcss: true,
  },
  // eslint:{
  //  ignoreDuringBuilds:true
  // }
};

export default nextConfig;
