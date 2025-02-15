import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAuthToken } from "./lib/hooks/services";

type ProtectedRoutes = "/account";
type AuthRoutes = "/login" | "/register";

/**
 * Checks if the given pathname is an authentication route
 */
const isAuthRoute = (pathname: string): pathname is AuthRoutes => {
  return ["/login", "/register"].includes(pathname);
};

/**
 * Checks if the given pathname is a protected route
 */
const isProtectedRoute = (pathname: string): pathname is ProtectedRoutes => {
  return pathname === "/account";
};

/**
 * Middleware to handle authentication-based routing
 * - Authenticated users are redirected from auth routes to home
 * - Unauthenticated users are redirected to login when accessing protected routes
 */
export async function middleware(request: NextRequest) {
  const authToken = await getAuthToken();
  const { pathname } = request.nextUrl;

  if (authToken && isAuthRoute(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!authToken && isProtectedRoute(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/account"],
};
