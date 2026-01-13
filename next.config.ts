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
    // Для статического экспорта разрешаем неоптимизированные изображения
    unoptimized: process.env.STATIC_EXPORT === 'true',
  },
  // Опция для статического экспорта (для GitHub Pages)
  output: process.env.STATIC_EXPORT === 'true' ? 'export' : undefined,
  trailingSlash: process.env.STATIC_EXPORT === 'true',
  // Исключаем динамические API routes из статического экспорта
  ...(process.env.STATIC_EXPORT === 'true' && {
    skipTrailingSlashRedirect: true,
  }),
  // Базовый путь для GitHub Pages будет автоматически настроен GitHub Actions
  // Не устанавливаем basePath здесь, чтобы не ломать локальную разработку
};

export default nextConfig;
