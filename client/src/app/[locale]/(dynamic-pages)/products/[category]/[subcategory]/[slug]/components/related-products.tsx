'use client';
import Autoplay from 'embla-carousel-autoplay';
import { useTranslations } from 'next-intl';

import { useProductVariants } from '@/app/providers/product-variants-provider';
import { RelatedProductAccessories } from '@/components/product-cards';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
export default function RelatedProducts() {
  const { relatedProducts } = useProductVariants();
  const t = useTranslations('productPage');
  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }
  return (
    <section className="py-2">
      <p className="pb-4 pl-4 heading-2">{t('relatedProducts')}</p>
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
        <CarouselContent className="-ml-4 py-4">
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
