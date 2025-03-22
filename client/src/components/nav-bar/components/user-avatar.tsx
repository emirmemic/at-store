import { useTranslations } from 'next-intl';
import React from 'react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { UserInformation } from '@/lib/types/auth';

interface UserAvatarProps {
  user: UserInformation | null;
}

export default function UserAvatar({ user }: UserAvatarProps) {
  const t = useTranslations('navbar');
  const initials = user ? user.username[0].toUpperCase() : t('guest');
  return (
    <div className="flex">
      <p className="paragraph-5">{t('hi')},</p>
      <Avatar>
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    </div>
  );
}
