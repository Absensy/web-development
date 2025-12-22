import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-static';

// GET - получить статистику для дашборда
export async function GET() {
  // Для статического экспорта возвращаем пустые данные, если DATABASE_URL не установлен
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({
      totalProducts: 0,
      totalCategories: 0,
      totalExamplesWork: 0,
      recentProducts: []
    });
  }

  try {
    const [
      totalProducts,
      totalCategories,
      totalExamplesWork,
      recentProducts,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.examplesOurWork.count(),
      prisma.product.findMany({
        take: 5,
        orderBy: { created_at: 'desc' },
        include: { category: true },
      }),
    ]);

    const stats = {
      totalProducts,
      totalCategories,
      totalExamplesWork,
      recentProducts,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    // Возвращаем пустые данные вместо ошибки для статического экспорта
    return NextResponse.json({
      totalProducts: 0,
      totalCategories: 0,
      totalExamplesWork: 0,
      recentProducts: []
    });
  }
}
