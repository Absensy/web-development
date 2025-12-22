import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-static';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-static';

// GET - получить все услуги
export async function GET() {
  try {
    const services = await prisma.content.findFirst({
      where: { section: 'our_services' }
    });

    if (!services) {
      // Возвращаем дефолтные значения если контент не найден
      return NextResponse.json({
        ourServices: [
          {
            id: 1,
            name: 'Изготовление памятников',
            subtext: 'Индивидуальные памятники из гранита и мрамора',
            image: '/images/tools.svg'
          },
          {
            id: 2,
            name: 'Гравировка',
            subtext: 'Нанесение текста и изображений на памятники',
            image: '/images/pen.svg'
          },
          {
            id: 3,
            name: 'Установка',
            subtext: 'Профессиональная установка памятников на кладбище',
            image: '/images/hammer.svg'
          }
        ]
      });
    }

    return NextResponse.json(services.data);
  } catch (error) {
    console.error('Error fetching our services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

// PUT - обновить услуги
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { ourServices } = body;

    const content = await prisma.content.upsert({
      where: { section: 'our_services' },
      update: {
        data: { ourServices },
        updated_at: new Date()
      },
      create: {
        section: 'our_services',
        data: { ourServices }
      }
    });

    return NextResponse.json(content.data);
  } catch (error) {
    console.error('Error updating our services:', error);
    return NextResponse.json(
      { error: 'Failed to update services' },
      { status: 500 }
    );
  }
}



