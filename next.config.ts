import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/diensten', destination: '/services', permanent: true },
      { source: '/diensten/:slug', destination: '/services/:slug', permanent: true },
      { source: '/over-ons', destination: '/about', permanent: true },
      { source: '/analyse/:slug', destination: '/analysis/:slug', permanent: true },
      { source: '/posts', destination: '/insights', permanent: true },
      { source: '/posts/:slug', destination: '/insights/:slug', permanent: true },
    ];
  },
};

export default nextConfig;
