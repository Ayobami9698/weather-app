import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "openweather.org",
        pathname: "/**",
      },
    ],
  },
  //   domains: [
  //     "openweathermap.org"
  //   ]
  // }
};

export default nextConfig;
