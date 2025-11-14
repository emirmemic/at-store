'use client';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useEffect, useState } from 'react';

import { PromotionalFlipCard } from '@/components/slider-cards';
import { PromotionalFlipCardResponse } from '@/lib/types';

interface PropType {
  cards: PromotionalFlipCardResponse[];
}

export default function CurrentPromotionsCarousel({ cards }: PropType) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [showPrevNext, setShowPrevNext] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (api) {
        if (api.canScrollNext() || api.canScrollPrev()) {
          setShowPrevNext(true);
        } else {
          setShowPrevNext(false);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [api]);

  return (
    <Carousel
      opts={{
        loop: true,
        align: 'start',
      }}
      setApi={setApi}
      className="w-full"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {cards.map((card) => (
          <CarouselItem
            key={card.id}
            className="basis-full pl-2 md:basis-1/2 md:pl-4 lg:basis-[360px] xl:basis-[400px]"
          >
            <PromotionalFlipCard {...card} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {showPrevNext && (
        <div className="flex justify-end gap-2 py-4">
          <CarouselPrevious className="translate-0 static" size="lg" />
          <CarouselNext className="translate-0 static" size="lg" />
        </div>
      )}
    </Carousel>
  );
}
