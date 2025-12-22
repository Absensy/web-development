import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-static';

// GET - получить контактную информацию
export async function GET() {
  try {
    let contactInfo = await prisma.contactInfo.findFirst({
      orderBy: { created_at: 'desc' }
    });

    // Если нет контактной информации, создаем базовую
    if (!contactInfo) {
      contactInfo = await prisma.contactInfo.create({
        data: {
          address: 'пр. Янки Купалы 22а, цокольный этаж',
          phone: '+375 (29) 708-21-11',
          email: 'info@granit-grodno.by',
          instagram: 'granit.grodno',
          working_hours: 'Пн-Пт: 9:00 - 18:00, Сб-Вс: 10:00 - 16:00',
        },
      });
    }

    return NextResponse.json(contactInfo);
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact info' },
      { status: 500 }
    );
  }
}

// PUT - обновить контактную информацию
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { address, phone, email, instagram, working_hours } = body;

    let contactInfo = await prisma.contactInfo.findFirst({
      orderBy: { created_at: 'desc' }
    });

    if (contactInfo) {
      // Обновляем существующую запись
      contactInfo = await prisma.contactInfo.update({
        where: { id: contactInfo.id },
        data: {
          address,
          phone,
          email,
          instagram,
          working_hours,
        },
      });
    } else {
      // Создаем новую запись
      contactInfo = await prisma.contactInfo.create({
        data: {
          address,
          phone,
          email,
          instagram,
          working_hours,
        },
      });
    }

    return NextResponse.json(contactInfo);
  } catch (error) {
    console.error('Error updating contact info:', error);
    return NextResponse.json(
      { error: 'Failed to update contact info' },
      { status: 500 }
    );
  }
}
