'use client';

import { useContext, useEffect, useState } from 'react';

import { Link } from '@/i18n/routing';
import { PAGE_NAMES } from '@/i18n/page-names';
import { UserContext } from '@/app/providers';
import { useTranslations } from 'next-intl';

export default function UserAvatar({ closeMenu }: { closeMenu: () => void }) {
  const t = useTranslations();

  const user = useContext(UserContext).user;

  const initials = user?.accountDetails?.initials || t('common.guest');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 px-3 py-1 transition-colors hover:bg-gray-100">
      <Link
        href={isMobile ? PAGE_NAMES.ACCOUNT : PAGE_NAMES.ACCOUNT_DASHBOARD}
        onClick={closeMenu}
        className="flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
        </svg>
        <span className={isMobile ? 'paragraph-5' : 'paragraph-4'}>
          {initials}
        </span>
      </Link>
    </div>
  );
}
