'use client';
import { useTranslations } from 'next-intl';

import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils/utils';

import { getMenuItems } from '../data';

import CardContainer from './card-container';

export default function MenuCard({ className }: { className?: string }) {
  const t = useTranslations('accountPage');
  const pathName = usePathname();

  const menuItems = getMenuItems(t);
  return (
    <CardContainer
      className={cn(
        'flex flex-col gap-5 p-9',
        className,
        pathName !== '/account' && 'hidden flex-col gap-5 p-9 md:flex'
      )}
    >
      {menuItems.map((item) => {
        const isActive = item.href === pathName;
        return (
          <Link
            key={item.id}
            className={cn(
              'flex gap-5 transition-all duration-300 hover:text-grey-medium',
              isActive ? 'heading-4' : 'paragraph-1'
            )}
            href={item.href}
          >
            <item.Icon size={30} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </CardContainer>
  );
}
