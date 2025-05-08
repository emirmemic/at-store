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
  const [selectedMenuId, setSelectedMenuId] = useState<string | null>(null);
  const outsideRef = useRef<HTMLDivElement>(null);

  const handleMouseLeave = () => {
    setActiveMenu(null);
    setActivePopup('none');
    setSelectedMenuId(null);
  };
  useClickOutside(outsideRef, handleMouseLeave);

  const handleClick = (menuItem: NavMenuItem) => {
    if (menuItem.subCategories && menuItem.subCategories.length > 0) {
      setActiveMenu(menuItem);
      setActivePopup('menu');
      setSelectedMenuId(menuItem.id);
    } else {
      setActiveMenu(null);
      setActivePopup('none');
      setSelectedMenuId(null);
    }
  };

  return (
    <>
      <ul className="flex h-full items-center gap-1 lg:gap-4">
        {menuItems.map((menuItem) => (
          <li
            key={menuItem.id}
            className={`h-full transition duration-300 ${
              selectedMenuId === menuItem.id ? 'bg-grey-darkest' : ''
            }`}
          >
            {menuItem.subCategories && menuItem.subCategories.length > 0 ? (
              <button
                className="flex h-full items-center px-2 text-white transition-colors duration-300 navigation hover:bg-grey-darkest lg:px-4 lg:paragraph-2"
                onClick={() => handleClick(menuItem)}
                {...props}
              >
                {menuItem.displayName || menuItem.name}
              </button>
            ) : (
              <Link
                className="flex h-full items-center px-2 text-white transition-colors duration-300 navigation hover:bg-grey-darkest lg:px-4 lg:paragraph-2"
                href={menuItem.link}
                onClick={() => setActivePopup('none')}
                {...props}
              >
                {menuItem.displayName || menuItem.name}
              </Link>
            )}
          </li>
        ))}
      </ul>

      <DesktopPopup isActive={activePopup === 'menu'}>
        <div
          ref={outsideRef}
          className="shadow-large-black mx-auto flex w-fit flex-col gap-2 rounded-2xl bg-white px-6 py-3"
        >
          <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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
                        alt={sub.navbarIcon.alternativeText || sub.displayName}
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
          <div className="mt-10 w-full rounded-xl bg-gray-100 px-6 py-4 text-black">
            <div className="flex flex-row items-center justify-center gap-2">
              <div className="flex w-full max-w-2xl flex-col justify-center gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">💳</span>
                  <div>
                    <p className="font-bold">Plaćanje na rate</p>
                    <p className="text-sm text-grey-dark">
                      U AT Storeu možete kupovati uz mogućnost plaćanja
                      kreditnom ili shopping karticom do 36 rata.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-3xl">🎓</span>
                  <div>
                    <p className="font-bold">Obrazovni popust</p>
                    <p className="text-sm text-grey-dark">
                      Izaberi popust za studente i profesore kako bi mogao da
                      učiš bilo kad, bilo gdje.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex w-full max-w-2xl flex-col justify-center gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">🏦</span>
                  <div>
                    <p className="font-bold">Mikrofin kreditiranje</p>
                    <p className="text-sm text-grey-dark">
                      AT Store i Mikrofin kreditna organizacija Vam nude
                      mogućnost kupovine omiljenog Apple proizvoda na rate.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-3xl">📦</span>
                  <div>
                    <p className="font-bold">Dostava</p>
                    <p className="text-sm text-grey-dark">
                      Dostava besplatna za narudžbe preko 400 KM.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DesktopPopup>
    </>
  );
}
