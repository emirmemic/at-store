import { useTranslations } from 'next-intl';

import { StrapiImage } from '@/components/strapi-image';
import { Button, TransparentVariant } from '@/components/ui/button';
import { ProductProps } from '@/lib/types/base';

export interface PromoCardProps {
  id: number;
  caption: string;
  product: ProductProps;
  learnMoreVariant: TransparentVariant;
}

export default function PromoCard(promoCard: Readonly<PromoCardProps>) {
  const { caption, product, learnMoreVariant } = promoCard;
  const { image, name } = product;

  const t = useTranslations();

  return (
    <div className="relative inline-block">
      <StrapiImage
        alt={image.alternativeText ?? ''}
        className="h-[356px] w-[414px] rounded-2xl object-cover shadow-large-black md:h-[332px] md:w-[400px] lg:h-[474px] lg:w-[600px]"
        height={474}
        sizes="(max-width: 768px) 414px, (max-width: 1024px) 400px, 600px"
        src={image.url}
        width={600}
      />
      <div className="absolute inset-0 top-8 text-center text-white">
        <h3 className="heading-4 lg:heading-3">{name}</h3>
        <h3 className="heading-5 lg:heading-4">{`${caption}.`}</h3>
        <Button
          className="mr-14 mt-9"
          size={'md'}
          transparentVariant={learnMoreVariant}
          typography={'button2'}
          variant={'transparent'}
        >
          {t('learnMore')}
        </Button>
        <Button size={'md'} typography={'button2'} variant={'filled'}>
          {t('buyNow')}
        </Button>
      </div>
    </div>
  );
}
