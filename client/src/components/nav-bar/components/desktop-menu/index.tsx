'use client';

import {
  DesktopAccount,
  DesktopCart,
  DesktopList,
  DesktopSearch,
  SiteLogo,
} from '@/components/nav-bar/components';
import { NavMenuItem, PopupType } from '@/components/nav-bar/types';

import { cn } from '@/lib/utils/utils';
import { useState } from 'react';

interface DesktopMenuProps {
  menuItems: NavMenuItem[];
  className?: string;
}
export default function DesktopMenu({
  menuItems,
  className,
}: DesktopMenuProps) {
  const [activePopup, setActivePopup] = useState<PopupType>('none');
  return (
    <div
      className={cn(
        'relative flex grow items-center justify-between gap-4 bg-white/90 px-6 container-max-width-lg md:px-12',
        className
      )}
    >
      <SiteLogo />
      <DesktopList
        activePopup={activePopup}
        menuItems={menuItems}
        setActivePopup={setActivePopup}
      />
      <div className="flex h-full items-center gap-3">
        <DesktopSearch
          activePopup={activePopup}
          setActivePopup={setActivePopup}
        />
        <DesktopAccount />
        <DesktopCart />
      </div>
    </div>
  );
}
