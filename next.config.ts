import type { NextConfig } from 'next'

const prefix = process.env.NODE_ENV === 'production' ? 'https://leesf.xyz' : ''

const nextConfig: NextConfig = {
  // assetPrefix: 'https://leesf.xyz',
  assetPrefix: prefix,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'leesf.xyz',
        port: '443',
        pathname: 'img/**',
        search: '',
      },
    ],
  },
}

export default nextConfig
