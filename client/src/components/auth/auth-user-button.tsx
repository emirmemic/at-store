import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { UserInformationProps } from '@/lib/types/auth';

import LogoutButton from './logout-button';

export function AuthUserNavButton({ user }: Readonly<UserInformationProps>) {
  return (
    <div className="hidden items-center gap-2 md:flex">
      {user?.username}
      <Button asChild className="h-8 w-8 rounded-full">
        <Link className="cursor-pointer" href="/account">
          {user?.username ? user.username[0].toLocaleUpperCase() : 'A'}
        </Link>
      </Button>
      <LogoutButton />
    </div>
  );
}
