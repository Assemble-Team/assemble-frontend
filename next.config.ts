import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/groups',
        permanent: true, // SEO 최적화를 위한 308 리다이렉트
      },
    ];
  },
};

export default nextConfig;
