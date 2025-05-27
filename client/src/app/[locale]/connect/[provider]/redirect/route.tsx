import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { getStrapiURL } from '@/lib/utils/utils';

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: '/',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
};

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
  try {
    const { searchParams, pathname } = new URL(request.url);
    const token = searchParams.get('access_token');

    const pathParts = pathname.split('/').filter(Boolean);
    const provider = pathParts.length === 3 ? pathParts[1] : pathParts[2];
    const isApple = provider === 'apple';

    if (!token) {
      return NextResponse.redirect(
        new URL('/?error=No access token provided', frontendUrl)
      );
    }

    const backendUrl = getStrapiURL();
    const path = isApple
      ? `/api/users-permissions/connect/apple/callback`
      : `/api/auth/${provider}/callback`;

    const url = new URL(backendUrl + path);
    url.searchParams.append('access_token', token);

    let res;
    let data;
    // Use POST method for Apple sign in
    if (isApple) {
      const name = searchParams.get('name');
      const surname = searchParams.get('surname');

      const user = name
        ? {
            name: {
              firstName: name || '',
              lastName: surname || '',
            },
          }
        : null;
      res = await fetch(url.href, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken: token,
          ...(user && { user }),
        }),
      });
      data = await res.json();
    } else {
      res = await fetch(url.href);
      data = await res.json();
    }

    if (data.error) {
      throw new Error(`Authentication failed: ${data.error.message}`);
    }

    if (!res.ok) {
      throw new Error(`Authentication failed: ${res.statusText}`);
    }

    const cookieStore = await cookies();
    cookieStore.set('jwt', data.jwt, config);

    const response = NextResponse.redirect(
      new URL('/?success=true', frontendUrl),
      { status: 303 }
    );
    response.cookies.set('jwt', data.jwt, config);
    return response;
  } catch (error) {
    const errorMessage = encodeURIComponent(
      error instanceof Error ? error.message : 'Authentication failed'
    );

    return NextResponse.redirect(
      new URL(`/?error=${errorMessage}`, frontendUrl)
    );
  }
}
