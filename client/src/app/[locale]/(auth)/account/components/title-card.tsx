'use client';

import { IconChevron } from '@/components/icons';
import { Link } from '@/i18n/routing';
import { Icon } from '@/lib/types';

import { CardContainer } from '.';

export interface TitleCardProps {
  Icon: Icon;
  title: string;
}

export default function TitleCard({ Icon, title }: TitleCardProps) {
  return (
    <CardContainer className="flex items-center justify-between gap-6 px-5 py-9 md:justify-center md:px-0">
      <Link className="p-3 md:hidden" href={'/account'}>
        <IconChevron className="rotate-90" size={20} />
      </Link>
      <div className="flex w-[70%] items-center gap-4 md:w-auto">
        <Icon size={40} />
        <p className="bullet-heading-2 md:heading-3">{title}</p>
      </div>
    </CardContainer>
  );
}
