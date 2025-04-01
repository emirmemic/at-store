'use client';
import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import { UserContext } from '@/app/providers';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import CardContainer from './card-container';

export default function NameCard({ className }: { className?: string }) {
  const t = useTranslations('common');

  const user = useContext(UserContext).user;
  const initials = user?.username[0].toUpperCase();

  return (
    <CardContainer
      className={`flex w-full items-center gap-6 px-6 py-9 lg:px-9 lg:py-12 ${className}`}
    >
      <Avatar>
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="flex w-full flex-col items-center justify-center text-center md:max-w-[200px]">
        <p className="bullet-1 md:paragraph-1">{`${t('hi')},`}</p>
        <p className="break-all bullet-heading-1 md:heading-4">
          {user?.username} Tanich
        </p>
      </div>
    </CardContainer>
  );
}
