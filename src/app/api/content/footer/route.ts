import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const footerContent = await prisma.content.findFirst({
      where: {
        section: 'footer'
      }
    });

    if (!footerContent) {
      // Возвращаем дефолтные значения если нет данных в БД
      return NextResponse.json({
        slogan: 'Сохраняем память о ваших близких в граните на века',
        unp_number: '1234567890',
        copyright_text: '© 2024 Гранит памяти. Все права защищены.',
        company_full_name: 'ООО "Гранит Памяти"'
      });
    }

    return NextResponse.json(footerContent.data);
  } catch (error) {
    console.error('Error fetching footer content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch footer content' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    const footerContent = await prisma.content.upsert({
      where: {
        section: 'footer'
      },
      update: {
        data: body,
        updated_at: new Date()
      },
      create: {
        section: 'footer',
        data: body
      }
    });

    return NextResponse.json(footerContent.data);
  } catch (error) {
    console.error('Error updating footer content:', error);
    return NextResponse.json(
      { error: 'Failed to update footer content' },
      { status: 500 }
    );
  }
}
