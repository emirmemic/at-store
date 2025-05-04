'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { StrapiImage } from '@/components/strapi/components/strapi-image';
import { Button, TransparentVariant } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ProductResponse } from '@/lib/types';
import { cn } from '@/lib/utils/utils';

import { PromoCardItem } from './types';

export default function PromoCard(promoCard: Readonly<PromoCardItem>) {
  const t = useTranslations('common');

  const { caption, product, learnMoreVariant, textColor, image } = promoCard;
  if (product === null) return null;
  const { name } = product;

  return (
    <div className="relative w-full">
      <div className="shadow-large-black aspect-[4/3] min-h-[13.75rem] w-full min-w-[18.75rem] rounded-2xl object-cover">
        <StrapiImage
          priority
          alt={image?.alternativeText || name}
          className="h-full w-full rounded-2xl object-cover"
          height={474}
          sizes="100vw"
          src={image?.url ?? ''}
          width={600}
        />
      </div>
      <div
        className={cn(
          'absolute inset-0 top-8 p-2 text-center',
          textColor === 'black' ? 'text-black' : 'text-white'
        )}
      >
        <h3 className="heading-4 lg:heading-3">{name}</h3>
        <p className="heading-5 lg:heading-4">{caption}</p>
        <LearnMoreDialog
          learnMoreVariant={learnMoreVariant}
          product={product}
        />
        <Button asChild size={'md'} typography={'button2'} variant={'filled'}>
          <Link href={product.productLink}>{t('buyNow')}</Link>
        </Button>
      </div>
    </div>
  );
}

interface LearnMoreDialogProps {
  product: ProductResponse;
  learnMoreVariant: TransparentVariant;
}

function LearnMoreDialog({ product, learnMoreVariant }: LearnMoreDialogProps) {
  const t = useTranslations();
  const image = product.images && product.images[0] ? product.images[0] : null;
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
        className="h-fit max-h-screen-h-cutoff w-full max-w-[90%] overflow-auto rounded-2xl border bg-background px-8 py-16 shadow-lg custom-scrollbar md:w-[90%] md:max-w-[970px] md:px-6 md:py-16 lg:px-14"
      >
        <div className="flex flex-col items-center justify-center gap-5 md:gap-16">
          <DialogTitle>{product.name}</DialogTitle>
          <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:justify-between md:gap-12">
            <StrapiImage
              alt={image?.alternativeText || product.name}
              className="h-full max-h-[310px] w-full max-w-[240px] rounded-md object-cover md:max-h-[500px] md:max-w-[336px] lg:max-h-[500px] lg:max-w-[400px]"
              height={500}
              sizes="(max-width: 48rem) 15rem, (max-width: 64rem) 21rem, 25rem"
              src={image?.url ?? ''}
              width={400}
            />
            <DialogDescription className="heading-4">
              {product.description}
            </DialogDescription>
          </div>
          <Button asChild size={'lg'} typography={'button1'} variant="filled">
            <Link href={product.productLink}>{t('common.buyNow')}</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
