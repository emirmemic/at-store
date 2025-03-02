import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { UserInformationProps } from '@/lib/types/auth';

import { AuthLogoutButton } from './auth-logout-button';

export function AuthUserNavButton({ user }: Readonly<UserInformationProps>) {
  return (
    <div className="hidden items-center gap-2 md:flex">
      {user?.username}
      <Button asChild className="h-8 w-8 rounded-full">
        <Link href="/account" className="cursor-pointer">
          {user?.username ? user.username[0].toLocaleUpperCase() : 'A'}
        </Link>
      </Button>
      <AuthLogoutButton />
    </div>
  );
}
