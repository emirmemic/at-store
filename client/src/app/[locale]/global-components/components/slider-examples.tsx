'use client';
import Autoscroll from 'embla-carousel-auto-scroll';
import Autoplay from 'embla-carousel-autoplay';
import { useState } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import PlayPause from '@/components/ui/play-pause';
import ProgressBar from '@/components/ui/progress-bar';

const PlaceholderItem = ({
  content,
  className,
}: {
  content: string;
  className?: string;
}) => {
  return (
    <div
      className={`flex h-20 items-center justify-center rounded-xl bg-grey-darker p-2 text-white paragraph-2 ${className}`}
    >
      {content}
    </div>
  );
};
export default function SliderExamples() {
  const items = [
    { id: 1, content: 'Content for Slide 1' },
    { id: 2, content: 'Content for Slide 2' },
    { id: 3, content: 'Content for Slide 3' },
    { id: 4, content: 'Content for Slide 4' },
    { id: 5, content: 'Content for Slide 5' },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = items.length;
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [isAutoScrollActive, setIsAutoScrollActive] = useState(true);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index - 1);
    if (api) {
      api.scrollTo(index - 1);
    }
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="h-0.5 w-full bg-grey"></div>
      <h2 className="display">Sliders</h2>
      <div className="h-0.5 w-full bg-grey"></div>
      <p className="heading-4">Carousel Basic</p>
      <Carousel>
        <CarouselContent>
          {items.map((item) => (
            <CarouselItem key={item.id}>
              <PlaceholderItem content={item.content} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious variant={'white'} />
        <CarouselNext variant={'white'} />
      </Carousel>
      <p className="heading-4">Carousel navigation buttons adjusted</p>
      <Carousel className="w-full">
        <CarouselContent>
          {items.map((item) => (
            <CarouselItem key={item.id}>
              <PlaceholderItem content={item.content} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-end gap-2 py-4">
          <CarouselPrevious
            className="translate-0 static"
            size="lg"
            variant="white"
          />
          <CarouselNext
            className="translate-0 static"
            size="lg"
            variant="white"
          />
        </div>
      </Carousel>
      <p className="heading-4">Carousel with pagination and autoplay:</p>
      <div className="flex flex-col items-center gap-2">
        <Carousel
          className="w-full"
          opts={{
            loop: true,
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
            {items.map((item) => (
              <CarouselItem key={item.id}>
                <PlaceholderItem content={item.content} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="flex gap-2">
          <ProgressBar
            currentPage={currentSlide + 1}
            duration={500}
            total={totalSlides}
            variant="dark"
            onDotClick={handleDotClick}
          />
        </div>
      </div>
      <p className="heading-4">Carousel multiple slides</p>
      <div className="flex flex-col items-center gap-2">
        <Carousel className="w-full px-10">
          <CarouselContent className="px-2">
            {items.map((item) => (
              <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                <PlaceholderItem content={item.content} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious size="lg" />
          <CarouselNext size="lg" />
        </Carousel>
      </div>
      <p className="heading-4">Carousel multiple slides fixed width</p>
      <div className="flex flex-col items-center gap-2">
        <Carousel className="w-full px-10">
          <CarouselContent className="w-full px-2">
            {items.map((item) => (
              <CarouselItem key={item.id} className="w-fit grow-0 md:basis-72">
                <PlaceholderItem content={item.content} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious size="lg" />
          <CarouselNext size="lg" />
        </Carousel>
      </div>
      <p className="heading-4">Carousel auto scroll infinite</p>
      <div className="flex w-full flex-col items-center gap-2">
        <Carousel
          className="w-full"
          opts={{
            loop: true,
          }}
          plugins={[
            Autoscroll({
              speed: 1,
              active: isAutoScrollActive,
            }),
          ]}
        >
          <CarouselContent className="px-2">
            {items.map((item) => (
              <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                <PlaceholderItem content={item.content} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <PlayPause
          isPlaying={isAutoScrollActive}
          variant="dark"
          onClick={() => setIsAutoScrollActive(!isAutoScrollActive)}
        />
      </div>
    </div>
  );
}
