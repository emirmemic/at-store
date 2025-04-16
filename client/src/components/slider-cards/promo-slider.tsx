'use client';

import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import PlayPause from '@/components/ui/play-pause';
import ProgressBar from '@/components/ui/progress-bar';
import { dummyPromoImages } from '@/data/dummy-data';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils/utils';

interface PromoSliderProps {
  className?: string;
}

export default function PromoSlider({ className }: PromoSliderProps) {
  const t = useTranslations('common');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplayActive, setIsAutoplayActive] = useState(true);
  const totalSlides = dummyPromoImages.length;
  const [api, setApi] = useState<CarouselApi | null>(null);

  const handleDotClick = (index: number) => {
    const validIndex = Math.max(0, Math.min(index - 1, totalSlides - 1));
    setCurrentSlide(validIndex);
    if (api) {
      api.scrollTo(validIndex);
    }
  };
  useEffect(() => {
    if (api) {
      if (isAutoplayActive) {
        api.plugins().autoplay?.play();
      } else {
        api.plugins().autoplay?.stop();
      }
    }
  }, [isAutoplayActive, api]);
  return (
    <div className={cn('flex w-full flex-col gap-4', className)}>
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
        setApi={setApi}
        onSlideChange={(currentIndex) => setCurrentSlide(currentIndex)}
      >
        <CarouselContent>
          {dummyPromoImages.map((item) => (
            <CarouselItem
              key={item.id}
              className="basis-[416px] md:basis-[716px]"
            >
              <Link
                className="aspect-video h-full w-full overflow-hidden"
                href={item.actionLink}
                title={item.image.alternativeText}
              >
                <span className="sr-only">{t('viewDetails')}</span>
                <Image
                  alt={item.image.alternativeText}
                  className="h-full w-full object-cover"
                  height={240}
                  sizes="(min-width: 768px) 100vw, (min-width: 1200px) 50vw, 33vw"
                  src={item.image.url}
                  width={400}
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-center gap-2">
        <PlayPause
          isPlaying={isAutoplayActive}
          variant="dark"
          onClick={() => setIsAutoplayActive(!isAutoplayActive)}
        />
        <ProgressBar
          currentPage={currentSlide + 1}
          duration={500}
          total={totalSlides}
          variant="dark"
          onDotClick={handleDotClick}
        />
      </div>
    </div>
  );
}
