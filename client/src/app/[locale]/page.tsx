import { notFound } from 'next/navigation';
import qs from 'qs';

import { PromoCard } from '@/app/components';
import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';

import { HomepageResponse } from './types/homepage-response';

const homePageQuery = qs.stringify({
  populate: {
    promo_cards: {
      populate: {
        product: {
          populate: {
            image: {
              fields: ['url', 'alternativeText'],
            },
          },
        },
      },
    },
  },
});

async function loader() {
  const path = '/api/home-page';
  const url = new URL(path, STRAPI_BASE_URL);
  url.search = homePageQuery;

  const res = await fetchAPI<HomepageResponse>(url.href, {
    method: 'GET',
  });

  if (!res.data) notFound();
  const data = res?.data?.data;

  return data;
}

export default async function Page() {
  const data = await loader();

  if (!data) return <div>Failed to fetch data</div>;

  const { title, promo_cards } = data;

  return (
    <>
      <h1 className="p-10">{title}</h1>
      <div className="flex flex-wrap items-center justify-center gap-16">
        {promo_cards &&
          promo_cards.map((promoCard) => (
            <PromoCard {...promoCard} key={promoCard.id} />
          ))}
      </div>
    </>
  );
}
