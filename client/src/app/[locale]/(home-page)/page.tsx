import { getTranslations } from 'next-intl/server';
import qs from 'qs';

// import { IconsBlock, MonoAppleBlock } from '@/components';

import CurrentPromotions from '@/components/strapi/single-types/current-promotions/current-promotions';
import PromoSliderWrapper from '@/components/strapi/single-types/promo-slider/promo-slider-wrapper';
import { STRAPI_BASE_URL, STRAPI_IMAGE_FIELDS } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';

import {
  CategoriesSection,
  HeroSection,
  OAuthRedirectMessage,
  PromoCards,
  SubCategorySection,
} from './components';
import { HomepageResponse } from './types';

const homePageQuery = qs.stringify(
  {
    populate: {
      promoCards: {
        populate: {
          product: {
            populate: {
              category: {
                fields: ['link'],
              },
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
    isAuth: false,
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
    success?: string;
  }>;
}) {
  const data = await loader();
  const t = await getTranslations();
  const { error, success } = await searchParams;

  if (!data)
    return <div>Fetch is successful, but there is no data for this page</div>;

  // TODO: Delete commented code if not needed
  const { title, promoCards, heroSection } = data;
  return (
    <main>
      {(error || success) && (
        <OAuthRedirectMessage error={error} success={success} />
      )}
      <h1 className="sr-only">{title ?? t('homepage.title')}</h1>
      {heroSection && (
        <HeroSection {...heroSection} className="container-max-width-xl" />
      )}
      <div className="py-16">
        <div className="px-3 container-max-width-lg md:px-4">
          <CategoriesSection />
          <CurrentPromotions />
          {promoCards && promoCards.length > 0 && (
            <PromoCards promoCards={promoCards} />
          )}
          {/* <section className="py-8 pr-6 md:pr-12">
            <IconsBlock />
          </section> */}
        </div>
        <PromoSliderWrapper className="pb-4 pt-4 container-max-width-xl" />
        <section className="pb-12 pt-0 container-max-width-xl">
          <SubCategorySection />
        </section>
        {/* <section className="px-6 py-8 container-max-width-lg md:px-12">
          <MonoAppleBlock />
        </section> */}
      </div>
    </main>
  );
}
