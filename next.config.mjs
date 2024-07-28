/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nujyktsofehmjwxxwccx.supabase.co'
      }
    ]
  }
};

export default nextConfig;
