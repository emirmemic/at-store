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
import { motion } from 'framer-motion';

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
          'w-fit rounded-xl bg-neutral-100': isOpen,
        })}
      >
        {menuItem.subItems && menuItem.subItems.length > 0 ? (
          <button
            className="lg:text-md flex h-full items-center rounded-xl px-2 text-black transition-colors duration-300 navigation hover:bg-gray-200 lg:px-4"
            onClick={handleClick}
          >
            {menuItem.displayName || menuItem.name}
          </button>
        ) : (
          <Link
            className="lg:text-md hover:gray-200 ronded-xl flex h-full items-center px-2 text-black transition-colors duration-300 navigation lg:px-4"
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
          className="border-white- mx-auto flex w-fit flex-col gap-1 rounded-3xl border-2 bg-white/90 px-6 py-3"
        >
          <motion.ul
            className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-12"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {menuItem?.subItems?.map((sub, index) => (
              <motion.li
                key={sub.id}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Link
                  className={`hover:text-grey-white flex flex-col items-center gap-2 pt-3 text-center text-[11px] transition-colors duration-300 active:scale-95 sm:text-xs md:text-sm ${
                    index === (menuItem.subItems?.length ?? 0) - 1
                      ? 'text-blue-500'
                      : ''
                  }`}
                  href={sub.link}
                  onClick={handleOutsideClick}
                >
                  <span className="h-12 w-24 overflow-hidden">
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
              </motion.li>
            ))}
          </motion.ul>
          <div className="mt-8 w-fit rounded-xl bg-white p-2">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              <Link href="nacini-placanja" onClick={handleOutsideClick}>
                <DesktopInfoCard
                  description={t('infoCards.payInInstallmentsDescription')}
                  icon={'💳'}
                  link="nacini-placanja"
                  title={t('infoCards.payInInstallmentsTitle')}
                />
              </Link>
              <Link href="obrazovni-popust" onClick={handleOutsideClick}>
                <DesktopInfoCard
                  description={t('infoCards.eduDiscountDescription')}
                  icon={'🎓'}
                  link="obrazovni-popust"
                  title={t('infoCards.eduDiscountTitle')}
                />
              </Link>
              <Link href="mikrofin-predracun" onClick={handleOutsideClick}>
                <DesktopInfoCard
                  description={t('infoCards.mikrofinDescription')}
                  icon={'🏦'}
                  link="mikrofin-predracun"
                  title={t('infoCards.mikrofinTitle')}
                />
              </Link>
              <Link href="dostava" onClick={handleOutsideClick}>
                <DesktopInfoCard
                  description={t('infoCards.deliveryDescription', {
                    currency: CURRENCY,
                    price: MINIMUM_AMOUNT_FREE_DELIVERY,
                  })}
                  icon={'📦'}
                  link="dostava"
                  title={t('infoCards.deliveryTitle')}
                />
              </Link>
            </div>
          </div>
        </div>
      </DesktopPopup>
    </>
  );
}
