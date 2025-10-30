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

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-12 md:py-16">
      <div className="px-4 container-max-width-xl md:px-6">
        <h2 className="mb-8 text-center text-3xl font-semibold tracking-tight text-neutral-900 md:mb-12 md:text-4xl lg:text-5xl">
          {headline}
        </h2>

        <Carousel
          opts={{
            loop: true,
            align: 'start',
          }}
          setApi={setApi}
        >
          <CarouselContent className="-ml-4 px-20 py-2 md:-ml-5">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="basis-1/2 pl-4 md:basis-1/3 md:pl-5 lg:basis-1/4"
              >
                <QuickBuyProductCard
                  product={item.product}
                  subtitle={item.subtitle}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {showPrevNext && (
            <div className="flex justify-end gap-3 py-6">
              <CarouselPrevious
                className="static translate-x-0 translate-y-0 rounded-full border-0 bg-neutral-100 hover:bg-neutral-200"
                size="lg"
                variant="black"
              />
              <CarouselNext
                className="static translate-x-0 translate-y-0 rounded-full border-0 bg-neutral-100 hover:bg-neutral-200"
                size="lg"
                variant="black"
              />
            </div>
          )}
        </Carousel>
      </div>
    </section>
  );
}
