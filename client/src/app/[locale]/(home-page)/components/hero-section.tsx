'use client';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { HeroSectionResponse, HeroSliderItem } from '../types';
import React, { useEffect, useState } from 'react';
import { StrapiImage, StrapiVideo } from '@/components';

import { ActionLink } from '@/components/strapi/components';
import Autoplay from 'embla-carousel-autoplay';
import PlayPause from '@/components/ui/play-pause';
import ProgressBar from '@/components/ui/progress-bar';
import { cn } from '@/lib/utils/utils';

const SliderItem: React.FC<HeroSliderItem> = ({
  id,
  media,
  placeholderImage,
  actionLink,
}) => {
  const isVideo = media?.mime?.startsWith('video');
  const videoUrl = media?.url;
  const imageUrl = media?.url;
  const altText = media?.alternativeText || placeholderImage?.alternativeText;

  return (
    <div
      key={id}
      className={cn(
        'relative',
        isVideo ? 'h-full w-full' : 'h-full w-full md:h-fit'
      )}
    >
      {isVideo ? (
        <StrapiVideo
          autoPlay
          loop
          muted
          className="h-full w-full object-cover"
          poster={placeholderImage?.url}
          src={videoUrl}
        />
      ) : (
        <StrapiImage
          alt={altText ?? 'No alternative text provided'}
          className="h-full w-full object-cover"
          height={303}
          sizes="100vw"
          src={imageUrl}
          width={834}
        />
      )}
      {actionLink && (
        <ActionLink
          actionLink={actionLink}
          className="bg- absolute inset-0 z-10"
        />
      )}
    </div>
  );
};
interface HeroSectionProps extends HeroSectionResponse {
  className?: string;
}
export default function HeroSection({
  sliderItems,
  className,
  enableAutoplay,
  autoplayDelay,
}: HeroSectionProps) {
  // States
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplayActive, setIsAutoplayActive] = useState(
    enableAutoplay || false
  );
  const [api, setApi] = useState<CarouselApi | null>(null);

  // Computed values
  const totalSlides = sliderItems.length;
  const delay = Math.max(autoplayDelay || 8000, 1000);

  // Handlers
  const handleDotClick = (index: number) => {
    const validIndex = Math.max(0, Math.min(index - 1, totalSlides - 1));
    setCurrentSlide(validIndex);
    if (api) {
      api.scrollTo(validIndex);
    }
  };
  const handleSlideChange = (currentIndex: number) => {
    setCurrentSlide(currentIndex ?? 0);
  };

  // Lifecycle hooks
  useEffect(() => {
    if (!api || !sliderItems || sliderItems.length <= 1) return;
    if (isAutoplayActive && api.plugins().autoplay) {
      api.plugins().autoplay?.play();
    } else {
      api.plugins().autoplay?.stop();
    }
  }, [api, isAutoplayActive, sliderItems]);

  return (
    <header className={cn('relative min-h-[200px] w-full', className)}>
      <Carousel
        className="w-full"
        opts={{
          loop: true,
        }}
        plugins={enableAutoplay ? [Autoplay({ delay })] : []}
        setApi={setApi}
        onSlideChange={handleSlideChange}
      >
        <CarouselContent className="m-0 h-[250px] w-full md:h-[600px]">
          {sliderItems.map((slide) => (
            <CarouselItem key={slide.id} className="h-full w-full p-0">
              <SliderItem {...slide} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious variant={'white'} />
        <CarouselNext variant={'white'} />
      </Carousel>
      <div className="absolute bottom-4 left-1/2 z-10 mx-auto flex w-fit -translate-x-1/2 items-center justify-center gap-1 md:gap-3">
        <PlayPause
          isPlaying={isAutoplayActive}
          variant="light"
          onClick={() => setIsAutoplayActive(!isAutoplayActive)}
        />
        <ProgressBar
          currentPage={currentSlide + 1}
          duration={500}
          total={totalSlides}
          variant="light"
          onDotClick={handleDotClick}
        />
      </div>
    </header>
  );
}
