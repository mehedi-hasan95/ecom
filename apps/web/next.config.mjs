/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    remotePatterns: [
      { hostname: "0itertanyb.ufs.sh", protocol: "https" },
      { hostname: "github.com", protocol: "https" },
    ],
  },
};

export default nextConfig;
