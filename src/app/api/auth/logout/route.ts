import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function POST() {
  try {
    const response = NextResponse.json(
      { success: true, message: 'Успешный выход' },
      { status: 200 }
    );

    // Удаляем cookie с токеном
    response.cookies.set('admin-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0 // Немедленно удаляем cookie
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}
