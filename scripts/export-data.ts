import { PrismaClient } from '@prisma/client';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

const prisma = new PrismaClient();

async function exportData() {
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

    console.log('\n✅ Экспорт данных завершен успешно!');
  } catch (error) {
    console.error('❌ Ошибка при экспорте данных:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

exportData();

