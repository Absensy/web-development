import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

export async function middleware(request: NextRequest) {
  // Проверяем только админ роуты
  if (request.nextUrl.pathname.startsWith('/admin')) {
    console.log('Middleware: checking admin route:', request.nextUrl.pathname);
    
    // Пропускаем страницу логина
    if (request.nextUrl.pathname === '/admin' || request.nextUrl.pathname === '/admin/') {
      console.log('Middleware: allowing login page');
      return NextResponse.next();
    }

    const token = request.cookies.get('admin-token')?.value;
    console.log('Middleware: token exists:', !!token);

    if (!token) {
      console.log('Middleware: no token, redirecting to login');
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      console.log('Middleware: token decoded successfully:', payload);
      
      if (!payload.admin) {
        console.log('Middleware: token is not admin, redirecting');
        return NextResponse.redirect(new URL('/admin', request.url));
      }

      console.log('Middleware: token valid, allowing access');
      return NextResponse.next();
    } catch (error) {
      console.log('Middleware: token verification failed:', error);
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
