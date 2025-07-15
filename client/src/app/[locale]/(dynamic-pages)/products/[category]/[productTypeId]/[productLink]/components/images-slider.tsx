'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { StrapiImage } from '@/components';
import { ProductTag } from '@/components/product-cards';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import ProductsSliderPagination from '@/components/ui/products-slider-pagination';
import { ImageProps } from '@/lib/types';

import NoImages from './no-images';

interface ImagesSliderProps {
  className?: string;
  images: ImageProps[] | null;
  tag?: string | null;
}

export default function ImagesSlider({
  className,
  images,
  tag,
}: ImagesSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>(
    'horizontal'
  );

  const activeImage = images?.[activeIndex];
  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    if (api) {
      api.scrollTo(index);
    }
  };
  const decideCarouselOrientation = () => {
    if (window.innerWidth < 1024) {
      return 'horizontal';
    }
    return 'vertical';
  };

  useEffect(() => {
    const handleResize = () => {
      const newOrientation = decideCarouselOrientation();
      setOrientation(newOrientation);
      if (api) {
        api.scrollTo(activeIndex);
      }
    };
    const newOrientation = decideCarouselOrientation();
    setOrientation(newOrientation);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [activeIndex, api]);

  if (!images || images?.length === 0) return <NoImages tag={tag || ''} />;
  const hasMoreImages = images?.length > 1;
  return (
    <div
      className={`flex w-full flex-col gap-4 lg:h-[484px] lg:flex-row-reverse ${className}`}
    >
      <div className="relative h-full w-full rounded-2xl bg-grey-almost-white">
        <div className="h-[484px] w-full py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage?.url}
              animate={{ opacity: 1 }}
              className="h-full w-full"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <StrapiImage
                alt={
                  activeImage?.alternativeText ?? 'No alternative text provided'
                }
                className="h-full w-full object-contain"
                height={350}
                sizes="100vw"
                src={activeImage?.url ?? ''}
                width={368}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        {tag && (
          <ProductTag
            className="absolute right-6 top-0 -translate-y-1/2"
            tag={tag}
          />
        )}
        <div className="flex justify-center px-2 py-1 lg:hidden">
          <ProductsSliderPagination
            current={activeIndex}
            duration={0.2}
            total={images.length}
            onDotClick={handleDotClick}
          />
        </div>
      </div>

      {hasMoreImages && (
        <div className="w-full lg:w-fit">
          <Carousel
            className="w-full lg:h-[492px]"
            opts={{ align: 'start' }}
            orientation={orientation}
            setApi={setApi}
          >
            <CarouselContent className="flex gap-4 pb-8 lg:h-[512px]">
              {images.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="basis-auto cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setActiveIndex(index);
                    }
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <div
                    className={`h-24 w-28 overflow-hidden rounded-lg border-2 bg-grey-almost-white px-3 py-2 transition-all ${
                      activeIndex === index
                        ? 'border-grey-light'
                        : 'border-transparent'
                    }`}
                  >
                    <StrapiImage
                      alt={
                        image.alternativeText ?? 'No alternative text provided'
                      }
                      className="h-full w-full object-contain"
                      height={64}
                      sizes="100vw"
                      src={image.url}
                      width={64}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              className="absolute left-0 top-0 hidden -translate-x-1/2 -translate-y-full lg:block"
              size="lg"
            />
            <CarouselNext
              className="absolute bottom-2 left-0 hidden -translate-x-1/2 translate-y-full lg:block"
              size="lg"
            />
          </Carousel>
        </div>
      )}
    </div>
  );
}
