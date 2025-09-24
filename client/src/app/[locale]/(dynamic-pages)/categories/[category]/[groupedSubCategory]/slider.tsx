'use client';

import Autoplay from 'embla-carousel-autoplay';
import { useTranslations } from 'next-intl';
import { useState, useEffect, useMemo } from 'react';

import { StrapiImage } from '@/components/strapi/components/strapi-image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import PlayPause from '@/components/ui/play-pause';
import ProgressBar from '@/components/ui/progress-bar';
import { ImageProps } from '@/lib/types';
import { cn } from '@/lib/utils/utils';

interface PromoSliderProps {
  className?: string;
  images: ImageProps[];
}

export default function Slider({ className, images }: PromoSliderProps) {
  const t = useTranslations('common');
  const totalSlides = images.length;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplayActive, setIsAutoplayActive] = useState(totalSlides > 2);
  const [api, setApi] = useState<CarouselApi | null>(null);

  const autoplayPlugin = useMemo(() => {
    if (totalSlides <= 2) return null;
    return Autoplay({
      delay: (scrollSnaps) =>
        scrollSnaps.length ? scrollSnaps.map(() => 3000) : [3000],
      playOnInit: false,
    });
  }, [totalSlides]);

  const carouselPlugins = useMemo(
    () => (autoplayPlugin ? [autoplayPlugin] : undefined),
    [autoplayPlugin]
  );

  const handleDotClick = (index: number) => {
    const validIndex = Math.max(0, Math.min(index - 1, totalSlides - 1));
    setCurrentSlide(validIndex);
    if (api) {
      api.scrollTo(validIndex);
    }
  };

  useEffect(() => {
    if (!api) {
      return;
    }

    const snapCount = api.scrollSnapList().length;

    if (snapCount <= 2) {
      if (isAutoplayActive) {
        setIsAutoplayActive(false);
      }
      return;
    }

    const autoplayApi = api.plugins().autoplay;
    if (!autoplayApi) return;

    if (isAutoplayActive) {
      autoplayApi.play();
    } else {
      autoplayApi.stop();
    }
  }, [api, isAutoplayActive, totalSlides]);

  useEffect(() => {
    if (totalSlides > 2 && !isAutoplayActive) {
      setIsAutoplayActive(true);
    }
  }, [totalSlides, isAutoplayActive]);

  return (
    <section className={cn('flex w-full flex-col gap-4', className)}>
      <Carousel
        className="w-full"
        opts={{
          loop: true,
          align: 'start',
        }}
        plugins={carouselPlugins}
        setApi={setApi}
        onSlideChange={(currentIndex) => setCurrentSlide(currentIndex)}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem
              key={`${image.id}-${index}`}
              className="aspect-video basis-[416px] md:basis-[716px]"
            >
              <div className="h-full w-full overflow-hidden">
                <span className="sr-only">{t('viewDetails')}</span>
                <StrapiImage
                  priority
                  alt={image?.alternativeText ?? 'Image'}
                  className="h-full w-full object-cover"
                  height={240}
                  sizes="100vw"
                  src={image.url}
                  width={400}
                />
              </div>
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
    </section>
  );
}
