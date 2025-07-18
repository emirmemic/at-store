'use client';

import { useTranslations } from 'next-intl';

import { useCartProvider } from '@/app/providers';
import { IconClose, IconHeart } from '@/components/icons';
import { UserAvatar } from '@/components/nav-bar/components';
import { IconCart, IconSearch } from '@/components/nav-bar/icons';
import { Button } from '@/components/ui/button';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils/utils';

interface MobileActionsProps {
  className?: string;
  toggleSearch: () => void;
  closeMenu: () => void;
}
export default function MobileActions({
  className,
  toggleSearch,
  closeMenu,
}: MobileActionsProps) {
  const t = useTranslations('navbar');

  const buttonClasses = 'group flex items-center justify-center p-1';
  const iconClasses = 'group-hover:text-grey-medium';

  const { cart } = useCartProvider();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Button
        aria-label="Close menu"
        className="ml-auto p-1 text-black"
        color="white"
        onClick={closeMenu}
      >
        <IconClose className="font-thin" size={28} />
      </Button>
      <div className="mt-10 flex items-center justify-between text-black">
        <UserAvatar closeMenu={closeMenu} />
        <div className="flex gap-3">
          <Link
            aria-label={t('favorites')}
            className={buttonClasses}
            href={PAGE_NAMES.ACCOUNT_FAVORITES}
            title={t('favorites')}
            onClick={closeMenu}
          >
            <IconHeart className={iconClasses} size={18} />
          </Link>
          <Link
            aria-label={t('cart')}
            className={buttonClasses}
            href={PAGE_NAMES.CART}
            title={t('cart')}
            onClick={closeMenu}
          >
            <IconCart
              className={iconClasses}
              itemsInCart={cartCount}
              size={18}
            />
          </Link>
          <Button
            aria-label={t('search')}
            className={buttonClasses}
            title={t('search')}
            onClick={toggleSearch}
          >
            <IconSearch className={iconClasses} size={18} />
          </Button>
        </div>
      </div>
      <div className="h-[0.5px] w-full bg-grey-darker"></div>
    </div>
  );
}
