import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - получить все категории
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        products: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    const categoriesWithCount = categories.map((category: typeof categories[0]) => ({
      ...category,
      productsCount: category.products.length,
      is_active: Boolean(category.is_active),
    }));

    return NextResponse.json(categoriesWithCount);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST - создать новую категорию
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, price_from, photo, discount, discounted_price, is_active } = body;

    const category = await prisma.category.create({
      data: {
        name,
        price_from: parseFloat(price_from),
        photo,
        discount: discount ? parseInt(discount) : null,
        discounted_price: discounted_price ? parseFloat(discounted_price) : null,
        is_active: is_active !== undefined ? is_active : true,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
