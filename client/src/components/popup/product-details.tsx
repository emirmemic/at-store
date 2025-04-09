import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { IconChevron } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CURRENCY } from '@/lib/constants';
import { ProductBase } from '@/lib/types';
import { cn } from '@/lib/utils/utils';

interface ProductDetailsPopupProps {
  product: ProductBase;
  className?: string;
}

export default function ProductDetailsPopup({
  product,
  className,
}: ProductDetailsPopupProps) {
  const t = useTranslations('');
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-grey-darker paragraph-2">
          {t('common.viewDetails')}
          <IconChevron className="-rotate-90" size={12} />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[90%] max-w-[1000px]">
        <DialogTitle className="sr-only">
          {t('common.viewDetailsWithName', { productName: product.name })}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {t('common.viewDetailsWithName', { productName: product.name })}
        </DialogDescription>
        <div
          className={cn(
            'overflow-hidden rounded-2xl bg-white shadow-slider-drop-shadow',
            className
          )}
        >
          <div className="flex max-h-screen-h-cutoff w-full flex-col items-center gap-8 overflow-y-auto p-6 custom-scrollbar">
            <div className="flex w-full items-center gap-9 pr-16">
              <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-grey-almost-white">
                <Image
                  alt={product.image?.alternativeText || product.name}
                  className="h-full w-full object-contain"
                  height={112}
                  src={product.image?.url ?? ''}
                  width={112}
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-grey-darker paragraph-1">{product.name}</p>
                <p className="heading-4">{`${product.final_price} ${CURRENCY}`}</p>
              </div>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: product.details || '' }}
              className="prose-h6:heading-6 prose w-full max-w-full prose-h3:heading-3 prose-h4:heading-4 prose-h5:heading-5 prose-p:paragraph-2 prose-a:text-blue"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
