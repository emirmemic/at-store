'use client';

import { useTranslations } from 'next-intl';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils/utils';

import { Button } from '../ui/button';

interface OutOfStockProps {
  className?: string;
  isOpen?: boolean;
  onOpenChange: (open: boolean) => void;
  outOfStockProducts?: string[];
}

export default function OutOfStockPopup({
  className,
  isOpen = false,
  onOpenChange,
  outOfStockProducts = [],
}: OutOfStockProps) {
  const t = useTranslations();
  // Prevent closing on outside click
  const preventClose = (event: Event) => {
    event.preventDefault();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[90%] max-w-lg"
        onInteractOutside={preventClose}
        onPointerDownOutside={preventClose}
      >
        <DialogDescription className="sr-only">
          {t('checkoutPage.paymentPage.outOfStockProducts')}
        </DialogDescription>
        <DialogTitle className="sr-only">
          {t('checkoutPage.paymentPage.outOfStock')}
        </DialogTitle>
        <div
          className={cn(
            'flex flex-col items-center gap-14 rounded-2xl border border-grey-darker bg-white p-9 pt-20 shadow-popup-black md:gap-9',
            className
          )}
        >
          <div className="flex flex-col gap-5">
            {outOfStockProducts && outOfStockProducts.length > 0 && (
              <>
                <p className="paragraph-1">
                  {t('checkoutPage.paymentPage.outOfStockProducts')}
                </p>
                <p className="bullet-heading-2">
                  {outOfStockProducts.join(', ')}
                </p>
              </>
            )}
            {!outOfStockProducts ||
              (outOfStockProducts.length === 0 && (
                <p className="paragraph-1">
                  {t('checkoutPage.paymentPage.outOfStock')}
                </p>
              ))}
          </div>
          <Button
            className="px-16"
            size={'md'}
            variant={'filled'}
            onClick={() => onOpenChange(false)}
          >
            {t('common.contactUs')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
