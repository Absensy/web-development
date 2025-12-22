import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-static'

export async function GET() {
  // Для статического экспорта возвращаем пустой массив, если DATABASE_URL не установлен
  if (!process.env.DATABASE_URL) {
    return NextResponse.json([]);
  }

  try {
    const examplesWork = await prisma.examplesOurWork.findMany({
      orderBy: {
        created_at: 'desc'
      }
    })

    return NextResponse.json(examplesWork)
  } catch (error) {
    console.error('Error fetching examples work:', error)
    return NextResponse.json([]) // Возвращаем пустой массив вместо ошибки для статического экспорта
  }
}
