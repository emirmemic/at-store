'use client';

import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import { UserContext } from '@/app/providers';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import CardContainer from './card-container';

export default function NameCard({ className }: { className?: string }) {
  const t = useTranslations('common');

  const { initials, name, surname, email } =
    useContext(UserContext).user?.accountDetails || {};

  return (
    <CardContainer
      className={`flex w-full items-center gap-4 px-4 py-6 md:px-5 md:py-7 lg:px-6 lg:py-9 ${className}`}
    >
      <Avatar>
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="flex w-full flex-col items-center justify-center text-center text-sm md:max-w-[200px] md:text-base">
        <p className="bullet-1 md:paragraph-1">{`${t('hi')},`}</p>
        <p className="break-all bullet-heading-2 md:heading-4">
          {name ? name + ` ${surname}` : email}
        </p>
      </div>
    </CardContainer>
  );
}
