'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import React, { useEffect, useState } from 'react';

import { ImageProps } from '@/lib/types';
import NoImages from './no-images';
import { ProductTag } from '@/components/product-cards';
import ProductsSliderPagination from '@/components/ui/products-slider-pagination';
import { StrapiImage } from '@/components';

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

  const activeImage = images?.[activeIndex];
  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    if (api) {
      api.scrollTo(index);
    }
  };

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  if (!images || images?.length === 0) return <NoImages tag={tag || ''} />;

  const hasMoreImages = images?.length > 1;

  return (
    <div className={`flex h-full flex-col ${className}`}>
      {/* Main Image Display */}
      <div className="relative flex-1 bg-grey-almost-white">
        <div className="flex h-full w-full items-center justify-center p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage?.url}
              animate={{ opacity: 1 }}
              className="h-full max-h-[600px] w-full max-w-lg"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <StrapiImage
                alt={
                  activeImage?.alternativeText ?? 'No alternative text provided'
                }
                className="h-full w-full object-contain"
                height={600}
                sizes="50vw"
                src={activeImage?.url ?? ''}
                width={500}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Product Tag */}
        {tag && <ProductTag className="absolute right-6 top-6" tag={tag} />}
      </div>

      {/* Thumbnail Navigation */}
      {hasMoreImages && (
        <div className="flex-shrink-0 border-t border-grey-light bg-white p-4">
          <Carousel
            className="w-full"
            opts={{ align: 'start', loop: false }}
            orientation="horizontal"
            setApi={setApi}
          >
            <CarouselContent className="flex gap-2">
              {images.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="ml-5 basis-auto cursor-pointer"
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
                    className={`h-16 w-16 overflow-hidden rounded-lg border-2 bg-grey-almost-white p-1 transition-all hover:border-grey-dark ${
                      activeIndex === index
                        ? 'border-black'
                        : 'border-grey-light'
                    }`}
                  >
                    <StrapiImage
                      alt={
                        image.alternativeText ?? 'No alternative text provided'
                      }
                      className="h-full w-full object-contain"
                      height={64}
                      sizes="64px"
                      src={image.url}
                      width={64}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Navigation arrows for thumbnails */}
            <CarouselPrevious
              className="absolute left-0 top-1/2 h-8 w-8 -translate-x-3 -translate-y-1/2"
              size="sm"
            />
            <CarouselNext
              className="absolute right-0 top-1/2 h-8 w-8 -translate-y-1/2 translate-x-3"
              size="sm"
            />
          </Carousel>

          {/* Pagination dots */}
          <div className="mt-3 flex justify-center">
            <ProductsSliderPagination
              current={activeIndex}
              duration={0.3}
              total={images.length}
              onDotClick={handleDotClick}
            />
          </div>
        </div>
      )}
    </div>
  );
}
