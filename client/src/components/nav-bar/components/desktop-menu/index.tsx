'use client';
import { useState } from 'react';

import {
  DesktopAccount,
  DesktopCart,
  DesktopList,
  DesktopSearch,
  SiteLogo,
} from '@/components/nav-bar/components';
import { PopupType } from '@/components/nav-bar/types';
import { NavMenuItem } from '@/lib/types';
import { cn } from '@/lib/utils/utils';

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
        'relative flex grow items-center justify-between gap-4 px-4 container-max-width-lg',
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
