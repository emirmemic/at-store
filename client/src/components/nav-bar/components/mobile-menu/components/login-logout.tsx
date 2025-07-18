'use client';

import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import { UserContext } from '@/app/providers';
import { LogoutButton } from '@/components/auth';
import { IconLoader, IconLogout } from '@/components/icons';
import { IconAccount } from '@/components/nav-bar/icons';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils/utils';

interface PropsType {
  closeMenu: () => void;
}
export default function MobileLoginLogout({ closeMenu }: PropsType) {
  const t = useTranslations();
  const user = useContext(UserContext).user;

  const buttonClasses =
    'group mx-auto flex w-full items-center justify-start gap-2 transition-colors duration-300 text-2xl font-thin text-black hover:text-grey-medium w-full mt-10';
  const iconClasses =
    'text-black transition-colors duration-300 group-hover:text-grey-medium';
  return (
    <>
      <div className="h-[0.5px] w-full bg-grey-darker"></div>
      {user ? (
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
                    {t('login.loggingOut')}
                    <IconLoader className={iconClasses} size={16} />
                  </>
                ) : (
                  <>
                    {t('login.logout')}
                    <IconLogout className={iconClasses} size={16} />
                  </>
                )}
              </span>
              {error && <span className="paragraph-2">{error}</span>}
            </>
          )}
        </LogoutButton>
      ) : (
        <Link
          className={buttonClasses}
          href={PAGE_NAMES.LOGIN}
          onClick={closeMenu}
        >
          {t('login.login')}
          <IconAccount className={iconClasses} size={16} />
        </Link>
      )}
    </>
  );
}
