import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-static';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('category_id');
    
    const products = await prisma.product.findMany({
      where: {
        is_active: true,
        ...(categoryId ? { category_id: parseInt(categoryId) } : {})
      },
      include: {
        category: {
          select: {
            name: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    });
    
    return NextResponse.json(products, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
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
      category_id 
    } = await request.json();
    
    const product = await prisma.product.create({
      data: {
        name,
        short_description,
        full_description,
        materials,
        production_time,
        price,
        discount,
        discounted_price,
        image,
        category_id: category_id ? parseInt(category_id) : null
      }
    });
    
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

