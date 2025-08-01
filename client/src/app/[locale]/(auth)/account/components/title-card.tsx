'use client';

import { useTranslations } from 'next-intl';

import { IconChevron } from '@/components/icons';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Link } from '@/i18n/routing';
import { Icon } from '@/lib/types';

import CardContainer from './card-container';

export interface TitleCardProps {
  Icon: Icon;
  title: string;
}

export default function TitleCard({ Icon, title }: TitleCardProps) {
  const t = useTranslations('accountPage');
  return (
    <CardContainer className="flex items-center justify-between gap-4 px-4 py-6 md:justify-center md:gap-6 md:px-0 md:py-9">
      <Link className="p-3 md:hidden" href={PAGE_NAMES.ACCOUNT}>
        <IconChevron className="rotate-90" size={20} />
        <span className="sr-only">{t('title')}</span>
      </Link>
      <div className="flex w-[70%] items-center gap-4 md:w-auto">
        <Icon size={30} />
        <h1 className="text-lg sm:text-xl md:text-2xl lg:heading-3">{title}</h1>
      </div>
    </CardContainer>
  );
}
