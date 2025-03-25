'use client';
import { useTranslations } from 'next-intl';

import { IconHeart } from '@/components/icons';
import { UserAvatar } from '@/components/nav-bar/components';
import { IconCart, IconSearch } from '@/components/nav-bar/icons';
import { Button } from '@/components/ui/button';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Link } from '@/i18n/routing';
import { UserInformation } from '@/lib/types';
import { cn } from '@/lib/utils/utils';

interface MobileActionsProps {
  user: UserInformation | null;
  className?: string;
  toggleSearch: () => void;
  closeMenu: () => void;
  cartCount: number;
}
export default function MobileActions({
  user,
  className,
  toggleSearch,
  closeMenu,
  cartCount,
}: MobileActionsProps) {
  const t = useTranslations('navbar');

  const buttonClasses = 'group flex items-center justify-center p-1';
  const iconClasses = 'group-hover:text-grey-medium';

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex items-center justify-between">
        <UserAvatar user={user} />
        <div className="flex gap-3">
          <Link
            aria-label={t('favorites')}
            className={buttonClasses}
            href={PAGE_NAMES.FAVORITES}
            title={t('favorites')}
            onClick={closeMenu}
          >
            <IconHeart className={iconClasses} />
          </Link>
          <Link
            aria-label={t('cart')}
            className={buttonClasses}
            href={PAGE_NAMES.CART}
            title={t('cart')}
            onClick={closeMenu}
          >
            <IconCart className={iconClasses} itemsInCart={cartCount} />
          </Link>
          <Button
            aria-label={t('search')}
            className={buttonClasses}
            title={t('search')}
            onClick={toggleSearch}
          >
            <IconSearch className={iconClasses} />
          </Button>
        </div>
      </div>
      <div className="h-0.5 w-full bg-grey-darker"></div>
    </div>
  );
}
