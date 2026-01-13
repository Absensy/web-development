import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

console.log('🔍 Проверка работоспособности проекта...\n');

const checks = [
  {
    name: 'JSON файлы данных',
    check: () => {
      const dataFiles = [
        'public/data/products.json',
        'public/data/categories.json',
        'public/data/examples-work.json',
        'public/data/contact.json',
        'public/data/content.json',
      ];
      
      const missing = dataFiles.filter(file => !existsSync(file));
      if (missing.length > 0) {
        return { success: false, message: `Отсутствуют файлы: ${missing.join(', ')}` };
      }
      
      // Проверяем, что файлы валидные JSON
      const invalid = dataFiles.filter(file => {
        try {
          const content = readFileSync(file, 'utf-8');
          if (!content || content.trim() === '') {
            return true;
          }
          JSON.parse(content); // Проверяем валидность JSON
          return false;
        } catch {
          return true;
        }
      });
      
      if (invalid.length > 0) {
        return { success: false, message: `Невалидные JSON файлы: ${invalid.join(', ')}` };
      }
      
      return { success: true, message: `Все ${dataFiles.length} файлов данных найдены и не пусты` };
    }
  },
  {
    name: 'Иконки',
    check: () => {
      const iconFiles = [
        'src/icons/LogoGranitPrimary1.tsx',
        'src/icons/LogoGranitPrimary2.tsx',
        'src/icons/MenuIcon.tsx',
        'src/icons/GPS.tsx',
        'src/icons/Tel.tsx',
        'src/icons/Inst.tsx',
      ];
      
      const missing = iconFiles.filter(file => !existsSync(file));
      if (missing.length > 0) {
        return { success: false, message: `Отсутствуют файлы: ${missing.join(', ')}` };
      }
      
      // Проверяем, что иконки используют правильный синтаксис
      const broken = iconFiles.filter(file => {
        try {
          const content = readFileSync(file, 'utf-8');
          return !content.includes('xlinkHref') || !content.includes('imagePath');
        } catch {
          return true;
        }
      });
      
      if (broken.length > 0) {
        return { success: false, message: `Иконки без xlinkHref: ${broken.join(', ')}` };
      }
      
      return { success: true, message: `Все ${iconFiles.length} иконок проверены` };
    }
  },
  {
    name: 'Изображения',
    check: () => {
      const imageFiles = [
        'public/images/LogoGranitPrimary1.svg',
        'public/images/LogoGranitPrimary2.svg',
        'public/images/MenuIcon.svg',
        'public/images/gps.svg',
        'public/images/tel.svg',
        'public/images/inst.svg',
      ];
      
      const missing = imageFiles.filter(file => !existsSync(file));
      if (missing.length > 0) {
        return { success: false, message: `Отсутствуют изображения: ${missing.join(', ')}` };
      }
      
      return { success: true, message: `Все ${imageFiles.length} изображений найдены` };
    }
  },
  {
    name: 'API Fallback утилита',
    check: () => {
      const file = 'src/lib/utils/api-fallback.ts';
      if (!existsSync(file)) {
        return { success: false, message: 'Файл api-fallback.ts не найден' };
      }
      
      const content = readFileSync(file, 'utf-8');
      if (!content.includes('fetchWithFallback')) {
        return { success: false, message: 'Функция fetchWithFallback не найдена' };
      }
      
      return { success: true, message: 'API fallback утилита найдена' };
    }
  },
  {
    name: 'Конфигурация Next.js',
    check: () => {
      const file = 'next.config.ts';
      if (!existsSync(file)) {
        return { success: false, message: 'next.config.ts не найден' };
      }
      
      const content = readFileSync(file, 'utf-8');
      if (!content.includes('STATIC_EXPORT')) {
        return { success: false, message: 'Конфигурация STATIC_EXPORT не найдена' };
      }
      
      return { success: true, message: 'Конфигурация Next.js корректна' };
    }
  },
  {
    name: 'GitHub Actions workflow',
    check: () => {
      const file = '.github/workflows/deploy.yml';
      if (!existsSync(file)) {
        return { success: false, message: 'Workflow файл не найден' };
      }
      
      const content = readFileSync(file, 'utf-8');
      if (!content.includes('STATIC_EXPORT')) {
        return { success: false, message: 'Workflow не использует STATIC_EXPORT' };
      }
      
      return { success: true, message: 'GitHub Actions workflow настроен' };
    }
  },
];

let passed = 0;
let failed = 0;

checks.forEach(({ name, check }) => {
  const result = check();
  if (result.success) {
    console.log(`✅ ${name}: ${result.message}`);
    passed++;
  } else {
    console.log(`❌ ${name}: ${result.message}`);
    failed++;
  }
});

console.log(`\n📊 Итого: ${passed} проверок пройдено, ${failed} провалено`);

if (failed === 0) {
  console.log('\n🎉 Все проверки пройдены! Проект готов к деплою.');
  process.exit(0);
} else {
  console.log('\n⚠️  Некоторые проверки провалены. Исправьте ошибки перед деплоем.');
  process.exit(1);
}

