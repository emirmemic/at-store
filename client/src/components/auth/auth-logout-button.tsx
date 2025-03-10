import { LogOut } from 'lucide-react';
import { cookies } from 'next/headers';
// eslint-disable-next-line no-restricted-imports
import { redirect } from 'next/navigation';

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: '/',
  domain: process.env.HOST ?? 'localhost',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
};

async function logoutAction() {
  'use server';
  const cookieStore = await cookies();
  cookieStore.set('jwt', '', { ...config, maxAge: 0 });
  redirect('/');
}

export function AuthLogoutButton() {
  return (
    <form action={logoutAction}>
      <button className="flex items-center gap-2" type="submit">
        <LogOut className="h-6 w-6" />
      </button>
    </form>
  );
}
