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
      // Redirect www to non-www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.creditklick.com',
          },
        ],
        destination: 'https://creditklick.com/:path*',
        permanent: true, // 301 redirect for SEO
      },
    ];
  },
};

export default nextConfig;
