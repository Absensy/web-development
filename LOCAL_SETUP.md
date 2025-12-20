# Настройка локального хостинга

Проект настроен для работы с локальным хостингом. Все данные хранятся локально на вашем компьютере.

## Быстрый старт

### 1. Установка зависимостей
```bash
npm install --legacy-peer-deps
```

### 2. Настройка переменных окружения
Создайте файл `.env.local` в корне проекта:

```env
DATABASE_URL="file:./dev.db"
CLOUD_STORAGE_PROVIDER="local"
JWT_SECRET="your-secret-key-change-in-production"
```

### 3. Инициализация базы данных
```bash
# Генерация Prisma клиента
npm run db:generate

# Создание БД и применение схемы
npm run db:push

# Заполнение тестовыми данными
npm run db:seed
```

### 4. Запуск проекта
```bash
npm run dev
```

## Структура локальных данных

- **База данных**: `prisma/dev.db` (SQLite файл)
- **Загруженные файлы**: `public/uploads/` (категории, продукты, примеры работ)
- **Экспортированные данные**: `public/data/` (JSON файлы для статического экспорта)

## Экспорт данных для статического сайта

Если нужно создать статический сайт (например, для GitHub Pages):

```bash
# Экспорт данных из БД в JSON
npm run db:export
```

Это создаст файлы:
- `public/data/products.json`
- `public/data/categories.json`
- `public/data/examples-work.json`
- `public/data/contact.json`
- `public/data/content.json`

## Важные замечания

1. **Файлы БД и uploads не коммитятся в Git** (добавлены в `.gitignore`)
2. **Для деплоя на GitHub Pages**:
   - Используйте экспортированные JSON файлы
   - Или загрузите файлы из `public/uploads/` отдельно
   - Раскомментируйте `output: 'export'` в `next.config.ts` для статического экспорта

3. **Миграции**: При изменении схемы Prisma используйте:
   ```bash
   npm run db:push  # для разработки (SQLite)
   ```

## Переход с PostgreSQL на SQLite

Если у вас уже была PostgreSQL БД:

1. Экспортируйте данные из PostgreSQL
2. Обновите `.env.local` с `DATABASE_URL="file:./dev.db"`
3. Запустите `npm run db:push` для создания новой SQLite БД
4. Импортируйте данные через админ-панель или скрипт

