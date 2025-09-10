/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;

webpackDevMiddleware: (config) => {
  config.watchOptions = {
    poll: 1000,            // cek perubahan file tiap 1 detik
    aggregateTimeout: 300, // jeda sebelum reload biar nggak terlalu sering
  };
  return config;
}
