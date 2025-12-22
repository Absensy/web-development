import { NextResponse } from 'next/server';

export const dynamic = 'force-static';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-static';

// GET - получить статистику для дашборда
export async function GET() {
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
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
