'use client';

import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react';
import { useTranslations } from 'next-intl';
import React, {
  createContext,
  useContext,
  forwardRef,
  useState,
  useCallback,
  useEffect,
} from 'react';

import NavigationArrow, {
  type SliderButtonProps,
} from '@/components/ui/navigation-arrow';
import { cn } from '@/lib/utils/utils';
type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: CarouselApi) => void;
  onSlideChange?: (currentIndex: number) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
}

const Carousel = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = 'horizontal',
      opts,
      setApi,
      plugins,
      onSlideChange,
      className,
      children,

      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === 'horizontal' ? 'x' : 'y',
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const onSelect = useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on('reInit', onSelect);
      api.on('select', onSelect);

      return () => {
        api?.off('select', onSelect);
      };
    }, [api, onSelect]);

    useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);

      const handleSlideChange = () => {
        const currentIndex = api.selectedScrollSnap();
        onSlideChange?.(currentIndex);
      };

      handleSlideChange();
      api.on('select', handleSlideChange);

      return () => {
        api.off('select', handleSlideChange);
      };
    }, [api, onSlideChange, setApi]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          aria-roledescription="carousel"
          className={cn('relative', className)}
          role="region"
          onKeyDownCapture={handleKeyDown}
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = 'Carousel';

const CarouselContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = 'CarouselContent';

const CarouselItem = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      aria-roledescription="slide"
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className
      )}
      role="group"
      {...props}
    />
  );
});
CarouselItem.displayName = 'CarouselItem';

const CarouselPrevious = forwardRef<HTMLButtonElement, SliderButtonProps>(
  ({ className, size = 'sm', variant = 'black', ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();
    const t = useTranslations('navigation');

    return (
      <NavigationArrow
        ref={ref}
        aria-label={canScrollPrev ? t('previous') : undefined}
        className={cn(
          'absolute rounded',
          orientation === 'horizontal'
            ? 'left-4 top-1/2 -translate-y-1/2'
            : 'left-1/2 top-4 -translate-x-1/2',
          className
        )}
        direction={orientation === 'horizontal' ? 'left' : 'top'}
        disabled={!canScrollPrev}
        size={size}
        title={canScrollPrev ? t('previous') : undefined}
        variant={variant}
        onClick={scrollPrev}
        {...props}
      />
    );
  }
);
CarouselPrevious.displayName = 'CarouselPrevious';

const CarouselNext = forwardRef<HTMLButtonElement, SliderButtonProps>(
  ({ className, size = 'sm', variant = 'black', ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();
    const t = useTranslations('navigation');

    return (
      <NavigationArrow
        ref={ref}
        aria-label={canScrollNext ? t('next') : undefined}
        className={cn(
          'absolute rounded',
          orientation === 'horizontal'
            ? 'right-4 top-1/2 -translate-y-1/2'
            : 'bottom-4 left-1/2 -translate-x-1/2',
          className
        )}
        direction={orientation === 'horizontal' ? 'right' : 'bottom'}
        disabled={!canScrollNext}
        size={size}
        title={canScrollNext ? t('next') : undefined}
        variant={variant}
        onClick={scrollNext}
        {...props}
      />
    );
  }
);
CarouselNext.displayName = 'CarouselNext';

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
