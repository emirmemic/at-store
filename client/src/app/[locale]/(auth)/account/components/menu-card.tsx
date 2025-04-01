'use client';
import { useTranslations } from 'next-intl';

import { LogoutButton } from '@/components/auth';
import { IconLogout } from '@/components/icons';
import Loader from '@/components/ui/loader';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils/utils';

import { getMenuItems } from '../data';

import CardContainer from './card-container';

export default function MenuCard({ className }: { className?: string }) {
  const t = useTranslations();
  const pathName = usePathname();

  const buttonClasses =
    'group mx-auto flex items-center pt-4 gap-4 transition-colors duration-300 paragraph-1 hover:text-grey-medium';
  const iconClasses =
    'text-black transition-colors duration-300 group-hover:text-grey-medium';
  const menuItems = getMenuItems(t);
  return (
    <CardContainer
      className={cn(
        'flex flex-col gap-5 p-9',
        className,
        pathName !== PAGE_NAMES.ACCOUNT && 'hidden flex-col gap-5 p-9 md:flex'
      )}
    >
      {menuItems.map((item) => {
        const isActive = item.href === pathName;
        return (
          <Link
            key={item.id}
            className={cn(
              'flex gap-5 transition-all duration-300 hover:text-grey-medium',
              isActive ? 'heading-4' : 'paragraph-1'
            )}
            href={item.href}
          >
            <item.Icon size={30} />
            <span>{item.label}</span>
          </Link>
        );
      })}
      <LogoutButton className="mx-auto flex w-fit flex-col">
        {({ isLoading, error }) => (
          <>
            <span
              className={cn(buttonClasses, {
                'opacity-50': isLoading,
              })}
            >
              {isLoading ? (
                <>
                  <Loader className={iconClasses} size={30} />
                  {t('login.loggingOut')}
                </>
              ) : (
                <>
                  <IconLogout className={iconClasses} size={30} />
                  {t('login.logout')}
                </>
              )}
            </span>
            {error && <span className="paragraph-1">{error}</span>}
          </>
        )}
      </LogoutButton>
    </CardContainer>
  );
}
