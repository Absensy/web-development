/**
 * Утилита для получения правильного пути к изображениям
 * Учитывает basePath для GitHub Pages
 */

/**
 * Получить правильный путь к изображению
 * @param imagePath - путь к изображению (например, "/images/logo.svg")
 * @returns правильный путь с учетом basePath
 */
export function getImagePath(imagePath: string): string {
  // Если путь уже абсолютный и начинается с /, используем как есть
  if (imagePath.startsWith('/')) {
    // В статическом режиме на GitHub Pages может быть basePath
    // Но так как мы не устанавливаем basePath в next.config, пути должны работать
    return imagePath;
  }
  
  // Если путь относительный, добавляем /images/
  if (!imagePath.startsWith('/')) {
    return `/images/${imagePath}`;
  }
  
  return imagePath;
}

/**
 * Получить basePath для текущего окружения
 * Определяется автоматически на клиенте
 */
export function getBasePath(): string {
  if (typeof window === 'undefined') {
    return '';
  }
  
  // GitHub Pages может иметь basePath в виде /repository-name
  // Но так как мы не используем basePath в конфиге, возвращаем пустую строку
  return '';
}

