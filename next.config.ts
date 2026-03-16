import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Trailing Slash Consistency - ensures all URLs end without trailing slash
  trailingSlash: false,

  // Image Optimization for faster page loads
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compression for faster loads
  compress: true,

  // Power Packed Headers for SEO
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
        ],
      },
    ];
  },

  // WWW to Non-WWW Redirect (handled via redirects)
  async redirects() {
    return [
      {
        source: '/creditcards',
        destination: '/credit-cards',
        permanent: true,
      },
      {
        source: '/creditklick',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // Proxy to backend to fix CORS
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'https://betaversion-creditklickapp.onrender.com/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
