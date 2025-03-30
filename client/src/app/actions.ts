'use server';

import { cookies } from 'next/headers';

export async function deleteCookie(cookieName: string) {
  (await cookies()).delete(cookieName);
}
const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: '/',
  domain: process.env.HOST ?? 'localhost',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
};

export async function createJwtCookie(cookieValue: string) {
  (await cookies()).set('jwt', cookieValue, config);
}
