'use client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { StrapiImage } from '@/components/strapi-image';
import { Button, TransparentVariant } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { ProductProps } from '@/lib/types/base';

export interface PromoCardProps {
  id: number;
  caption: string;
  product: ProductProps;
  learnMoreVariant: TransparentVariant;
}

export default function PromoCard(promoCard: Readonly<PromoCardProps>) {
  const t = useTranslations('common');

  const { caption, product, learnMoreVariant } = promoCard;
  const { image, name } = product;

  const [isLearnMoreDialog, setIsLearnMoreDialogVisible] = useState(false);

  return (
    <>
      <div className="relative inline-block">
        <StrapiImage
          alt={image.alternativeText}
          className="h-[356px] w-[414px] rounded-2xl object-cover shadow-large-black md:h-[332px] md:w-[400px] lg:h-[474px] lg:w-[600px]"
          height={474}
          sizes="(max-width: 768px) 414px, (max-width: 1024px) 400px, 600px"
          src={image.url}
          width={600}
        />
        <div className="absolute inset-0 top-8 text-center text-white">
          <h2 className="heading-4 lg:heading-3">{name}</h2>
          <h3 className="heading-5 lg:heading-4">{caption}</h3>
          <Button
            className="mr-14 mt-9"
            size={'md'}
            transparentVariant={learnMoreVariant}
            typography={'button2'}
            variant={'transparent'}
            onClick={() => setIsLearnMoreDialogVisible(true)}
          >
            {t('learnMore')}
          </Button>
          <Button size={'md'} typography={'button2'} variant={'filled'}>
            {t('buyNow')}
          </Button>
        </div>
      </div>
      <LearnMoreDialog
        isOpen={isLearnMoreDialog}
        product={product}
        onClose={() => setIsLearnMoreDialogVisible(false)}
      />
    </>
  );
}

interface LearnMoreDialogProps {
  product: ProductProps;
  isOpen: boolean;
  onClose: () => void;
}

function LearnMoreDialog({ product, isOpen, onClose }: LearnMoreDialogProps) {
  const t = useTranslations();

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="px-8 py-11 md:px-6 md:py-16 lg:px-14">
        <div className="flex flex-col items-center justify-center gap-5 md:gap-16">
          <h1 className="heading-1 md:display">{product.name}</h1>
          <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:justify-between md:gap-12">
            <StrapiImage
              alt={product.image.alternativeText}
              className="h-[310px] w-[240px] rounded-md object-cover md:h-[500px] md:w-[336px] lg:w-[400px]"
              height={500}
              sizes="(max-width: 768px) 240px, (max-width: 1024px) 336px, 400px"
              src={product.image.url}
              width={400}
            />
            <p className="heading-4 md:heading-3 lg:heading-2">
              {product.description}
            </p>
          </div>
          <Button size={'lg'} typography={'button1'} variant="filled">
            {t('common.buyNow')}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
