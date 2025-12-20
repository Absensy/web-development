import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Получаем все материалы из активных продуктов
    const products = await prisma.product.findMany({
      where: {
        is_active: true
      },
      select: {
        materials: true
      }
    })

    // Извлекаем и обрабатываем материалы
    const allMaterials: string[] = products
      .map((p: typeof products[0]) => p.materials)
      .filter((m: string | null): m is string => Boolean(m))
      .flatMap((materialString: string) => 
        materialString.split(',').map((m: string) => m.trim())
      )
      .filter((m: string): m is string => Boolean(m))

    // Создаем Set для дедупликации и приводим к правильному формату
    const uniqueMaterials = Array.from(new Set(allMaterials))
      .map((material: string) => {
        // Приводим к правильному формату: первая буква заглавная, остальные строчные
        return material.charAt(0).toUpperCase() + material.slice(1).toLowerCase()
      })
      .sort()

    // Получаем все активные категории
    const categories = await prisma.category.findMany({
      where: {
        is_active: true
      },
      select: {
        id: true,
        name: true
      },
      orderBy: {
        name: 'asc'
      }
    })

    // Получаем ценовые диапазоны из активных товаров
    const priceRanges = await prisma.product.aggregate({
      where: {
        is_active: true
      },
      _min: {
        price: true
      },
      _max: {
        price: true
      }
    })

    const filterData = {
      materials: uniqueMaterials,
      categories: categories,
      priceRange: {
        min: priceRanges._min.price || 0,
        max: priceRanges._max.price || 10000
      },
      sortOptions: [
        { value: 'popular', label: 'Популярные' },
        { value: 'price-asc', label: 'Цена: по возрастанию' },
        { value: 'price-desc', label: 'Цена: по убыванию' },
        { value: 'new', label: 'Новинки' },
        { value: 'discount', label: 'Акция' }
      ]
    }

    return NextResponse.json(filterData, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
  } catch (error) {
    console.error('Error fetching filter data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch filter data' },
      { status: 500 }
    )
  }
}
