import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { STORE_NAMES } from '@/lib/constants';
import { cn } from '@/lib/utils/utils';

interface StoreSelectPopupProps {
  className?: string;
  onContinue: () => void;
  children: React.ReactNode;
  selectedStore?: string;
  onSelectStore: (store: string) => void;
}

export default function StoreSelectPopup({
  className,
  onContinue,
  children,
  selectedStore,
  onSelectStore,
}: StoreSelectPopupProps) {
  const t = useTranslations('common');
  const [open, setOpen] = useState(false);

  const handleContinue = () => {
    onContinue();
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[90%] max-w-lg">
        <DialogDescription className="sr-only">
          {t('chooseShop')}
        </DialogDescription>
        <DialogTitle className="sr-only">{t('chooseShop')}</DialogTitle>
        <div
          className={cn(
            'flex flex-col items-center gap-9 rounded-2xl border border-grey-darker bg-white p-6 pt-24 shadow-popup-black md:items-end md:p-9 md:pr-16 md:pt-9',
            className
          )}
        >
          <p className="w-full text-center heading-4 md:text-left md:heading-3">{`${t('chooseShop')}:`}</p>
          <div className="flex w-full flex-col gap-6">
            <RadioGroup
              defaultValue={selectedStore || STORE_NAMES[0]}
              onValueChange={onSelectStore}
            >
              {STORE_NAMES.map((store) => (
                <RadioGroupItem
                  key={store}
                  className="flex cursor-pointer items-center gap-4 paragraph-1"
                  id={store}
                  value={store}
                >
                  <span>{store}</span>
                </RadioGroupItem>
              ))}
            </RadioGroup>
          </div>
          <Button
            className="px-16"
            disabled={!selectedStore}
            size={'md'}
            variant={'filled'}
            onClick={handleContinue}
          >
            {t('continue')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
