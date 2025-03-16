import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';

import { IconX } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { usePreventScroll } from '@/lib/hooks';

interface DialogProps {
  children: ReactNode;
  isOpen: boolean;
  showCloseButton?: boolean;
  onClose: () => void;
}

export function Dialog({
  children,
  isOpen,
  onClose,
  showCloseButton = true,
}: DialogProps) {
  usePreventScroll();
  const t = useTranslations();

  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px]"
      onClick={onClose}
    >
      <div
        className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400 relative h-[90vh] max-h-[890px] w-[90%] max-w-[970px] overflow-auto rounded-2xl bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <Button
            className="absolute right-4 top-4 border border-black border-current p-4"
            size={'sm'}
            title={t('navigation.dismissMessage')}
            type="button"
            onClick={onClose}
          >
            <span className="sr-only">{t('navigation.dismissMessage')}</span>
            <IconX />
          </Button>
        )}
        {children}
      </div>
    </div>
  );
}
