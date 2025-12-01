import {
  HeroSection,
  OAuthRedirectMessage,
  PromoCards,
  QuickBuyWrapper,
  ServicesSection,
  SpecialBanner,
  SubCategorySection,
  TradeInBanner,
} from './components';
import { STRAPI_BASE_URL, STRAPI_IMAGE_FIELDS } from '@/lib/constants';

import ChatBotWidget from '@/components/chat-bot/chat-bot-widget';
import CurrentPromotions from '@/components/strapi/single-types/current-promotions/current-promotions';
import { HomepageResponse } from './types';
import PromoSliderWrapper from '@/components/strapi/single-types/promo-slider/promo-slider-wrapper';
import { fetchAPI } from '@/lib/fetch-api';
import { getTranslations } from 'next-intl/server';
import qs from 'qs';

const homePageQuery = qs.stringify(
  {
    populate: {
      specialBanner: {
        populate: {
          image: {
            fields: STRAPI_IMAGE_FIELDS,
          },
        },
      },
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
              mobileMedia: {
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
    next: {
      revalidate: 300,
    },
  });

  if (!res.data)
    return {
      title: 'There is no data for this page',
      specialBanner: null,
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

  const { title, specialBanner, promoCards, heroSection } = data;

  return (
    <main>
      {(error || success) && (
        <OAuthRedirectMessage error={error} success={success} />
      )}
      <h1 className="sr-only">{title ?? t('homepage.title')}</h1>
      <TradeInBanner />
      {specialBanner && (
        <div className="!mb-[0.5rem] container-max-width-xl">
          <SpecialBanner {...specialBanner} />
        </div>
      )}
      {heroSection && (
        <div className="container-max-width-xl">
          <div className="relative aspect-[43/25] w-full overflow-hidden md:aspect-[3/1]">
            <HeroSection
              {...heroSection}
              className="absolute inset-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&_video]:h-full [&_video]:w-full [&_video]:object-cover"
            />
          </div>
        </div>
      )}

      <div className="pb-16 pt-0">
        <div className="px-3 container-max-width-lg md:px-4">
          {/* TODO: Sklonjeno, neka stoji ovdje u slucaju povratka, samo ponovo import napraviti  */}
          {/* <CategoriesSection /> */}
          {promoCards && promoCards.length > 0 && (
            <PromoCards promoCards={promoCards} className="pt-4" />
          )}
          <CurrentPromotions />
        </div>
        <PromoSliderWrapper className="pb-4 pt-4 container-max-width-xl" />
        <ServicesSection />
        <QuickBuyWrapper />
        <section className="pb-5 pt-10 container-max-width-xl">
          <SubCategorySection />
        </section>
      </div>
      <ChatBotWidget />
    </main>
  );
}
