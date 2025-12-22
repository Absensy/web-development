import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-static';

// Для статического экспорта требуется generateStaticParams
export async function generateStaticParams() {
  // Возвращаем пустой массив, так как API routes не должны быть статическими
  return [];
}

// GET - получить категорию по ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: {
        products: true,
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...category,
      productsCount: category.products.length,
      is_active: Boolean(category.is_active),
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}

// PUT - обновить категорию
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, price_from, photo, discount, discounted_price, is_active } = body;

    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: {
        ...(name !== undefined && { name }),
        ...(price_from !== undefined && { price_from: parseFloat(price_from) }),
        ...(photo !== undefined && { photo }),
        ...(discount !== undefined && { discount: discount ? parseInt(discount) : null }),
        ...(discounted_price !== undefined && { discounted_price: discounted_price ? parseFloat(discounted_price) : null }),
        ...(is_active !== undefined && { is_active }),
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

// DELETE - удалить категорию
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.category.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}
