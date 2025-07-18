'use client';

import { CURRENCY, MINIMUM_AMOUNT_FREE_DELIVERY } from '@/lib/constants';
import { DesktopInfoCard, DesktopPopup } from '@/components/nav-bar/components';
import { NavMenuItem, PopupType } from '@/components/nav-bar/types';
import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { StrapiImage } from '@/components/strapi/components';
import { cn } from '@/lib/utils/utils';
import useClickOutside from '@/lib/hooks/use-onclick-outside';
import { useTranslations } from 'next-intl';

interface DesktopListProps {
  menuItem: NavMenuItem;
  className?: string;
  activePopup: PopupType;
  setActivePopup: (popup: PopupType) => void;
}

export default function ListItem({
  menuItem,
  activePopup,
  setActivePopup,
}: DesktopListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const outsideRef = useRef<HTMLDivElement>(null);
  const excludeRef = useRef<HTMLLIElement>(null);
  const [isActive, setIsActive] = useState(false);
  const t = useTranslations('navbar');

  const handleOutsideClick = () => {
    setIsOpen(false);
    setActivePopup('none');
  };
  useClickOutside(outsideRef, handleOutsideClick, [excludeRef]);

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      setActivePopup('menu');
    } else {
      setIsOpen(false);
      setActivePopup('none');
    }
  };
  useEffect(() => {
    if (activePopup === 'menu' && isOpen) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [activePopup, isOpen]);
  return (
    <>
      <li
        key={menuItem.id}
        ref={excludeRef}
        className={cn('h-full transition duration-300', {
          'w-fit bg-grey-light': isOpen,
        })}
      >
        {menuItem.subItems && menuItem.subItems.length > 0 ? (
          <button
            className="lg:text-md flex h-full items-center px-2 text-black transition-colors duration-300 navigation hover:bg-white lg:px-4"
            onClick={handleClick}
          >
            {menuItem.displayName || menuItem.name}
          </button>
        ) : (
          <Link
            className="lg:text-md flex h-full items-center px-2 text-black transition-colors duration-300 navigation hover:bg-white lg:px-4"
            href={menuItem.link}
            onClick={handleOutsideClick}
          >
            {menuItem.displayName || menuItem.name}
          </Link>
        )}
      </li>
      <DesktopPopup className="px-12" isActive={isActive}>
        <div
          ref={outsideRef}
          className="shadow-large-black mx-auto flex w-fit flex-col gap-2 rounded-2xl bg-white px-6 py-3"
        >
          <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {menuItem?.subItems?.map((sub) => (
              <li key={sub.id}>
                <Link
                  className="hover:text-grey-white flex flex-col items-center gap-2 transition-colors duration-300 paragraph-4 active:scale-95"
                  href={sub.link}
                  onClick={handleOutsideClick}
                >
                  <span className="h-24 w-24 overflow-hidden">
                    {sub.icon && (
                      <StrapiImage
                        alt={sub.icon.alternativeText || sub.displayName}
                        className="h-full w-full object-contain"
                        height={64}
                        loading="lazy"
                        sizes="640px"
                        src={sub.icon.url}
                        width={128}
                      />
                    )}
                  </span>
                  {sub.displayName}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 w-full rounded-xl border border-grey-light bg-grey-almost-white p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <DesktopInfoCard
                description={t('infoCards.payInInstallmentsDescription')}
                icon={'💳'}
                title={t('infoCards.payInInstallmentsTitle')}
              />
              <DesktopInfoCard
                description={t('infoCards.eduDiscountDescription')}
                icon={'🎓'}
                title={t('infoCards.eduDiscountTitle')}
              />
              <DesktopInfoCard
                description={t('infoCards.mikrofinDescription')}
                icon={'🏦'}
                title={t('infoCards.mikrofinTitle')}
              />
              <DesktopInfoCard
                description={t('infoCards.deliveryDescription', {
                  currency: CURRENCY,
                  price: MINIMUM_AMOUNT_FREE_DELIVERY,
                })}
                icon={'📦'}
                title={t('infoCards.deliveryTitle')}
              />
            </div>
          </div>
        </div>
      </DesktopPopup>
    </>
  );
}
