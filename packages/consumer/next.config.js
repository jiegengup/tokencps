/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  typescript: { ignoreBuildErrors: true },
  transpilePackages: ['@tokencps/shared'],
}

module.exports = nextConfig
