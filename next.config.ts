import type { NextConfig } from "next";

// Вычисляем basePath для GitHub Pages
// Если репозиторий называется username.github.io, basePath пустой
// Иначе basePath = /repository-name
function getBasePath(): string {
  if (process.env.STATIC_EXPORT !== 'true') {
    return ''; // Локальная разработка - без basePath
  }

  const repository = process.env.GITHUB_REPOSITORY || '';
  if (!repository) {
    return ''; // Если не указан репозиторий, используем корень
  }

  // Формат: username/repository-name
  const parts = repository.split('/');
  if (parts.length !== 2) {
    return '';
  }

  const repoName = parts[1];
  
  // Если репозиторий называется username.github.io, это корневой сайт
  if (repoName.includes('.github.io')) {
    return '';
  }

  // Иначе используем имя репозитория как basePath
  return `/${repoName}`;
}

const basePath = getBasePath();

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
  // Базовый путь для GitHub Pages
  basePath: basePath,
  assetPrefix: basePath,
  // Исключаем динамические API routes из статического экспорта
  ...(process.env.STATIC_EXPORT === 'true' && {
    skipTrailingSlashRedirect: true,
  }),
};

export default nextConfig;
