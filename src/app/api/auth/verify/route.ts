import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export const dynamic = 'force-static';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin-token')?.value;

    if (!token) {
      return NextResponse.json(
        { authenticated: false, error: 'Токен не найден' },
        { status: 401 }
      );
    }

    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      
      if (!payload.admin) {
        return NextResponse.json(
          { authenticated: false, error: 'Неверный токен' },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { authenticated: true, admin: true },
        { status: 200 }
      );
    } catch {
      return NextResponse.json(
        { authenticated: false, error: 'Недействительный токен' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Verify error:', error);
    return NextResponse.json(
      { authenticated: false, error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Для совместимости с GET запросом
  return GET(request);
}
