/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          net: false,
          dns: false,
          fs: false,
          tls: false,
          assert: false,
          process: false,
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
