import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-static';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-static';

// GET - получить контент секции "О компании"
export async function GET() {
  try {
    const content = await prisma.content.findFirst({
      where: { section: 'about_company' }
    });

    if (!content) {
      // Возвращаем дефолтные значения если контент не найден
      return NextResponse.json({
        title: 'О нашей компании',
        description: 'Более 15 лет мы создаем памятники, которые хранят память о ваших близких...',
        image: '/images/ded.png',
        advantages: [
          'Качество материалов',
          'Индивидуальный подход', 
          'Гарантия и надёжность'
        ],
        statistics: [
          { value: '10+', label: 'лет опыта' },
          { value: '2000+', label: 'памятников' },
          { value: '100%', label: 'гарантия' }
        ]
      });
    }

    return NextResponse.json(content.data);
  } catch (error) {
    console.error('Error fetching about company content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

// PUT - обновить контент секции "О компании"
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, image, advantages, statistics } = body;

    const contentData = {
      title,
      description,
      image,
      advantages,
      statistics
    };

    const content = await prisma.content.upsert({
      where: { section: 'about_company' },
      update: {
        data: contentData,
        updated_at: new Date()
      },
      create: {
        section: 'about_company',
        data: contentData
      }
    });

    return NextResponse.json(content.data);
  } catch (error) {
    console.error('Error updating about company content:', error);
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
}
