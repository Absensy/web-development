const fs = require('fs');
const path = require('path');

// Пути к динамическим API routes, которые нужно исключить из статического экспорта
const routesToExclude = [
  'src/app/api/admin/categories/[id]',
  'src/app/api/admin/products/[id]',
  'src/app/api/admin/examples-work/[id]',
];

// Переименовываем папки [id] в _id (Next.js игнорирует папки, начинающиеся с _)
routesToExclude.forEach(routePath => {
  const fullPath = path.join(process.cwd(), routePath);
  const newPath = fullPath.replace('[id]', '_id');
  
  if (fs.existsSync(fullPath)) {
    try {
      fs.renameSync(fullPath, newPath);
      console.log(`✓ Переименовано: ${routePath} -> ${routePath.replace('[id]', '_id')}`);
    } catch (error) {
      console.error(`✗ Ошибка при переименовании ${routePath}:`, error.message);
    }
  }
});

