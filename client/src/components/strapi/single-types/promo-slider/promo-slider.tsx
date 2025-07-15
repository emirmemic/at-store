'use client';

import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

import { StrapiImage } from '@/components/strapi/components/strapi-image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import PlayPause from '@/components/ui/play-pause';
import ProgressBar from '@/components/ui/progress-bar';
import { PromoSliderItemResponse } from '@/lib/types';
import { cn } from '@/lib/utils/utils';

interface PromoSliderProps {
  className?: string;
  slides: PromoSliderItemResponse[];
}

export default function PromoSlider({ className, slides }: PromoSliderProps) {
  const t = useTranslations('common');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplayActive, setIsAutoplayActive] = useState(true);
  const totalSlides = slides.length;
  const [api, setApi] = useState<CarouselApi | null>(null);

  const handleDotClick = (index: number) => {
    const validIndex = Math.max(0, Math.min(index - 1, totalSlides - 1));
    setCurrentSlide(validIndex);
    if (api) {
      api.scrollTo(validIndex);
    }
  };

  useEffect(() => {
    if (!api || !slides || slides.length <= 1) return;
    if (isAutoplayActive && api.plugins().autoplay) {
      api.plugins().autoplay?.play();
    } else {
      api.plugins().autoplay?.stop();
    }
  }, [api, isAutoplayActive, slides]);

  return (
    <section
      className={cn(
        'relative flex w-full flex-col items-center justify-center gap-4',
        className
      )}
    >
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
          {slides.map((slide) => (
            <CarouselItem
              key={slide.id}
              className="aspect-video basis-[416px] md:basis-[716px]"
            >
              {slide.actionLink ? (
                <Link
                  className="h-full w-full overflow-hidden"
                  href={slide.actionLink.linkUrl}
                  title={slide.actionLink.linkText || t('viewDetails')}
                >
                  <span className="sr-only">{t('viewDetails')}</span>
                  <StrapiImage
                    priority
                    alt={slide.image?.alternativeText ?? 'Image'}
                    className="h-full w-full object-cover"
                    height={240}
                    sizes="100vw"
                    src={slide.image.url}
                    width={400}
                  />
                </Link>
              ) : (
                <div className="h-full w-full overflow-hidden">
                  <span className="sr-only">{t('viewDetails')}</span>
                  <StrapiImage
                    priority
                    alt={slide.image?.alternativeText ?? 'Image'}
                    className="h-full w-full object-cover"
                    height={240}
                    sizes="100vw"
                    src={slide.image.url}
                    width={400}
                  />
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex items-center justify-center gap-1 md:gap-3">
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
    </section>
  );
}
