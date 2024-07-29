import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  if (req.method !== 'GET') return NextResponse.next();
  let token = req.cookies.get('token');
  console.log(token);

  if (req.cookies.has('token')) {
    const loginUrl = new URL('/api/auth/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

}

export const config = {
  matcher: '/protected/:path*',
}