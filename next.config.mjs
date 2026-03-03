/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false, // Отключаем строгий режим

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zxtravvkkcgizasaxdoe.supabase.co',
      },
    ],
  },
};

export default nextConfig;
