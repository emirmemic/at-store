'use client';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

import { LogoutButton } from '@/components/auth';
import { IconClose, IconHeart } from '@/components/icons';
import { UserAvatar } from '@/components/nav-bar/components';
import { IconAccount, IconCart, IconLogout } from '@/components/nav-bar/icons';
import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/loader';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Link, Pathname } from '@/i18n/routing';
import useClickOutside from '@/lib/hooks/use-onclick-outside';
import { UserInformation } from '@/lib/types/auth';
import { cn } from '@/lib/utils/utils';

import AnimateHeight from './animate-height';
const iconClasses =
  'text-white transition-colors duration-300 group-hover:text-grey-medium';
const linkClasses =
  'group flex items-center gap-2 transition-colors duration-300 heading-5 hover:text-grey-medium';

interface DesktopAccountItemProps {
  icon: React.ElementType;
  title: string;
  href: Pathname;
  onClick: () => void;
}
const DesktopAccountItem = ({
  icon: Icon,
  title,
  href,
  onClick,
}: DesktopAccountItemProps) => {
  return (
    <li>
      <Link className={linkClasses} href={href} onClick={onClick}>
        <Icon className={iconClasses} />
        {title}
      </Link>
    </li>
  );
};

interface LoggedInAccountProps {
  user: UserInformation;
  closePopup: () => void;
  t: (key: string) => string;
}

const LoggedInAccount = ({ user, closePopup, t }: LoggedInAccountProps) => (
  <>
    <div className="item flex items-start justify-between gap-2 p-4">
      <UserAvatar user={user} />
      <Button
        aria-label={t('navbar.closeMenu')}
        className="group p-1"
        title={t('navbar.closeMenu')}
        onClick={closePopup}
      >
        <IconClose className="text-white transition-colors duration-300 group-hover:text-grey-medium" />
      </Button>
    </div>
    <div className="h-0.5 w-full bg-grey-darker"></div>
    <ul className="flex flex-col gap-3 px-4 pb-9 pt-6">
      <DesktopAccountItem
        href={PAGE_NAMES.ACCOUNT}
        icon={IconAccount}
        title={t('navbar.account')}
        onClick={closePopup}
      />
      <DesktopAccountItem
        href={PAGE_NAMES.CART}
        icon={IconCart}
        title={t('navbar.cart')}
        onClick={closePopup}
      />
      <DesktopAccountItem
        href={PAGE_NAMES.FAVORITES}
        icon={IconHeart}
        title={t('navbar.favorites')}
        onClick={closePopup}
      />

      <li>
        <LogoutButton className="flex flex-col">
          {({ isLoading, error }) => (
            <>
              <span
                className={cn(linkClasses, {
                  'opacity-50': isLoading,
                })}
              >
                {isLoading ? (
                  <>
                    <Loader className={iconClasses} size={24} />
                    {t('login.loggingOut')}
                  </>
                ) : (
                  <>
                    <IconLogout className={iconClasses} size={24} />
                    {t('login.logout')}
                  </>
                )}
              </span>
              {error && <span className="paragraph-2">{error}</span>}
            </>
          )}
        </LogoutButton>
      </li>
    </ul>
  </>
);
interface LoggedOutAccountProps {
  setIsOpen: (isOpen: boolean) => void;
  t: (key: string) => string;
}

const LoggedOutAccount = ({ setIsOpen, t }: LoggedOutAccountProps) => (
  <div className="flex flex-col items-center gap-6 p-4">
    <p className="paragraph-2">{t('navbar.notLoggedIn')}</p>
    <Button
      asChild
      size="md"
      title={t('login.login')}
      typography="button2"
      variant="filled"
    >
      <Link href={PAGE_NAMES.LOGIN} onClick={() => setIsOpen(false)}>
        {t('login.login')}
      </Link>
    </Button>
  </div>
);

interface DesktopAccountProps {
  user: UserInformation | null;
}
export default function DesktopAccount({ user }: DesktopAccountProps) {
  const t = useTranslations('');
  const [isOpen, setIsOpen] = useState(false);
  const closePopup = () => setIsOpen(false);
  const togglePopup = () => setIsOpen(!isOpen);
  const outsideRef = useRef<HTMLDivElement>(null);
  useClickOutside(outsideRef, closePopup);

  return (
    <div ref={outsideRef} className="flex items-center gap-2 text-white">
      <button
        className="group h-full p-1 text-white"
        title={t('navbar.account')}
        type="button"
        onClick={togglePopup}
      >
        <span className="sr-only">{t('navbar.account')}</span>
        <IconAccount className="transition-colors duration-300 group-hover:text-grey-medium" />
      </button>
      <AnimateHeight
        className="fixed right-0 top-nav-height w-72 rounded-l-2xl bg-black"
        isVisible={isOpen}
      >
        {user ? (
          <LoggedInAccount closePopup={closePopup} t={t} user={user} />
        ) : (
          <LoggedOutAccount setIsOpen={setIsOpen} t={t} />
        )}
      </AnimateHeight>
    </div>
  );
}
