import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-static';

// GET - получить все товары
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const categoryId = searchParams.get('categoryId');

    const where: Record<string, unknown> = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { short_description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (categoryId) {
      where.category_id = parseInt(categoryId);
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    const normalizedProducts = products.map((product: typeof products[0]) => ({
      ...product,
      is_new: Boolean(product.is_new),
      is_popular: Boolean(product.is_popular),
      is_active: Boolean(product.is_active),
    }));

    return NextResponse.json(normalizedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST - создать новый товар
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      short_description,
      full_description,
      materials,
      production_time,
      price,
      discount,
      discounted_price,
      image,
      category_id,
      is_new,
      is_popular,
      is_active,
    } = body;

    const product = await prisma.product.create({
      data: {
        name,
        short_description,
        full_description,
        materials,
        production_time,
        price: parseFloat(price),
        discount: discount ? parseInt(discount) : null,
        discounted_price: discounted_price ? parseFloat(discounted_price) : null,
        image,
        category_id: category_id ? parseInt(category_id) : null,
        is_new: is_new || false,
        is_popular: is_popular || false,
        is_active: is_active !== undefined ? is_active : true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
