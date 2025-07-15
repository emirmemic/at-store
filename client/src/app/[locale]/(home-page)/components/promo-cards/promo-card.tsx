'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { PromoCardItem } from './types';

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
import { makeProductLink } from '@/lib/utils/link-helpers';
import { cn } from '@/lib/utils/utils';

export default function PromoCard(promoCard: Readonly<PromoCardItem>) {
  const t = useTranslations('common');

  const { caption, product, learnMoreVariant, textColor, image, title } =
    promoCard;
  if (!product) {
    return null;
  }
  const { name, productLink, productTypeId, category } = product;
  const finalLink = makeProductLink(
    category?.link ?? '',
    productTypeId,
    productLink ?? ''
  );
  return (
    <div className="relative w-full">
      <div className="aspect-[4/3] min-h-[7.75rem] w-full min-w-[12.75rem] object-cover">
        <StrapiImage
          priority
          alt={image?.alternativeText || name}
          className="h-full w-full object-cover"
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
        <h3 className="heading-5 lg:heading-4">{title}</h3>
        <p className="heading-6 lg:heading-6">{caption}</p>
        <div className="flex flex-col items-center justify-center gap-2 py-8 sm:flex-row sm:gap-14">
          <LearnMoreDialog
            learnMoreVariant={learnMoreVariant}
            link={finalLink}
            product={product}
          />
          <Button
            asChild
            className="min-w-40"
            size={'md'}
            typography={'button2'}
            variant={'filled'}
          >
            <Link href={finalLink}>{t('buyNow')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

interface LearnMoreDialogProps {
  product: ProductResponse;
  learnMoreVariant: TransparentVariant;
  link: string;
}

function LearnMoreDialog({
  product,
  learnMoreVariant,
  link,
}: LearnMoreDialogProps) {
  const t = useTranslations();
  const image = product.images && product.images[0] ? product.images[0] : null;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="min-w-40"
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
              alt={image?.alternativeText || product.displayName}
              className="h-full max-h-[310px] w-full max-w-[240px] rounded-md object-cover md:max-h-[500px] md:max-w-[336px] lg:max-h-[500px] lg:max-w-[400px]"
              height={500}
              sizes="(max-width: 48rem) 15rem, (max-width: 64rem) 21rem, 25rem"
              src={image?.url ?? ''}
              width={400}
            />
            <DialogDescription className="bullet-2 md:bullet-1">
              {product.description}
            </DialogDescription>
          </div>
          <Button asChild size={'lg'} typography={'button1'} variant="filled">
            <Link href={link}>{t('common.buyNow')}</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
