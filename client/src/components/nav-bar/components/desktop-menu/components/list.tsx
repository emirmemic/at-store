'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';

import { DesktopPopup } from '@/components/nav-bar/components';
import { PopupType } from '@/components/nav-bar/types';
import { StrapiImage } from '@/components/strapi/components';
import useClickOutside from '@/lib/hooks/use-onclick-outside';
import { NavMenuItem } from '@/lib/types';

interface DesktopListProps {
  menuItems: NavMenuItem[];
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
  const [activeMenu, setActiveMenu] = useState<NavMenuItem | null>(null);
  const outsideRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (menuItem: NavMenuItem) => {
    if (menuItem.subCategories && menuItem.subCategories.length > 0) {
      setActiveMenu(menuItem);
      setActivePopup('menu');
    } else {
      setActiveMenu(null);
      setActivePopup('none');
    }
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
    setActivePopup('none');
  };
  useClickOutside(outsideRef, handleMouseLeave);

  return (
    <>
      <ul className="flex h-full items-center gap-1 lg:gap-4">
        {menuItems.map((menuItem) => (
          <li key={menuItem.id} className="h-full">
            <Link
              className="flex h-full items-center px-2 text-white transition-colors duration-300 navigation hover:text-grey-medium lg:px-4 lg:paragraph-2"
              href={menuItem.link}
              onMouseEnter={() => handleMouseEnter(menuItem)}
              {...props}
            >
              {menuItem.displayName || menuItem.name}
            </Link>
          </li>
        ))}
      </ul>

      <DesktopPopup isActive={activePopup === 'menu'}>
        <div className="w-full pb-12" onMouseLeave={handleMouseLeave}>
          <div
            ref={outsideRef}
            className="shadow-large-black mx-auto flex w-fit gap-2 rounded-2xl bg-white px-6 py-3"
          >
            <ul className="flex h-full flex-wrap gap-11">
              {activeMenu?.subCategories?.map((sub) => (
                <li key={sub.id}>
                  <Link
                    className="flex flex-col items-center gap-2 transition-colors duration-300 paragraph-4 hover:text-grey-medium active:scale-95"
                    href={sub.link}
                    onClick={() => setActivePopup('none')}
                  >
                    <span className="h-12 w-12 overflow-hidden">
                      {sub.navbarIcon && (
                        <StrapiImage
                          alt={
                            sub.navbarIcon.alternativeText || sub.displayName
                          }
                          className="h-full w-full object-contain"
                          height={48}
                          src={sub.navbarIcon.url}
                          width={48}
                        />
                      )}
                    </span>
                    {sub.displayName || sub.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DesktopPopup>
    </>
  );
}
