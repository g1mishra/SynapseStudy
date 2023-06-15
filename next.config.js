/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cloud.appwrite.io"],
  },

  webpack: (config) => {
    config.externals.push({ sharp: "commonjs sharp", canvas: "commonjs canvas" });
    return config;
  },
};

module.exports = nextConfig;
