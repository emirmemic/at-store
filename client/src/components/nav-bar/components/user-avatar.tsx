'use client';
import { useTranslations } from 'next-intl';
import { useContext, useEffect, useState } from 'react';

import { UserContext } from '@/app/providers';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Link } from '@/i18n/routing';

export default function UserAvatar({ closeMenu }: { closeMenu: () => void }) {
  const t = useTranslations();

  const user = useContext(UserContext).user;

  const initials = user?.accountDetails?.initials || t('common.guest');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex">
      <p className="paragraph-5">{t('common.hi')},</p>
      <Link
        href={isMobile ? PAGE_NAMES.ACCOUNT : PAGE_NAMES.ACCOUNT_DASHBOARD}
        onClick={closeMenu}
      >
        <span className="sr-only">{t('navbar.account')}</span>
        <Avatar>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </Link>
    </div>
  );
}
