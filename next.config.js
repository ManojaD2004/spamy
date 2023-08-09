/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'assetsio.reedpopcdn.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'cdn-icons-png.flaticon.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: '1000logos.net',
            port: '',
            pathname: '/**',
          }
        ],
      },
}

module.exports = nextConfig
