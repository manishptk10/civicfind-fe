import { NextRequest, NextResponse } from 'next/server';
import { APP_ROUTES } from '@/constant/routes';
import { globalConfig } from './constant/global-config';

const PUBLIC_ROUTES = ['/auth', '/home', '/'];
const ADMIN_ROUTES = ['/user-management', '/role-management'];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Skip static files (images, fonts, etc.)
  if (pathname.match(/\.(.*)$/)) {
    return NextResponse.next();
  }

  // ✅ Skip Next internals & PWA files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/.well-known') ||
    pathname === '/favicon.ico' ||
    pathname === '/sw.js' ||
    pathname === '/manifest.webmanifest' ||
    pathname.startsWith('/icons')
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get(globalConfig.ACCESS_TOKEN)?.value;
  const role = req.cookies.get('role')?.value;

  const isPublicRoute = PUBLIC_ROUTES.some(
    (path) => pathname === path || pathname.startsWith(path + '/'),
  );

  const isAdminRoute = ADMIN_ROUTES.some((path) => pathname.startsWith(path));

  // 🔒 Not logged in → redirect to home
  if (!isPublicRoute && !token) {
    const homeUrl = new URL(APP_ROUTES.PUBLIC_ROUTES.HOME.path, req.url);
    homeUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(homeUrl);
  }

  // 🚫 Non-admin trying admin route
  if (isAdminRoute && token && role !== 'admin') {
    return NextResponse.redirect(new URL(APP_ROUTES.PROTECTED_ROUTES.DASHBOARD.path, req.url));
  }

  // 🔁 Logged-in user accessing public page
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL(APP_ROUTES.PROTECTED_ROUTES.DASHBOARD.path, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sw.js|manifest.webmanifest).*)'],
};
