import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Trailing Slash Consistency - ensures all URLs end without trailing slash
  trailingSlash: false,

  // Tree-shake heavy libraries - only imports actually used will be bundled
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      'date-fns',
    ],
  },

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

  // Compression & Security
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // System-Engineer level HTTP Headers & Cache-Control Policies
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
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
        ],
      },
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
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
