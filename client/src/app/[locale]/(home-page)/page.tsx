import { getTranslations } from 'next-intl/server';
import qs from 'qs';

import {
  HeroSection,
  PromoCards,
  CategoriesSection,
} from '@/app/[locale]/(home-page)/components';
import { IconsBlock, MonoAppleBlock } from '@/components';
import CurrentPromotions from '@/components/strapi/single-types/current-promotions/current-promotions';
import PromoSliderWrapper from '@/components/strapi/single-types/promo-slider/promo-slider-wrapper';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Link } from '@/i18n/routing';
import { STRAPI_BASE_URL, STRAPI_IMAGE_FIELDS } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';

import { HomepageResponse } from './types';

const homePageQuery = qs.stringify(
  {
    populate: {
      promoCards: {
        populate: {
          product: {
            populate: {
              images: {
                fields: STRAPI_IMAGE_FIELDS,
              },
            },
          },
          image: {
            fields: STRAPI_IMAGE_FIELDS,
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

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
  }>;
}) {
  const data = await loader();
  const t = await getTranslations('homepage');
  const { error } = await searchParams;

  if (!data)
    return <div>Fetch is successful, but there is no data for this page</div>;

  const { title, promoCards, heroSection } = data;
  return (
    <main>
      {/* For OAuth errors */}
      {error && (
        <Alert
          dismissible
          className="fixed left-1/2 top-12 z-50 w-full max-w-[400px] -translate-x-1/2"
          variant={'destructive'}
        >
          {error}
        </Alert>
      )}
      <h1 className="sr-only">{title ?? t('title')}</h1>
      {heroSection && (
        <HeroSection {...heroSection} className="container-max-width-xl" />
      )}
      <div className="pb-24 pt-8">
        <div className="pl-6 container-max-width-lg md:pl-12">
          <CategoriesSection className="pb-8 pt-4" />
          <CurrentPromotions className="pb-8 pt-11" />
          {promoCards && promoCards.length > 0 && (
            <PromoCards
              className="pb-8 pr-6 pt-11 md:pr-12"
              promoCards={promoCards}
            />
          )}
          <section className="py-8 pr-6 md:pr-12">
            <IconsBlock />
          </section>
        </div>
        <PromoSliderWrapper className="py-4 container-max-width-xl" />
        {/* TODO Implement the section with sub categories of accessories */}
        <section className="px-6 py-8 container-max-width-lg md:px-12">
          <MonoAppleBlock />
        </section>
      </div>
      {/* TODO Following buttons should be removed */}
      <div className="flex flex-col gap-2 py-4 container-max-width">
        Additional Links
        <h1 className="p-4">{title}</h1>
        <div className="flex flex-col items-start gap-2">
          <Button asChild size={'lg'} variant={'filled'}>
            <Link href={PAGE_NAMES.GLOBAL_COMPONENTS}>Global components</Link>
          </Button>
          <Button asChild size={'lg'} variant={'filled'}>
            <Link href={PAGE_NAMES.ICONS}>Global Icons</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
