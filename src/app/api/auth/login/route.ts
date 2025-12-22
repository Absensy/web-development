import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';

export const dynamic = 'force-static';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '123';
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

export async function POST(request: NextRequest) {
  try {
    console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
    console.log('JWT_SECRET length:', JWT_SECRET.length);
    
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: 'Пароль обязателен' },
        { status: 400 }
      );
    }

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Неверный пароль' },
        { status: 401 }
      );
    }

    // Создаем JWT токен
    const secret = new TextEncoder().encode(JWT_SECRET);
    const token = await new SignJWT({ 
      admin: true,
      timestamp: Date.now()
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .setIssuedAt()
      .sign(secret);

    console.log('Token created successfully, length:', token.length);

    // Создаем HTTP-only cookie
    const response = NextResponse.json(
      { success: true, message: 'Успешная авторизация' },
      { status: 200 }
    );

    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 часа в миллисекундах
    });

    console.log('Cookie set successfully');
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}
