'use server';
import { cookies } from 'next/headers';
// eslint-disable-next-line no-restricted-imports
import { redirect } from 'next/navigation';

import { PAGE_NAMES } from '@/i18n/page-names';

export async function deleteCookie(cookieName: string) {
  (await cookies()).delete(cookieName);
}
const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: '/',
  domain: (process.env.HOST ?? 'localhost').replace(/^\./, ''),
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
};

export async function createJwtCookie(cookieValue: string) {
  (await cookies()).set('jwt', cookieValue, config);
}

export async function redirectToHomePage() {
  redirect(PAGE_NAMES.HOME);
}
