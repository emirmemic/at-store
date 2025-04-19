import qs from 'qs';

import { PromotionalFlipCard } from '@/components/slider-cards';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { STRAPI_BASE_URL, STRAPI_IMAGE_FIELDS } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { cn } from '@/lib/utils/utils';

import { CurrentPromotionsResponse } from './types';

interface PromoSliderProps {
  className?: string;
}
const query = qs.stringify(
  {
    populate: {
      flipCards: {
        populate: {
          productImage: {
            fields: STRAPI_IMAGE_FIELDS,
          },
          actionLink: true,
        },
      },
    },
  },
  { encodeValuesOnly: true }
);

async function fetchCards() {
  const path = '/api/current-promotion';
  const url = new URL(path, STRAPI_BASE_URL);
  url.search = query;
  const res = await fetchAPI<CurrentPromotionsResponse>(url.href, {
    method: 'GET',
  });

  return res;
}

export default async function CurrentPromotions({
  className,
}: PromoSliderProps) {
  const response = await fetchCards();
  if (response.error) {
    return (
      <Alert
        dismissible
        className="mx-auto max-w-72 px-4"
        variant="destructive"
      >
        <AlertDescription>{response.error.message}</AlertDescription>
      </Alert>
    );
  }
  const cards = response?.data?.data.flipCards || [];
  const title = response?.data?.data.sectionTitle || '';

  return (
    <section className={cn('flex w-full flex-col gap-4', className)}>
      <h2 className="mb-8 heading-2">{title}</h2>
      <Carousel
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className="-ml-4">
          {cards.map((promotion) => (
            <CarouselItem key={promotion.id} className="w-fit basis-64 pl-4">
              <PromotionalFlipCard {...promotion} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {cards.length > 1 && (
          <div className="flex justify-end gap-2 py-4">
            <CarouselPrevious className="translate-0 static" size="lg" />
            <CarouselNext className="translate-0 static" size="lg" />
          </div>
        )}
      </Carousel>
    </section>
  );
}
