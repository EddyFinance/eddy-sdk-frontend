/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  reactStrictMode: false,
  images: {
    domains: ["asset.eddy.finance",""],
  },
  webpack: (config) => {
    config.externals.push("pino-pretty");
    config.externals.push("encoding");
    return config;
  },
};

export default nextConfig
