'use client';
import Autoplay from 'embla-carousel-autoplay';

import { extendItemsToMinLength } from '@/app/[locale]/(home-page)/utils/helpers';
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
  const extendedCategories = extendItemsToMinLength(categories);
  return (
    <div className="border-b border-grey-darker pb-3">
      <Carousel
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
        <CarouselContent className="-ml-4 md:-ml-8">
          {extendedCategories.map((category) => (
            <CarouselItem
              key={category.id}
              className="w-fit basis-28 pl-2 md:basis-32 md:pl-5"
            >
              <Category category={category} className="h-full w-24 md:w-28" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
