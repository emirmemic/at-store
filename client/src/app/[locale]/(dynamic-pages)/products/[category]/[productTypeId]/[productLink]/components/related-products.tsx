'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

import Autoplay from 'embla-carousel-autoplay';
import { RelatedProductAccessories } from '@/components/product-cards';
import { useProductVariants } from '@/app/providers/product-variants-provider';
import { useTranslations } from 'next-intl';

export default function RelatedProducts() {
  const { relatedProducts, selectedVariant } = useProductVariants();
  const t = useTranslations('productPage');
  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }
  const groupTitle = selectedVariant.subCategory?.related_group?.title;
  return (
    <section className="py-2">
      <p className="mt-4 pb-4 pl-4 heading-3">
        {groupTitle ?? t('relatedProducts')}
      </p>
      <Carousel
        className="w-full"
        opts={{
          loop: true,
          align: 'start',
        }}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent className="-ml-4 py-12">
          {relatedProducts.map((item) => (
            <CarouselItem key={item.id} className="w-fit basis-80 pl-8">
              <RelatedProductAccessories
                className="h-full w-72"
                product={item}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
