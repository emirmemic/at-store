'use client';

import Autoplay from 'embla-carousel-autoplay';
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
import { ImageProps } from '@/lib/types';
import { cn } from '@/lib/utils/utils';

interface PromoSliderProps {
  className?: string;
  images: ImageProps[];
}

export default function Slider({ className, images }: PromoSliderProps) {
  const t = useTranslations('common');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplayActive, setIsAutoplayActive] = useState(true);
  const totalSlides = images.length;
  const [api, setApi] = useState<CarouselApi | null>(null);

  const handleDotClick = (index: number) => {
    const validIndex = Math.max(0, Math.min(index - 1, totalSlides - 1));
    setCurrentSlide(validIndex);
    if (api) {
      api.scrollTo(validIndex);
    }
  };

  useEffect(() => {
    if (!api || !images || images.length <= 1) return;
    if (isAutoplayActive && api.plugins().autoplay) {
      api.plugins().autoplay?.play();
    } else {
      api.plugins().autoplay?.stop();
    }
  }, [api, isAutoplayActive, images]);

  const plugins = [];
  if (images.length > 2) {
    plugins.push(
      Autoplay({
        delay: 3000,
      })
    );
  }

  return (
    <section className={cn('flex w-full flex-col gap-4', className)}>
      <Carousel
        className="w-full"
        opts={{
          loop: true,
          align: 'start',
        }}
        plugins={plugins}
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
