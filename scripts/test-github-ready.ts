import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

console.log('🔍 Проверка готовности проекта к публикации на GitHub...\n');

let errors = 0;
let warnings = 0;

// Проверка .gitignore
console.log('1. Проверка .gitignore...');
const gitignorePath = join(process.cwd(), '.gitignore');
if (existsSync(gitignorePath)) {
  const gitignore = readFileSync(gitignorePath, 'utf-8');
  
  const requiredIgnores = [
    '*.db',
    '*.db-journal',
    '/public/uploads/**',
    '.env*'
  ];
  
  for (const ignore of requiredIgnores) {
    if (gitignore.includes(ignore) || gitignore.includes(ignore.replace(/\//g, ''))) {
      console.log(`   ✓ ${ignore} игнорируется`);
    } else {
      console.log(`   ✗ ${ignore} НЕ найден в .gitignore`);
      warnings++;
    }
  }
} else {
  console.log('   ✗ .gitignore не найден!');
  errors++;
}

// Проверка наличия БД файлов
console.log('\n2. Проверка файлов БД...');
const dbFiles = [
  'prisma/dev.db',
  'prisma/dev.db-journal',
  'dev.db',
  'dev.db-journal'
];

let dbFilesFound = false;
for (const dbFile of dbFiles) {
  const dbPath = join(process.cwd(), dbFile);
  if (existsSync(dbPath)) {
    console.log(`   ⚠ Найден файл БД: ${dbFile} (должен быть в .gitignore)`);
    dbFilesFound = true;
  }
}
if (!dbFilesFound) {
  console.log('   ✓ Файлы БД не найдены (или правильно игнорируются)');
}

// Проверка экспортированных данных
console.log('\n3. Проверка экспортированных данных...');
const dataFiles = [
  'public/data/products.json',
  'public/data/categories.json',
  'public/data/examples-work.json',
  'public/data/contact.json'
];

let dataFilesFound = 0;
for (const dataFile of dataFiles) {
  const dataPath = join(process.cwd(), dataFile);
  if (existsSync(dataPath)) {
    const stats = require('fs').statSync(dataPath);
    console.log(`   ✓ ${dataFile} (${(stats.size / 1024).toFixed(2)} KB)`);
    dataFilesFound++;
  } else {
    console.log(`   ⚠ ${dataFile} не найден (запустите: npm run db:export)`);
    warnings++;
  }
}

// Проверка .env файлов
console.log('\n4. Проверка .env файлов...');
const envFiles = ['.env', '.env.local', '.env.production'];
let envFound = false;
for (const envFile of envFiles) {
  const envPath = join(process.cwd(), envFile);
  if (existsSync(envPath)) {
    console.log(`   ⚠ Найден ${envFile} (должен быть в .gitignore)`);
    envFound = true;
  }
}
if (!envFound) {
  console.log('   ✓ .env файлы не найдены (или правильно игнорируются)');
}

// Проверка структуры проекта
console.log('\n5. Проверка структуры проекта...');
const requiredDirs = [
  'src',
  'public',
  'prisma',
  'scripts'
];

for (const dir of requiredDirs) {
  const dirPath = join(process.cwd(), dir);
  if (existsSync(dirPath)) {
    console.log(`   ✓ ${dir}/`);
  } else {
    console.log(`   ✗ ${dir}/ не найден`);
    errors++;
  }
}

// Итоги
console.log('\n' + '='.repeat(50));
if (errors === 0 && warnings === 0) {
  console.log('✅ Проект готов к публикации на GitHub!');
  process.exit(0);
} else if (errors === 0) {
  console.log(`⚠️  Проект готов, но есть ${warnings} предупреждений`);
  console.log('   Рекомендуется исправить предупреждения перед публикацией');
  process.exit(0);
} else {
  console.log(`❌ Найдено ${errors} ошибок и ${warnings} предупреждений`);
  console.log('   Исправьте ошибки перед публикацией');
  process.exit(1);
}
