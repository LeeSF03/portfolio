import type { NextConfig } from 'next'

const prefix = process.env.NODE_ENV === 'production' ? 'https://leesf.xyz' : ''

const nextConfig: NextConfig = {
  assetPrefix: 'https://leesf.xyz',
  // assetPrefix: prefix,
}

export default nextConfig
