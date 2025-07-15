import Link from 'next/link';
import React from 'react';

import { IconChevron } from '@/components/icons';
import { NavMenuItem, NavSubMenuItem } from '@/components/nav-bar/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/utils';

interface MobileMenuProps {
  menuItems: NavMenuItem[];
  className?: string;
  onClickMenuItem: (item: NavSubMenuItem[]) => void;
  closeMenu: () => void;
}

export default function MobileList({
  menuItems,
  className,
  onClickMenuItem,
  closeMenu,
}: MobileMenuProps) {
  const buttonClasses =
    'group flex w-full items-center gap-4 py-1 transition-all paragraph-1 hover:text-grey-medium active:scale-95';
  return (
    <div className={cn('flex flex-col items-center gap-1', className)}>
      {menuItems.map((item) => (
        <React.Fragment key={item.id}>
          {item.subItems && item.subItems.length > 0 ? (
            <Button
              className={buttonClasses}
              onClick={() => onClickMenuItem(item.subItems || [])}
            >
              <span className="grow text-left text-black">
                {item.displayName}
              </span>

              <IconChevron
                className="ml-auto -rotate-90 text-black opacity-100 transition-all group-hover:text-grey-medium group-hover:opacity-100"
                size={16}
              />
            </Button>
          ) : (
            <div className="mt-8 w-full">
              <div className="h-[0.5px] w-full bg-grey-darker"></div>
              <Link
                className={buttonClasses + ' mt-5'}
                href={item.link}
                onClick={closeMenu}
              >
                <span className="grow text-left text-black">
                  {item.displayName}
                </span>
                <span className="w-5"></span>
              </Link>
              <span className="w-full text-left text-sm font-thin text-black">
                Podrška putem telefona je dostupna radnim danima u periodu od{' '}
                <span className="font-medium">09 do 17 sati.</span>
              </span>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
