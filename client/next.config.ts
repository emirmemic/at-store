import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_STRAPI_HOSTNAME ?? 'admin.atstore.ba',
      },
      {
        protocol: 'https',
        hostname: 'www.apple.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
