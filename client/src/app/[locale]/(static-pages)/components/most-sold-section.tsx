'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { useEffect, useState } from 'react';

import AutoScroll from 'embla-carousel-auto-scroll';
import { BestSellerCard } from '@/components/slider-cards';
import { BestSellerItem } from '@/lib/types';
import { IconLoader } from '@/components/icons';
import { fetchMostSold } from '../actions';
import { useLoader } from '@/lib/hooks';
import { useTranslations } from 'next-intl';

export default function MostSoldSection() {
  const t = useTranslations();
  const [mostSold, setMostSold] = useState<BestSellerItem[]>([]);

  const { isLoading, execute } = useLoader({
    apiCall: () => fetchMostSold(),
    onSuccess: (res) => {
      setMostSold(res?.data.items || []);
    },
  });

  useEffect(() => {
    execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <IconLoader className="text-center" />;
  }

  if (!mostSold || mostSold.length === 0) {
    return <></>;
  }

  return (
    <section className="py-2 container-max-width-xl">
      <p className="pb-4 heading-3">{t('cartPage.mostSold')}</p>
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
          {mostSold.map((item) => (
            <CarouselItem key={item.id} className="flex w-fit basis-72 pl-4">
              <BestSellerCard {...item} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
