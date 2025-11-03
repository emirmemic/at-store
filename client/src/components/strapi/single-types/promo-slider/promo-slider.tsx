'use client';

import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
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
import { PromoSliderItemResponse } from '@/lib/types';
import { cn } from '@/lib/utils/utils';

interface PromoSliderProps {
  className?: string;
  slides: PromoSliderItemResponse[];
}

export default function PromoSlider({ className, slides }: PromoSliderProps) {
  const t = useTranslations('common');
  const totalSlides = slides.length;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplayActive, setIsAutoplayActive] = useState(totalSlides > 1);
  const [api, setApi] = useState<CarouselApi | null>(null);

  const autoplayPlugin = useMemo(() => {
    if (totalSlides <= 1) return null;
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

    if (snapCount <= 1) {
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
    if (totalSlides > 1 && !isAutoplayActive) {
      setIsAutoplayActive(true);
    }
  }, [totalSlides, isAutoplayActive]);

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
        plugins={carouselPlugins}
        setApi={setApi}
        onSlideChange={(currentIndex) => setCurrentSlide(currentIndex)}
      >
        <CarouselContent>
          {slides.map((slide) => {
            const mobileImg = slide.mobileImage || slide.image;
            const desktopImg = slide.image;

            return (
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
                    {slide.video ? (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-full object-cover"
                      >
                        <source src={slide.video.url} type="video/mp4" />
                      </video>
                    ) : (
                      <>
                        <StrapiImage
                          priority
                          alt={mobileImg?.alternativeText ?? 'Image'}
                          className="h-full w-full object-cover md:hidden"
                          height={240}
                          sizes="100vw"
                          src={mobileImg.url}
                          width={400}
                        />
                        <StrapiImage
                          priority
                          alt={desktopImg?.alternativeText ?? 'Image'}
                          className="hidden h-full w-full object-cover md:block"
                          height={240}
                          sizes="100vw"
                          src={desktopImg.url}
                          width={400}
                        />
                      </>
                    )}
                  </Link>
                ) : (
                  <div className="h-full w-full overflow-hidden">
                    <span className="sr-only">{t('viewDetails')}</span>
                    {slide.video ? (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-full object-cover"
                      >
                        <source src={slide.video.url} type="video/mp4" />
                      </video>
                    ) : (
                      <>
                        <StrapiImage
                          priority
                          alt={mobileImg?.alternativeText ?? 'Image'}
                          className="h-full w-full object-cover md:hidden"
                          height={240}
                          sizes="100vw"
                          src={mobileImg.url}
                          width={400}
                        />
                        <StrapiImage
                          priority
                          alt={desktopImg?.alternativeText ?? 'Image'}
                          className="hidden h-full w-full object-cover md:block"
                          height={240}
                          sizes="100vw"
                          src={desktopImg.url}
                          width={400}
                        />
                      </>
                    )}
                  </div>
                )}
              </CarouselItem>
            );
          })}
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
