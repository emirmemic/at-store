'use client';
import { useTranslations } from 'next-intl';

import { StrapiImage } from '@/components/strapi-image';
import { Button, TransparentVariant } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ProductBase } from '@/lib/types';
import { cn } from '@/lib/utils/utils';

type TextColor = 'white' | 'black';
export interface PromoCardProps {
  id: number;
  caption: string;
  product: ProductBase;
  learnMoreVariant: TransparentVariant;
  textColor: TextColor;
}
export default function PromoCard(promoCard: Readonly<PromoCardProps>) {
  const t = useTranslations('common');

  const { caption, product, learnMoreVariant, textColor } = promoCard;
  const { image, name } = product;

  return (
    <div className="relative w-full">
      <StrapiImage
        priority
        alt={image?.alternativeText || name}
        className="shadow-large-black aspect-[4/3] min-h-[13.75rem] w-full min-w-[18.75rem] rounded-2xl object-cover"
        height={474}
        sizes="(max-width: 48rem) 25.875rem, (max-width: 64rem) 25rem, 37.5rem"
        src={image?.url ?? ''}
        width={600}
      />
      <div
        className={cn(
          'absolute inset-0 top-8 p-2 text-center',
          textColor === 'black' ? 'text-black' : 'text-white'
        )}
      >
        <h2 className="heading-4 lg:heading-3">{name}</h2>
        <h3 className="heading-5 lg:heading-4">{caption}</h3>
        <LearnMoreDialog
          learnMoreVariant={learnMoreVariant}
          product={product}
        />
        <Button size={'md'} typography={'button2'} variant={'filled'}>
          {t('buyNow')}
        </Button>
      </div>
    </div>
  );
}

interface LearnMoreDialogProps {
  product: ProductBase;
  learnMoreVariant: TransparentVariant;
}

function LearnMoreDialog({ product, learnMoreVariant }: LearnMoreDialogProps) {
  const t = useTranslations();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="mr-6 mt-6 lg:mr-12 lg:mt-12"
          size={'md'}
          transparentVariant={learnMoreVariant}
          typography={'button2'}
          variant={'transparent'}
        >
          {t('common.learnMore')}
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={t('homepage.promoCard.dialogContentDescription')}
        className="h-fit max-h-[890px] w-full max-w-[90%] overflow-auto rounded-2xl border bg-background px-8 py-16 shadow-lg md:w-[90%] md:max-w-[970px] md:px-6 md:py-16 lg:px-14"
      >
        <div className="flex flex-col items-center justify-center gap-5 md:gap-16">
          <DialogTitle>{product.name}</DialogTitle>
          <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:justify-between md:gap-12">
            <StrapiImage
              alt={product.image?.alternativeText || product.name}
              className="h-full max-h-[310px] w-full max-w-[240px] rounded-md object-cover md:max-h-[500px] md:max-w-[336px] lg:max-h-[500px] lg:max-w-[400px]"
              height={500}
              sizes="(max-width: 48rem) 15rem, (max-width: 64rem) 21rem, 25rem"
              src={product.image?.url ?? ''}
              width={400}
            />
            <DialogDescription className="heading-4">
              {product.description}
            </DialogDescription>
          </div>
          <Button size={'lg'} typography={'button1'} variant="filled">
            {t('common.buyNow')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
