/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  outputFileTracingExcludes: { '*': ['./scratch/media/**/*'] },
  experimental: {
    cpus: 2,
  },
  async headers() {
    return [
      {
        source: '/media/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, HEAD, OPTIONS' },
          { key: 'Accept-Ranges', value: 'bytes' },
        ],
      },
    ]
  },
}

export default nextConfig
