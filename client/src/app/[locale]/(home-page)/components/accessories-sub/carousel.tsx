'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

import Autoscroll from 'embla-carousel-auto-scroll';
import SubCategoryCard from './subcategory-card';
import { SubCategoryItem } from '@/lib/types';

export default function SubCategoriesCarousel({
  items,
}: {
  items: SubCategoryItem[];
}) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Carousel
      className="w-full"
      opts={{
        loop: true,
      }}
      plugins={[
        Autoscroll({
          speed: 0.7,
        }),
      ]}
    >
      <CarouselContent className="py-4">
        {items.map((item) => (
          <CarouselItem
            key={item.id}
            className="flex basis-52 sm:basis-64 md:basis-80"
          >
            <SubCategoryCard {...item} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
