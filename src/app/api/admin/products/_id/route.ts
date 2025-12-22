import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export function generateStaticParams() {
  return [];
}

export const dynamic = 'force-static';

// GET - получить товар по ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...product,
      is_new: Boolean(product.is_new),
      is_popular: Boolean(product.is_popular),
      is_active: Boolean(product.is_active),
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// PUT - обновить товар
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        ...(name !== undefined && { name }),
        ...(short_description !== undefined && { short_description }),
        ...(full_description !== undefined && { full_description }),
        ...(materials !== undefined && { materials }),
        ...(production_time !== undefined && { production_time }),
        ...(price !== undefined && { price: parseFloat(price) }),
        ...(discount !== undefined && { discount: discount ? parseInt(discount) : null }),
        ...(discounted_price !== undefined && { discounted_price: discounted_price ? parseFloat(discounted_price) : null }),
        ...(image !== undefined && { image }),
        ...(category_id !== undefined && { category_id: category_id ? parseInt(category_id) : null }),
        ...(is_new !== undefined && { is_new }),
        ...(is_popular !== undefined && { is_popular }),
        ...(is_active !== undefined && { is_active }),
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE - удалить товар
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
