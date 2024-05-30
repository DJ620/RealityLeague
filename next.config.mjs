/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NEXT_OUTPUT_MODE,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  }
};

export default nextConfig;
