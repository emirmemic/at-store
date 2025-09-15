'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { StrapiBlocks, StrapiImage } from '../strapi/components';

import { BlocksContent } from '@strapi/blocks-react-renderer';
import { Button } from '@/components/ui/button';
import { IconChevron } from '@/components/icons';
import { ImageProps } from '@/lib/types';
import Price from '@/components/ui/price';
import { cn } from '@/lib/utils/utils';
import { useTranslations } from 'next-intl';

interface ProductDetailsPopupProps {
  name: string;
  details: BlocksContent;
  finalPrice: number;
  image?: ImageProps | null;
  className?: string;
  shouldDisplayPreOrder?: boolean;
}

export default function ProductDetailsPopup({
  className,
  details,
  finalPrice,
  name,
  image,
  shouldDisplayPreOrder = false,
}: ProductDetailsPopupProps) {
  const t = useTranslations('');
  return (
    <div className="flex w-full flex-col items-start gap-2">
      {details && (
        <StrapiBlocks className="line-clamp-3 paragraph-2" content={details} />
      )}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="text-blue paragraph-2">
            {t('common.viewDetails')}
            <IconChevron className="-rotate-90" size={12} />
          </Button>
        </DialogTrigger>

        <DialogContent className="my-auto flex w-[90%] max-w-[1000px] items-center justify-center">
          <DialogTitle className="sr-only">
            {t('common.viewDetailsWithName', { productName: name })}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {t('common.viewDetailsWithName', { productName: name })}
          </DialogDescription>
          <div
            className={cn(
              'overflow-hidden rounded-2xl bg-white shadow-slider-drop-shadow',
              className
            )}
          >
            <div className="mt-8 flex max-h-[70vh] w-full flex-col items-center gap-8 overflow-y-auto p-6 custom-scrollbar">
              <div className="flex w-full items-center gap-9 pr-16">
                <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-grey-almost-white">
                  {image && (
                    <StrapiImage
                      alt={image?.alternativeText || name}
                      className="h-full w-full object-contain"
                      height={112}
                      src={image?.url ?? ''}
                      width={112}
                    />
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-grey-darker paragraph-1">{name}</p>
                  {shouldDisplayPreOrder === false ? (
                    <Price className="heading-4" value={finalPrice} />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              {details && <StrapiBlocks content={details} />}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
