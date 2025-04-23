/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  // Add font optimization settings with increased timeout
  optimizeFonts: true,
  experimental: {
    fontLoaders: [
      { 
        loader: '@next/font/google', 
        options: { 
          subsets: ['latin', 'cyrillic'],
          timeout: 60000 // Increased timeout to 60 seconds
        } 
      }
    ],
  }
}

module.exports = nextConfig