import { NextRequest, NextResponse } from 'next/server';
import { ProductService } from '@/lib/services';
import { ProductValidator } from '@/lib/utils';

// Пример использования ООП классов в API route
const productService = new ProductService();
const productValidator = new ProductValidator();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('category_id');
    
    // Используем сервис для получения продуктов
    const products = await productService.getAll(
      categoryId ? parseInt(categoryId) : undefined
    );
    
    // Конвертируем объекты Product в JSON
    const productsJSON = products.map(product => product.toJSON());
    
    return NextResponse.json(productsJSON, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const productData = await request.json();
    
    // Валидация данных с помощью валидатора
    const validationResult = productValidator.validate(productData);
    
    if (!validationResult.isValid) {
      return NextResponse.json(
        { error: 'Validation failed', errors: validationResult.errors },
        { status: 400 }
      );
    }
    
    // Создаем продукт через сервис
    const product = await productService.create(productData);
    
    return NextResponse.json(product.toJSON(), { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create product' },
      { status: 500 }
    );
  }
}

