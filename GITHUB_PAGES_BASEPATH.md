# Настройка basePath для GitHub Pages

## Проблема

GitHub Pages размещает сайт по адресу `https://username.github.io/repository-name/`, а не в корне домена. Это требует настройки `basePath` в Next.js.

## Решение

Конфигурация автоматически определяет `basePath` на основе имени репозитория:

1. **Если репозиторий называется `username.github.io`** → `basePath = ''` (корневой сайт)
2. **Если репозиторий имеет другое имя** → `basePath = '/repository-name'`

## Как это работает

### В GitHub Actions

Переменная `GITHUB_REPOSITORY` автоматически передается в workflow:
```yaml
env:
  GITHUB_REPOSITORY: ${{ github.repository }}
```

### В next.config.ts

Конфигурация автоматически вычисляет basePath:
```typescript
const repository = process.env.GITHUB_REPOSITORY || '';
// Формат: username/repository-name
const repoName = parts[1];
const basePath = repoName.includes('.github.io') ? '' : `/${repoName}`;
```

## Проверка

После деплоя проверьте:

1. **Откройте консоль браузера** (F12)
2. **Проверьте загрузку ресурсов**:
   - JS файлы должны загружаться с правильным basePath
   - JSON файлы из `/data/` должны загружаться корректно
   - Изображения должны отображаться

3. **Проверьте Network tab**:
   - Все запросы должны возвращать статус 200
   - Не должно быть 404 ошибок для статических ресурсов

## Если сайт все еще не работает

1. **Проверьте имя репозитория**:
   - Убедитесь, что `GITHUB_REPOSITORY` правильно передается в workflow
   - Проверьте логи GitHub Actions

2. **Очистите кэш браузера**:
   - Ctrl+Shift+R (Windows/Linux)
   - Cmd+Shift+R (Mac)

3. **Проверьте настройки GitHub Pages**:
   - Settings → Pages → Source должен быть "GitHub Actions"
   - Не используйте "Deploy from a branch"

## Локальная разработка

Для локальной разработки `basePath` автоматически пустой, так как `STATIC_EXPORT` не установлен в `true`.

Для тестирования с basePath локально:
```bash
GITHUB_REPOSITORY=username/granit STATIC_EXPORT=true npm run build:static
```

