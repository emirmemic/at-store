'use client';
import { useTranslations } from 'next-intl';

import { StrapiImage } from '@/components/strapi-image';
import { Button, TransparentVariant } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ProductProps } from '@/lib/types';
import { cn } from '@/lib/utils/utils';

type TextColor = 'white' | 'black';
export interface PromoCardProps {
  id: number;
  caption: string;
  product: ProductProps;
  learnMoreVariant: TransparentVariant;
  textColor: TextColor;
}
export default function PromoCard(promoCard: Readonly<PromoCardProps>) {
  const t = useTranslations('common');

  const { caption, product, learnMoreVariant, textColor } = promoCard;
  const { image, name } = product;

  return (
    <>
      <div className="relative w-full">
        <StrapiImage
          alt={image.alternativeText}
          className="aspect-[4/3] min-h-[13.75rem] w-full min-w-[18.75rem] rounded-2xl object-cover shadow-large-black"
          height={474}
          sizes="(max-width: 48rem) 25.875rem, (max-width: 64rem) 25rem, 37.5rem"
          src={image.url}
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
    </>
  );
}

interface LearnMoreDialogProps {
  product: ProductProps;
  learnMoreVariant: TransparentVariant;
}

function LearnMoreDialog({ product, learnMoreVariant }: LearnMoreDialogProps) {
  const t = useTranslations('common');

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
          {t('learnMore')}
        </Button>
      </DialogTrigger>
      <DialogContent className="px-8 py-16 md:px-6 md:py-16 lg:px-14">
        <div className="flex flex-col items-center justify-center gap-5 md:gap-16">
          <DialogTitle>{product.name}</DialogTitle>
          <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:justify-between md:gap-12">
            <StrapiImage
              alt={product.image.alternativeText}
              className="h-[19.375rem] w-[15rem] rounded-md object-cover md:h-[31.25rem] md:w-[21rem] lg:w-[25rem]"
              height={500}
              sizes="(max-width: 48rem) 15rem, (max-width: 64rem) 21rem, 25rem"
              src={product.image.url}
              width={400}
            />
            <p className="heading-4 md:heading-3 lg:heading-2">
              {product.description}
            </p>
          </div>
          <Button size={'lg'} typography={'button1'} variant="filled">
            {t('buyNow')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
