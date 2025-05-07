import qs from 'qs';

import { STRAPI_BASE_URL, STRAPI_IMAGE_FIELDS } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { cn } from '@/lib/utils/utils';

import CurrentPromotionsCarousel from './current-promotions-carousel';
import { CurrentPromotionsResponse } from './types';

interface CurrentPromotionsProps {
  className?: string;
}
const query = qs.stringify(
  {
    populate: {
      flipCards: {
        populate: {
          image: {
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
}: CurrentPromotionsProps) {
  const response = await fetchCards();
  const cards = response?.data?.data.flipCards || [];
  const title = response?.data?.data.sectionTitle || '';
  if (!cards || cards.length === 0) {
    return null;
  }
  return (
    <section className={cn('flex w-full flex-col gap-6', className)}>
      {title && <h2 className="heading-4 md:heading-2">{title}</h2>}
      <CurrentPromotionsCarousel cards={cards} />
    </section>
  );
}
