'use client';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

import { DesktopPopup, SearchInput } from '@/components/nav-bar/components';
import { IconSearch } from '@/components/nav-bar/icons';
import { PopupType } from '@/components/nav-bar/types';
import useClickOutside from '@/lib/hooks/use-onclick-outside';
interface DesktopSearchProps {
  activePopup: PopupType;
  setActivePopup: (popup: PopupType) => void;
}

export default function DesktopSearch({
  activePopup,
  setActivePopup,
}: DesktopSearchProps) {
  const t = useTranslations('navbar');
  const togglePopup = () => {
    setActivePopup(activePopup === 'search' ? 'none' : 'search');
  };

  const searchInputRef = useRef<HTMLDivElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  useClickOutside(searchInputRef, () => setActivePopup('none'), [
    searchButtonRef,
  ]);

  return (
    <div className="flex items-center gap-2 text-white">
      <button
        ref={searchButtonRef}
        className="group h-full p-1 text-white"
        title={t('search')}
        type="button"
        onClick={togglePopup}
      >
        <span className="sr-only">{t('search')}</span>
        <IconSearch
          className="transition-colors duration-300 group-hover:text-grey-medium"
          size={18}
        />
      </button>
      <DesktopPopup isActive={activePopup === 'search'}>
        <div className="w-full pb-12">
          <div ref={searchInputRef} className="mx-auto max-w-[600px]">
            <SearchInput
              onClick={() => {
                setActivePopup('none');
              }}
            />
          </div>
        </div>
      </DesktopPopup>
    </div>
  );
}
