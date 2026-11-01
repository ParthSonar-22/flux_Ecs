/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  outputFileTracingExcludes: { '*': ['./scratch/media/**/*'] },
  experimental: {
    cpus: 2,
  },
}

export default nextConfig
