/**
 * Утилита для получения правильного пути к изображениям
 * Учитывает basePath для GitHub Pages
 */

/**
 * Получить basePath для текущего окружения
 * Определяется автоматически на клиенте из URL
 */
export function getBasePath(): string {
  if (typeof window === 'undefined') {
    return '';
  }
  
  // Определяем basePath из текущего URL
  // Если URL содержит путь вида /repository-name/, это basePath
  const pathname = window.location.pathname;
  
  // Если это GitHub Pages (github.io), извлекаем basePath
  if (window.location.hostname.includes('github.io')) {
    // Формат: /repository-name/ или /repository-name/page
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length > 0 && parts[0] !== '') {
      // Проверяем, что это не просто страница
      // Если первый сегмент не похож на страницу (нет расширения), это basePath
      const firstPart = parts[0];
      if (!firstPart.includes('.') && firstPart !== 'api') {
        return `/${firstPart}`;
      }
    }
  }
  
  return '';
}

/**
 * Получить правильный путь к изображению
 * @param imagePath - путь к изображению (например, "/images/logo.svg")
 * @returns правильный путь с учетом basePath
 */
export function getImagePath(imagePath: string): string {
  const basePath = getBasePath();
  
  // Если путь уже абсолютный и начинается с /, добавляем basePath
  if (imagePath.startsWith('/')) {
    return `${basePath}${imagePath}`;
  }
  
  // Если путь относительный, добавляем /images/ и basePath
  return `${basePath}/images/${imagePath}`;
}

