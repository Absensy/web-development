import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Для статического экспорта требуется generateStaticParams
export function generateStaticParams() {
  // Возвращаем пустой массив, так как API routes не должны быть статическими
  // Next.js требует эту функцию для динамических routes при статическом экспорте
  return [];
}

export const dynamic = 'force-static';

// GET - получить пример работы по ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const exampleWork = await prisma.examplesOurWork.findUnique({
      where: { id: parseInt(id) },
    });

    if (!exampleWork) {
      return NextResponse.json(
        { error: 'Example work not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(exampleWork);
  } catch (error) {
    console.error('Error fetching example work:', error);
    return NextResponse.json(
      { error: 'Failed to fetch example work' },
      { status: 500 }
    );
  }
}

// PUT - обновить пример работы
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, image, dimensions, date, description, is_active } = body;

    const exampleWork = await prisma.examplesOurWork.update({
      where: { id: parseInt(id) },
      data: {
        ...(title !== undefined && { title }),
        ...(image !== undefined && { image }),
        ...(dimensions !== undefined && { dimensions }),
        ...(date !== undefined && { date }),
        ...(description !== undefined && { description }),
        ...(is_active !== undefined && { is_active }),
      },
    });

    return NextResponse.json(exampleWork);
  } catch (error) {
    console.error('Error updating example work:', error);
    return NextResponse.json(
      { error: 'Failed to update example work' },
      { status: 500 }
    );
  }
}

// DELETE - удалить пример работы
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.examplesOurWork.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Example work deleted successfully' });
  } catch (error) {
    console.error('Error deleting example work:', error);
    return NextResponse.json(
      { error: 'Failed to delete example work' },
      { status: 500 }
    );
  }
}
