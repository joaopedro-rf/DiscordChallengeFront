import { NextResponse, NextRequest } from 'next/server';

export async function middleware (req: NextRequest) {
  
  if (!req.cookies.has('token')) {
    const loginUrl = new URL('/api/auth/login', req.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: '/protected/:path*',
}