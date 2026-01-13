import { PrismaClient } from '@prisma/client';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

async function exportData() {
  // Проверяем наличие DATABASE_URL
  if (!process.env.DATABASE_URL) {
    console.log('⚠️ DATABASE_URL не установлен. Пропускаю экспорт данных.');
    console.log('💡 Используйте существующие JSON файлы из public/data/');
    return;
  }

  const prisma = new PrismaClient();

  try {
    console.log('Начинаю экспорт данных...');

    // Создаем папку для данных если не существует
    const dataDir = join(process.cwd(), 'public', 'data');
    await mkdir(dataDir, { recursive: true });

    // Экспортируем продукты
    const products = await prisma.product.findMany({
      where: { is_active: true },
      include: {
        category: {
          select: {
            name: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    });
    await writeFile(
      join(dataDir, 'products.json'),
      JSON.stringify(products, null, 2),
      'utf-8'
    );
    console.log(`✓ Экспортировано ${products.length} продуктов`);

    // Экспортируем категории
    const categories = await prisma.category.findMany({
      where: { is_active: true },
      orderBy: { created_at: 'desc' }
    });
    await writeFile(
      join(dataDir, 'categories.json'),
      JSON.stringify(categories, null, 2),
      'utf-8'
    );
    console.log(`✓ Экспортировано ${categories.length} категорий`);

    // Экспортируем примеры работ
    const examples = await prisma.examplesOurWork.findMany({
      where: { is_active: true },
      orderBy: { created_at: 'desc' }
    });
    await writeFile(
      join(dataDir, 'examples-work.json'),
      JSON.stringify(examples, null, 2),
      'utf-8'
    );
    console.log(`✓ Экспортировано ${examples.length} примеров работ`);

    // Экспортируем контакты
    const contact = await prisma.contactInfo.findFirst();
    if (contact) {
      await writeFile(
        join(dataDir, 'contact.json'),
        JSON.stringify(contact, null, 2),
        'utf-8'
      );
      console.log('✓ Экспортирована контактная информация');
    }

    // Экспортируем контент
    const content = await prisma.content.findMany();
    const contentMap: Record<string, unknown> = {};
    for (const item of content) {
      contentMap[item.section] = item.data;
    }
    await writeFile(
      join(dataDir, 'content.json'),
      JSON.stringify(contentMap, null, 2),
      'utf-8'
    );
    console.log(`✓ Экспортировано ${content.length} секций контента`);

    // Экспортируем данные для фильтров
    const allProducts = await prisma.product.findMany({
      where: { is_active: true },
      select: {
        materials: true,
        price: true,
      }
    });
    
    // Извлекаем уникальные материалы из массива materials каждого продукта
    const allMaterials = new Set<string>();
    allProducts.forEach((p: { materials: string | null }) => {
      if (p.materials) {
        // materials может быть строкой или JSON массивом
        try {
          const parsed = typeof p.materials === 'string' ? JSON.parse(p.materials) : p.materials;
          if (Array.isArray(parsed)) {
            parsed.forEach((m: string) => {
              if (m && m.trim() !== '') {
                allMaterials.add(m.trim());
              }
            });
          } else if (typeof parsed === 'string' && parsed.trim() !== '') {
            allMaterials.add(parsed.trim());
          }
        } catch {
          // Если не JSON, используем как строку
          if (typeof p.materials === 'string' && p.materials.trim() !== '') {
            allMaterials.add(p.materials.trim());
          }
        }
      }
    });
    const materials = Array.from(allMaterials).sort();
    
    const prices = allProducts
      .map((p: { price: number | null }) => p.price)
      .filter((p: number | null): p is number => p != null && !isNaN(Number(p)))
      .map((p: number) => Number(p));
    
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 100000;
    
    const filtersData = {
      categories: categories.map((cat: { id: number; name: string }) => ({ id: cat.id, name: cat.name })),
      materials,
      priceRange: {
        min: minPrice,
        max: maxPrice
      },
      sortOptions: [
        { value: 'price-asc', label: 'По возрастанию цены' },
        { value: 'price-desc', label: 'По убыванию цены' },
        { value: 'name-asc', label: 'По имени (А-Я)' },
        { value: 'name-desc', label: 'По имени (Я-А)' }
      ]
    };
    
    await writeFile(
      join(dataDir, 'filters.json'),
      JSON.stringify(filtersData, null, 2),
      'utf-8'
    );
    console.log('✓ Экспортированы данные фильтров');

    console.log('\n✅ Экспорт данных завершен успешно!');
  } catch (error) {
    console.error('❌ Ошибка при экспорте данных:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

exportData();

