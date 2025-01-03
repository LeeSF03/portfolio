import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "standalone",
  // assetPrefix: "http://172.26.198.128",
  // assetPrefix: "http://nginx",
  assetPrefix: "http://localhost:8080",
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "worldvectorlogo.com",
  //       port: "",
  //       pathname: "/logo/**",
  //       search: "",
  //     },
  //   ],
  // },
};

export default nextConfig;
