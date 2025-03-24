'use client';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

import { IconClose } from '@/components/icons';
import {
  SiteLogo,
  SearchInput,
  AnimateHeight,
  AnimateSlots,
  MobileActions,
  MobileList,
  MobileLoginLogout,
} from'@/components/nav-bar/components'
import { IconMenu } from '@/components/nav-bar/icons';
import { NavMenu } from '@/components/nav-bar/types';
import { Button } from '@/components/ui/button';
import NavigationArrow from '@/components/ui/navigation-arrow';
import useClickOutside from '@/lib/hooks/use-onclick-outside';
import { UserInformation } from '@/lib/types';
import { cn } from '@/lib/utils/utils';

interface MobileMenuProps {
  menuItems: NavMenu[];
  className?: string;
  user: UserInformation | null;
  cartCount: number;
}

export default function MobileMenu({
  menuItems,
  className,
  user,
  cartCount,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const outsideRef = useRef<HTMLDivElement>(null);
  useClickOutside(outsideRef, () => setIsOpen(false));
  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };
  const closeSearch = () => {
    setIsSearchVisible(false);
  };

  const closeMenu = () => {
    if (isOpen) {
      setIsOpen(false);
      setIsSearchVisible(false);
    }
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
          onClick={() => setIsOpen(!isOpen)}
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
              user={user}
            />
            <AnimateSlots
              firstSlot={
                <div className="mb-6 flex items-center gap-2">
                  <NavigationArrow
                    aria-label={t('common.back')}
                    className="text-white"
                    direction={'left'}
                    size={'lg'}
                    title={t('common.back')}
                    type="button"
                    variant={'white'}
                    onClick={closeSearch}
                  />
                  <SearchInput placeholder={t('navbar.search')} />
                </div>
              }
              isFirstSlotVisible={isSearchVisible}
              secondSlot={
                <>
                  <MobileList
                    className="mb-6"
                    closeMenu={closeMenu}
                    menuItems={menuItems}
                  />
                  <MobileLoginLogout closeMenu={closeMenu} user={user} />
                </>
              }
            />
          </div>
        </AnimateHeight>
      </div>
    </div>
  );
}
