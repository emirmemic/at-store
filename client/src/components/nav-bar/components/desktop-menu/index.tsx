'use client';
import { useState } from 'react';

import {
  SiteLogo,
  DesktopAccount,
  DesktopCart,
  DesktopList,
  DesktopSearch,
} from '@/components/nav-bar/components';
import { NavMenu, PopupType, CartItem } from '@/components/nav-bar/types';
import { UserInformation } from '@/lib/types';
import { cn } from '@/lib/utils/utils';

interface DesktopMenuProps {
  menuItems: NavMenu[];
  className?: string;
  user: UserInformation | null;
  cart: CartItem[];
}
export default function DesktopMenu({
  menuItems,
  className,
  user,
  cart,
}: DesktopMenuProps) {
  const [activePopup, setActivePopup] = useState<PopupType>('none');
  return (
    <div
      className={cn(
        'relative flex grow items-center justify-between gap-4 px-4',
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
        <DesktopAccount user={user} />
        <DesktopCart cart={cart} />
      </div>
    </div>
  );
}
