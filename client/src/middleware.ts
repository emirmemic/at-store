import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';
import { getAuthToken } from './lib/services';

const AUTH_ROUTES = [
  '/en/login',
  '/en/register',
  '/prijava',
  '/registracija',
  '/forgot-password',
  '/reset-password',
  '/login-or-guest',
  '/prijava-ili-gost',
] as const;

type AuthRoutes = (typeof AUTH_ROUTES)[number];

/**
 * Route prefixes that require authentication.
 * These are routes where any path starting with these prefixes will be protected.
 * Example: '/racun' will match '/racun', '/racun/podaci', etc.
 */
const PROTECTED_PREFIXES = ['/racun'] as const;

/**
 * Checks if the given pathname is an authentication route
 */
const isAuthRoute = (pathname: string): pathname is AuthRoutes =>
  AUTH_ROUTES.includes(pathname as AuthRoutes);

/**
 * Checks if the given pathname is a protected route
 */
const isProtectedRoute = (pathname: string): boolean =>
  PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));

/**
 * Middleware to handle internationalized routing
 */
const intlMiddleware = createMiddleware(routing);

/**
 * Middleware to handle authentication-based routing
 * - Authenticated users are redirected from auth routes to home
 * - Unauthenticated users are redirected to login when accessing protected routes
 */
export async function middleware(request: NextRequest) {
  const authToken = await getAuthToken();
  const { pathname } = request.nextUrl;

  // Get the locale using next-intl (defaults to Bosnian)
  const locale = request.headers.get('x-next-intl-locale') || 'bs';

  // Determine the correct login route based on detected locale
  const localizedLoginPath = locale === 'en' ? '/en/login' : '/prijava';

  // Normalize pathname (remove trailing slash) /en/login/ -> /en/login
  const normalizedPathname = pathname.replace(/\/$/, '') || '/';

  // Redirect authenticated users from auth routes to home
  if (authToken && isAuthRoute(normalizedPathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!authToken && isProtectedRoute(normalizedPathname)) {
    return NextResponse.redirect(new URL(localizedLoginPath, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  /**
   * Middleware matcher configuration.
   *
   * This setup is required due to the `as-needed` locale strategy in next-intl.
   * It ensures middleware is applied correctly while avoiding unnecessary execution on:
   * - API routes (`/api/*`)
   * - Next.js internals (`/_next/*`, `/_vercel/*`)
   * - Static files (e.g., `.ico`, `.png`, `.js`), which may cause performance issues.
   *
   * The goal is to:
   * - Allow the default locale (Bosnian) to remain unprefixed.
   * - Ensure English-prefixed routes (`/en/...`) are processed properly.
   *
   * This keeps routing clean while preventing middleware interference with critical Next.js functionalities.
   * For more information, see: https://next-intl.dev/docs/routing/middleware#matcher-no-prefix
   */
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)', // Catch-all for valid routes, while skipping excluded paths
  ],
};
