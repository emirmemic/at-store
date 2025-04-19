'use client';
import Autoscroll from 'embla-carousel-auto-scroll';
import Autoplay from 'embla-carousel-autoplay';

import {
  Category,
  PromotionalFlipCard,
  InfiniteSliderCard,
  BestSellerCard,
} from '@/components/slider-cards';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  dummyCategories,
  dummyPromotions,
  dummyAccessoriesSlider,
  dummyBestSellers,
} from '@/data/dummy-data';
export default function SliderCardsExamples() {
  return (
    <>
      <div className="flex w-full flex-col gap-4">
        <div className="h-0.5 w-full bg-grey"></div>
        <h2 className="display">Slider Cards</h2>
        <div className="h-0.5 w-full bg-grey"></div>
        <Carousel
          className="border-b border-grey-darker"
          opts={{
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
        >
          <CarouselContent className="-ml-12 pb-3">
            {dummyCategories.map((category) => (
              <CarouselItem key={category.id} className="w-fit basis-52 pl-12">
                <Category {...category} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <Carousel
          opts={{
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4 pb-3">
            {dummyPromotions.map((promotion) => (
              <CarouselItem key={promotion.id} className="w-fit basis-64 pl-4">
                <PromotionalFlipCard {...promotion} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-2 py-4">
            <CarouselPrevious className="translate-0 static" size="lg" />
            <CarouselNext className="translate-0 static" size="lg" />
          </div>
        </Carousel>
        <Carousel
          className="w-full"
          opts={{
            loop: true,
          }}
          plugins={[
            Autoscroll({
              speed: 0.7,
            }),
          ]}
        >
          <CarouselContent className="py-4">
            {dummyAccessoriesSlider.map((item) => (
              <CarouselItem key={item.id} className="flex basis-72">
                <InfiniteSliderCard {...item} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <Carousel
          className="px-4"
          opts={{
            loop: true,
            align: 'start',
          }}
        >
          <CarouselContent className="-ml-5 py-4">
            {dummyBestSellers.map((product) => (
              <CarouselItem key={product.id} className="basis-80 pl-5">
                <BestSellerCard {...product} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="-left-4" size="lg" />
          <CarouselNext className="-right-4" size="lg" />
        </Carousel>
      </div>
    </>
  );
}
