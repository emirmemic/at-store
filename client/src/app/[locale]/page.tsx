import { getTranslations } from 'next-intl/server';
import qs from 'qs';

import { HeroSection, PromoCard } from '@/app/components';
import CurrentPromotions from '@/components/strapi/single-types/current-promotions/current-promotions';
import PromoSliderWrapper from '@/components/strapi/single-types/promo-slider/promo-slider-wrapper';
import { Button } from '@/components/ui/button';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Link } from '@/i18n/routing';
import { STRAPI_BASE_URL, STRAPI_IMAGE_FIELDS } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';

import { HomepageResponse } from './types/homepage-response';

const homePageQuery = qs.stringify(
  {
    populate: {
      promoCards: {
        populate: {
          product: {
            populate: {
              image: {
                fields: STRAPI_IMAGE_FIELDS,
              },
            },
          },
        },
      },
      heroSection: {
        populate: {
          sliderItems: {
            populate: {
              media: {
                fields: [...STRAPI_IMAGE_FIELDS, 'mime'],
              },
              placeholderImage: {
                fields: STRAPI_IMAGE_FIELDS,
              },
              actionLink: true,
            },
          },
        },
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
);

async function loader() {
  const path = '/api/home-page';
  const url = new URL(path, STRAPI_BASE_URL);
  url.search = homePageQuery;

  const res = await fetchAPI<HomepageResponse>(url.href, {
    method: 'GET',
  });

  if (!res.data)
    return {
      title: 'There is no data for this page',
      promoCards: null,
      heroSection: null,
    };
  const data = res?.data?.data;

  return data;
}

export default async function Page() {
  const data = await loader();
  const t = await getTranslations('homepage');

  if (!data)
    return <div>Fetch is successful, but there is no data for this page</div>;

  const { title, promoCards, heroSection } = data;

  return (
    <>
      <h1 className="sr-only">{title ?? t('title')}</h1>
      {heroSection && <HeroSection {...heroSection} />}
      <div className="container-max-width">
        <CurrentPromotions className="py-4" />
        <div className="grid gap-8 py-14 md:grid-cols-2">
          {promoCards &&
            promoCards.map((promoCard) => (
              <PromoCard {...promoCard} key={promoCard.id} />
            ))}
        </div>
      </div>
      <PromoSliderWrapper className="py-10 container-max-width-lg" />

      {/* TODO Following buttons should be removed */}
      <div className="flex flex-col gap-2 py-4 container-max-width">
        Additional Links
        <div className="flex flex-col items-start gap-2">
          <Button asChild size={'lg'} variant={'filled'}>
            <Link href={PAGE_NAMES.GLOBAL_COMPONENTS}>Global components</Link>
          </Button>
          <Button asChild size={'lg'} variant={'filled'}>
            <Link href={PAGE_NAMES.ICONS}>Global Icons</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
