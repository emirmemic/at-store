import { getTranslations } from 'next-intl/server';
import qs from 'qs';
import Link from 'next/link';

import { InfoBlock } from '@/components';
import { ProductsList } from '@/components/product-cards';
import CurrentPromotions from '@/components/strapi/single-types/current-promotions/current-promotions';
import PromoSliderWrapper from '@/components/strapi/single-types/promo-slider/promo-slider-wrapper';
import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { productsQuery } from '@/lib/utils/productsQuery';

import { PromoPageResponseData } from './types';

interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData.promo' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
    },
  };
}
const query = qs.stringify(
  {
    populate: {
      infoBlock: {
        populate: {
          actionLink: true,
        },
      },
      featuredProducts: {
        populate: {
          products: productsQuery,
        },
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
);

async function fetchPageData() {
  const path = '/api/promo-page';
  const url = new URL(path, STRAPI_BASE_URL);
  url.search = query;

  const res = await fetchAPI<PromoPageResponseData>(url.href, {
    method: 'GET',
    isAuth: false,
  });
  return res;
}

export default async function Page() {
  const t = await getTranslations('promoPage');
  const response = await fetchPageData();
  const info = response?.data?.data.infoBlock || null;
  const featuredProducts = response?.data?.data.featuredProducts;
  const products = featuredProducts?.products || [];

  return (
    <div className="flex flex-col gap-12 bg-white py-12 md:py-20">
      {/* Hero naslov */}
      <section className="px-6 text-center container-max-width md:px-16">
        <h1 className="mb-8 heading-1">{t('title')}</h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Uživaj u ekskluzivnim promocijama – samo ograničeno vrijeme.
        </p>
      </section>

      {/* Sekcija: Izdvojeni uređaji */}
      {products && products.length > 0 && (
        <section className="px-6 container-max-width md:px-16">
          <h2 className="mb-8 text-left heading-4">
            Izdvojeni uređaji na promociji
          </h2>
          <ProductsList products={products} className="mt-4" />
        </section>
      )}

      {/* Aktuelne promocije - Full width */}
      <section className="mb-8 w-full px-10">
        <CurrentPromotions className="w-full" />
      </section>

      {/* Promo Slider */}
      <section className="container-max-width-xl">
        <PromoSliderWrapper />
      </section>
      <section className="bg-white py-24 text-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-900">
          Spremni za novu Apple avanturu?
        </h2>
        <p className="mb-8 text-lg text-gray-600">
          Posjeti najbližu AT Store poslovnicu ili naruči online.
        </p>
        <Link
          href="/find-store"
          className="inline-block rounded-full bg-black px-6 py-3 text-white transition hover:bg-gray-800"
        >
          Pronađi poslovnicu
        </Link>
      </section>
    </div>
  );
}
