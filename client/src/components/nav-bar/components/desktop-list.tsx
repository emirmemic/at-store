'use client';
import Image from 'next/image';
import { useState } from 'react';

import { NavMenu, PopupType } from '@/components/nav-bar/types';
import { Link } from '@/i18n/routing';

import DesktopPopup from './desktop-popup';
interface DesktopListProps {
  menuItems: NavMenu[];
  className?: string;
  activePopup: PopupType;
  setActivePopup: (popup: PopupType) => void;
}

export default function DesktopList({
  menuItems,
  activePopup,
  setActivePopup,
  ...props
}: DesktopListProps) {
  const [activeMenu, setActiveMenu] = useState<NavMenu | null>(null);

  const handleMouseEnter = (menuItem: NavMenu) => {
    if (menuItem.subLinks) {
      setActiveMenu(menuItem);
      setActivePopup(PopupType.MENU);
    }
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
    setActivePopup(PopupType.NONE);
  };

  return (
    <div>
      <ul className="flex h-full items-center gap-1 lg:gap-4">
        {menuItems.map((menuItem) => (
          <li key={menuItem.id}>
            <Link
              className="flex h-full items-center px-2 text-white transition-colors duration-300 navigation hover:text-grey-medium lg:px-4 lg:paragraph-2"
              href={menuItem.href}
              onMouseEnter={() => handleMouseEnter(menuItem)}
              {...props}
            >
              {menuItem.label}
            </Link>
          </li>
        ))}
      </ul>

      <DesktopPopup isActive={activePopup === PopupType.MENU}>
        <div className="w-full pb-12" onMouseLeave={handleMouseLeave}>
          <div className="mx-auto flex w-fit gap-2 rounded-2xl bg-white px-6 py-3 shadow-large-black">
            <ul className="flex flex-wrap gap-11">
              {activeMenu?.subLinks?.map((sub) => (
                <li key={sub.id}>
                  <Link
                    className="flex flex-col items-center gap-2 transition-colors duration-300 paragraph-4 hover:text-grey-medium active:scale-95"
                    href={sub.href}
                  >
                    <span className="h-12 w-12 overflow-hidden">
                      <Image
                        alt={sub.label}
                        className="h-full w-full object-contain"
                        height={48}
                        src={sub.logo}
                        width={48}
                      />
                    </span>
                    {sub.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DesktopPopup>
    </div>
  );
}
