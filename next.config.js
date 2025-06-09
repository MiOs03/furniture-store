/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false }
    return config
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'vercel.app']
    }
  }
}

module.exports = nextConfig 