import qs from 'qs';

import { PromoCard } from '@/app/components';
import { Button } from '@/components/ui/button';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Link } from '@/i18n/routing';
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

  if (!res.data) return {
    title: 'Failed to fetch data',
    promo_cards: [],
  };
  const data = res?.data?.data;

  return data;
}

export default async function Page() {
  const data = await loader();

  if (!data)
    return (
      <div>
        Failed to fetch data
        <Button asChild size={'lg'} variant={'filled'}>
          <Link href={PAGE_NAMES.GLOBAL_COMPONENTS}>
            Check out amazing global components!
          </Link>
        </Button>
      </div>
    );

  const { title, promo_cards } = data;

  return (
    <>
      <div className="container-max-width">
        <h1 className="p-4">{title}</h1>
        <Button asChild size={'lg'} variant={'filled'}>
          <Link href={PAGE_NAMES.GLOBAL_COMPONENTS}>
            Check out amazing global components!
          </Link>
        </Button>
        <div className="grid gap-8 py-14 md:grid-cols-2">
          {promo_cards &&
            promo_cards.map((promoCard) => (
              <PromoCard {...promoCard} key={promoCard.id} />
            ))}
        </div>
      </div>
    </>
  );
}
