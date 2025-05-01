'use client';
import Autoscroll from 'embla-carousel-auto-scroll';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { SubCategoryItem } from '@/lib/types';

import SubCategoryCard from './subcategory-card';

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
          <CarouselItem key={item.id} className="flex basis-72">
            <SubCategoryCard {...item} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
