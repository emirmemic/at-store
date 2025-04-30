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

    if (!token) {
      return NextResponse.redirect(
        new URL('/?error=No access token provided', frontendUrl)
      );
    }

    const backendUrl = getStrapiURL();
    const path = `/api/auth/${provider}/callback`;

    const url = new URL(backendUrl + path);
    url.searchParams.append('access_token', token);

    const res = await fetch(url.href);

    const data = await res.json();

    if (data.error) {
      throw new Error(`Authentication failed: ${data.error.message}`);
    }

    if (!res.ok) {
      throw new Error(`Authentication failed: ${res.statusText}`);
    }

    const cookieStore = await cookies();
    cookieStore.set('jwt', data.jwt, config);

    return NextResponse.redirect(new URL('/', frontendUrl));
  } catch (error) {
    const errorMessage = encodeURIComponent(
      error instanceof Error ? error.message : 'Authentication failed'
    );

    return NextResponse.redirect(
      new URL(`/?error=${errorMessage}`, frontendUrl)
    );
  }
}
