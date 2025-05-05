'use client';
import Autoplay from 'embla-carousel-autoplay';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { CategoryItem } from '@/lib/types';

import Category from './category';

export default function CategoriesCarousel({
  categories,
}: {
  categories: CategoryItem[];
}) {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="border-b border-grey-darker pb-3">
      <Carousel
        className=""
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
        <CarouselContent className="-ml-12">
          {categories.map((category) => (
            <CarouselItem
              key={category.id}
              className="w-fit basis-44 pl-4 md:basis-52 md:pl-8"
            >
              <Category category={category} className="h-full w-40 md:w-48" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
