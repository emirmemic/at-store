'use client';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

import { IconClose } from '@/components/icons';
import {
  SiteLogo,
  SearchInput,
  MobileActions,
  MobileList,
  MobileLoginLogout,
  MobileSubList,
} from '@/components/nav-bar/components';
import { IconMenu } from '@/components/nav-bar/icons';
import {
  NavMenuItem,
  MobileMenuType,
  NavSubLinkItem,
} from '@/components/nav-bar/types';
import { AnimateHeight, AnimateSlots } from '@/components/transitions';
import { Button } from '@/components/ui/button';
import NavigationArrow from '@/components/ui/navigation-arrow';
import { navMenu } from '@/data/dummy-data';
import useClickOutside from '@/lib/hooks/use-onclick-outside';
import { cn } from '@/lib/utils/utils';

interface MobileMenuProps {
  menuItems: NavMenuItem[];
  className?: string;
  cartCount: number;
}

export default function MobileMenu({
  menuItems,
  className,
  cartCount,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();
  const [activeMenu, setActiveMenu] = useState<MobileMenuType>('list');
  const [activeSubmenu, setActiveSubmenu] = useState<NavSubLinkItem[]>(
    navMenu[0].subLinks || []
  );
  const outsideRef = useRef<HTMLDivElement>(null);
  useClickOutside(outsideRef, () => setIsOpen(false));
  const toggleSearch = () => {
    setActiveMenu((prev) => (prev === 'search' ? 'list' : 'search'));
  };
  const backToList = () => {
    setActiveMenu('list');
  };
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    if (activeMenu !== 'list') {
      setActiveMenu('list');
    }
  };

  const closeMenu = () => {
    if (isOpen) {
      setIsOpen(false);
      setActiveMenu('list');
    }
  };
  const selectActiveSubmenu = (submenu: NavSubLinkItem[]) => {
    setActiveMenu('sub-list');
    setActiveSubmenu(submenu);
  };
  return (
    <div
      className={cn(
        'relative flex grow items-center justify-between gap-4 container-max-width',
        className
      )}
    >
      <SiteLogo />
      <div ref={outsideRef} className="flex items-center">
        <Button
          aria-expanded={isOpen}
          aria-label={isOpen ? t('navbar.closeMenu') : t('navbar.openMenu')}
          title={isOpen ? t('navbar.closeMenu') : t('navbar.openMenu')}
          onClick={toggleMenu}
        >
          {isOpen ? (
            <IconClose className="text-white" />
          ) : (
            <IconMenu className="text-white" />
          )}
        </Button>

        <AnimateHeight
          className="fixed left-0 top-nav-height z-50 w-full overflow-hidden bg-black text-white"
          isVisible={isOpen}
        >
          <div className="px-8 pb-6 pt-8">
            <MobileActions
              cartCount={cartCount}
              className="mb-6"
              closeMenu={closeMenu}
              toggleSearch={toggleSearch}
            />
            <AnimateSlots currentSlotKey={activeMenu}>
              {activeMenu === 'search' && (
                <div className="mb-6 flex items-center gap-2">
                  <NavigationArrow
                    aria-label={t('common.back')}
                    className="text-white"
                    direction={'left'}
                    size={'lg'}
                    title={t('common.back')}
                    type="button"
                    variant={'white'}
                    onClick={backToList}
                  />
                  <SearchInput placeholder={t('navbar.search')} />
                </div>
              )}
              {activeMenu === 'list' && (
                <>
                  <MobileList
                    className="mb-6"
                    closeMenu={closeMenu}
                    menuItems={menuItems}
                    onClickMenuItem={selectActiveSubmenu}
                  />
                  <MobileLoginLogout closeMenu={closeMenu} />
                </>
              )}
              {activeMenu === 'sub-list' && (
                <MobileSubList
                  className="mb-6"
                  closeMenu={closeMenu}
                  subMenuItems={activeSubmenu}
                  onBack={backToList}
                />
              )}
            </AnimateSlots>
          </div>
        </AnimateHeight>
      </div>
    </div>
  );
}
