import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-static';

// GET - получить все примеры работ
export async function GET() {
  try {
    const examplesWork = await prisma.examplesOurWork.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });

    return NextResponse.json(examplesWork);
  } catch (error) {
    console.error('Error fetching examples work:', error);
    return NextResponse.json(
      { error: 'Failed to fetch examples work' },
      { status: 500 }
    );
  }
}

// POST - создать новый пример работы
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, image, dimensions, date, description, is_active } = body;

    const exampleWork = await prisma.examplesOurWork.create({
      data: {
        title,
        image,
        dimensions,
        date,
        description,
        is_active: is_active ?? true,
      },
    });

    return NextResponse.json(exampleWork, { status: 201 });
  } catch (error) {
    console.error('Error creating example work:', error);
    return NextResponse.json(
      { error: 'Failed to create example work' },
      { status: 500 }
    );
  }
}
