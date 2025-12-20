import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Для локального хостинга разрешаем неоптимизированные изображения
    unoptimized: process.env.NODE_ENV === 'production' && process.env.STATIC_EXPORT === 'true',
  },
  // Опция для статического экспорта (раскомментируйте если нужно)
  // output: 'export',
  // trailingSlash: true,
};

export default nextConfig;
