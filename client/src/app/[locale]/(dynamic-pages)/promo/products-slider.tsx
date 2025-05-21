'use client';
import AutoScroll from 'embla-carousel-auto-scroll';

import { ProductCard } from '@/components/product-cards';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { ProductResponse } from '@/lib/types';

export default function ProductsSlider({
  products,
}: {
  products: ProductResponse[];
}) {
  return (
    <section className="py-2 container-max-width">
      <Carousel
        className="w-full"
        opts={{
          loop: true,
        }}
        plugins={[
          AutoScroll({
            speed: 1,
            active: true,
          }),
        ]}
      >
        <CarouselContent className="-ml-4 p-4">
          {products.map((item) => (
            <CarouselItem key={item.id} className="flex w-fit basis-72 pl-4">
              <ProductCard product={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
