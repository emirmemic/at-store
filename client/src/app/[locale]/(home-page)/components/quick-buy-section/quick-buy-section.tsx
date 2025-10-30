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

import { ProductResponse } from '@/lib/types';
import QuickBuyProductCard from './quick-buy-product-card';

interface QuickBuyItem {
  id: number;
  product: ProductResponse;
  subtitle?: string;
}

interface QuickBuySectionProps {
  headline?: string;
  items: QuickBuyItem[];
}

export default function QuickBuySection({
  headline = 'Kupi brzo',
  items,
}: QuickBuySectionProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) return;

    const updateScrollState = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    // Initial check
    updateScrollState();

    // Listen to select events (when carousel scrolls)
    api.on('select', updateScrollState);
    api.on('resize', updateScrollState);

    return () => {
      api.off('select', updateScrollState);
      api.off('resize', updateScrollState);
    };
  }, [api]);

  if (!items || items.length === 0) {
    return null;
  }

  // Arrows are always visible, but disabled if 3 or fewer items
  const disableArrows = items.length <= 3;

  return (
    <section className="w-full py-12 md:py-16">
      <div className="px-4 container-max-width-xl md:px-6">
        <h2 className="mb-8 text-center text-3xl font-semibold tracking-tight text-neutral-900 md:mb-12 md:text-4xl lg:text-5xl">
          {headline}
        </h2>

        <Carousel
          opts={{
            align: 'center',
            loop: false,
            slidesToScroll: 1,
          }}
          setApi={setApi}
          className="mx-auto w-full max-w-4xl"
        >
          <CarouselContent className="-ml-2 py-2 md:-ml-4">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="basis-[85%] pl-2 sm:basis-[60%] md:basis-1/3 md:pl-4"
              >
                <QuickBuyProductCard
                  product={item.product}
                  subtitle={item.subtitle}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Desktop Arrows - Positioned absolutely */}
          <CarouselPrevious
            className="absolute -left-12 top-1/2 hidden -translate-y-1/2 rounded-full border-0 bg-neutral-100 opacity-100 hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-30 md:flex"
            size="lg"
            variant="blue"
            disabled={disableArrows || !canScrollPrev}
          />
          <CarouselNext
            className="absolute -right-12 top-1/2 hidden -translate-y-1/2 rounded-full border-0 bg-neutral-100 opacity-100 hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-30 md:flex"
            size="lg"
            variant="blue"
            disabled={disableArrows || !canScrollNext}
          />
        </Carousel>
      </div>
    </section>
  );
}
