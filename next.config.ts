import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
  //   // 
    
  // },
  // //   domains: [
  // //     "openweathermap.org"
  // //   ]
  // // }
  // images: {
  //   domains: ['openweathermap.org'],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
