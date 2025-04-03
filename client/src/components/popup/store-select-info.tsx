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
import { cn } from '@/lib/utils/utils';

interface StoreSelectInfoProps {
  className?: string;
  message: string;
  onContinue: () => void;
  children?: React.ReactNode;
}

export default function StoreSelectInfo({
  className,
  message,
  onContinue,
  children,
}: StoreSelectInfoProps) {
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
        <DialogDescription className="sr-only">{message}</DialogDescription>
        <DialogTitle className="sr-only">{message}</DialogTitle>
        <div
          className={cn(
            'flex flex-col items-center gap-14 rounded-2xl border border-grey-darker bg-white p-9 pt-28 shadow-popup-black md:items-end md:gap-9',
            className
          )}
        >
          <p className="w-full text-center paragraph-1 md:text-left">
            {message}
          </p>
          <Button
            className="px-16"
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
