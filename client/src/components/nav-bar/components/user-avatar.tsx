'use client';
import { useTranslations } from 'next-intl';
import { useContext, useEffect, useState } from 'react';

import { UserContext } from '@/app/providers';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Link } from '@/i18n/routing';

export default function UserAvatar() {
  const t = useTranslations('common');
  const user = useContext(UserContext).user;
  const initials = user ? user.username[0].toUpperCase() : t('guest');
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
    <Link className="flex" href={isMobile ? '/account' : '/account/dashboard'}>
      <p className="paragraph-5">{t('hi')},</p>
      <Avatar>
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    </Link>
  );
}
