import Link from 'next/link';
import React from 'react';

import { IconChevron } from '@/components/icons';
import { NavMenuItem, NavSubLinkItem } from '@/components/nav-bar/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/utils';

interface MobileMenuProps {
  menuItems: NavMenuItem[];
  className?: string;
  onClickMenuItem: (item: NavSubLinkItem[]) => void;
  closeMenu: () => void;
}

export default function MobileList({
  menuItems,
  className,
  onClickMenuItem,
  closeMenu,
}: MobileMenuProps) {
  const buttonClasses =
    'group flex w-full items-center justify-between gap-4 py-1 transition-all paragraph-1 hover:text-grey-medium active:scale-95';
  return (
    <div className={cn('flex flex-col items-center gap-1', className)}>
      {menuItems.map((item) => (
        <React.Fragment key={item.id}>
          {item.subLinks ? (
            <Button
              className={buttonClasses}
              onClick={() => onClickMenuItem(item.subLinks || [])}
            >
              <span className="grow text-center">{item.label}</span>
              <IconChevron
                className="-rotate-90 opacity-0 transition-all group-hover:text-grey-medium group-hover:opacity-100"
                size={20}
              />
            </Button>
          ) : (
            <Link
              className={buttonClasses}
              href={item.href}
              onClick={closeMenu}
            >
              <span className="grow text-center">{item.label}</span>
              <span className="w-5"></span>
            </Link>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
