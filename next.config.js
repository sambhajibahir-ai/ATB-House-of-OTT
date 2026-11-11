/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "lh3.googleusercontent.com"],
  },
  experimental: {
    webpackBuildWorker: false,
  },
};

module.exports = nextConfig;

