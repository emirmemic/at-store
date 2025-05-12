'use client';
import { useTranslations } from 'next-intl';
import { useRef, useState, useEffect } from 'react';

import { IconClose } from '@/components/icons';
import {
  SiteLogo,
  MobileActions,
  MobileList,
  MobileLoginLogout,
  MobileSubList,
  SearchInput,
} from '@/components/nav-bar/components';
import { IconMenu } from '@/components/nav-bar/icons';
import {
  MobileMenuType,
  NavMenuItem,
  NavSubMenuItem,
} from '@/components/nav-bar/types';
import { AnimateHeight, AnimateSlots } from '@/components/transitions';
import { Button } from '@/components/ui/button';
import NavigationArrow from '@/components/ui/navigation-arrow';
import useClickOutside from '@/lib/hooks/use-onclick-outside';
import { cn } from '@/lib/utils/utils';

interface MobileMenuProps {
  menuItems: NavMenuItem[];
  className?: string;
}

export default function MobileMenu({ menuItems, className }: MobileMenuProps) {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MobileMenuType>('list');
  const [activeSubmenu, setActiveSubmenu] = useState<NavSubMenuItem[]>(
    menuItems.length > 0 && menuItems[0].subItems ? menuItems[0].subItems : []
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
  const selectActiveSubmenu = (submenu: NavSubMenuItem[]) => {
    setActiveMenu('sub-list');
    setActiveSubmenu(submenu);
  };
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
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
          <div className="max-h-screen-h-cutoff overflow-y-auto px-8 pb-6 pt-8 custom-scrollbar">
            <MobileActions
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
                  <SearchInput onClick={closeMenu} />
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
