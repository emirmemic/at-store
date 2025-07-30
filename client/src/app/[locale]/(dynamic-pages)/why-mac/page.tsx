import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import qs from 'qs';

import {
  macBookAirBrandAwareness,
  macFamilyScreen,
  whyMacDevices,
} from '@/assets/images';
import { InfoBlock } from '@/components';
import { ProductsList } from '@/components/product-cards';
import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { ActionLinkResponse } from '@/lib/types';
import { productsQuery } from '@/lib/utils/productsQuery';

import { WhyMacPageResponse } from './types';

// Metadata
interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData' });

  return {
    title: t('whyMac.title'),
    description: t('whyMac.description'),
    openGraph: {
      title: t('whyMac.title'),
      description: t('whyMac.description'),
    },
  };
}

// Fetching Page Data
const query = qs.stringify(
  {
    populate: {
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
  const path = '/api/why-mac-page';
  const url = new URL(path, STRAPI_BASE_URL);
  url.search = query;

  const res = await fetchAPI<WhyMacPageResponse>(url.href, {
    method: 'GET',
    isAuth: false,
  });
  return res;
}
export default async function Page() {
  const t = await getTranslations();
  const response = await fetchPageData();

  const featuredProducts = response?.data?.data.featuredProducts;
  const products = featuredProducts?.products || [];
  const macLink: ActionLinkResponse = {
    id: 1,
    linkUrl: '/categories/mac',
    isExternal: false,
    openInNewTab: false,
    linkText: t('common.view'),
  };
  return (
    <main className="space-y-20 py-16 font-light text-neutral-900 container-max-width">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-gray-200 bg-pink-50 shadow-xl">
        <div className="flex flex-col items-center justify-center bg-white/30 px-6 py-16 text-center backdrop-blur-xl">
          <h1 className="mb-4 text-4xl font-light md:text-6xl">
            {t('whyMacPage.title')}
          </h1>
          <p className="max-w-3xl text-lg md:text-xl">
            {t('whyMacPage.switchToMac.text2')}
          </p>
        </div>
        <Image
          src={macFamilyScreen}
          alt="Mac Family Screen"
          width={1192}
          height={406}
          className="h-auto w-full object-cover"
          priority
        />
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 gap-10 rounded-3xl border border-neutral-200 bg-white/30 p-12 text-center shadow-xl md:grid-cols-3">
        <div>
          <div
            className="mb-4 h-32 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${whyMacDevices.src})` }}
          />
          <h3 className="mb-2 text-xl">{t('whyMacPage.switchToMac.text1')}</h3>
          <p>{t('whyMacPage.whyBuyMac')}</p>
        </div>
        <div>
          <div
            className="mb-4 h-32 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${macBookAirBrandAwareness.src})` }}
          />
          <h3 className="mb-2 text-xl">{t('whyMacPage.macCanDoIt')}</h3>
          <p>{t('whyMacPage.switchToMacText')}</p>
        </div>
        <div>
          <div
            className="mb-4 h-32 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${macFamilyScreen.src})` }}
          />
          <h3 className="mb-2 text-xl">
            {t('whyMacPage.deviceCompatibility')}
          </h3>
          <p>{t('whyMacPage.deviceCompatibilityText')}</p>
        </div>
      </section>

      {/* Device Showcase */}
      <section className="flex flex-col items-center gap-12 md:flex-row">
        <div className="md:w-1/2">
          <h2 className="mb-6 text-3xl font-light md:text-4xl">
            {t('whyMacPage.deviceCompatibility')}
          </h2>
          <p className="text-lg md:text-xl">
            {t('whyMacPage.deviceCompatibilityText')}
          </p>
        </div>
        <div className="md:w-1/2">
          <Image
            src={macBookAirBrandAwareness}
            alt="Why Mac Devices"
            width={1192}
            height={636}
            className="h-auto w-full rounded-3xl border border-gray-200 object-contain shadow-xl"
          />
        </div>
      </section>

      {/* Product List */}
      {products && products.length > 0 && (
        <section>
          <h2 className="mb-8 text-center text-3xl font-light">
            Izdvojeni uređaji
          </h2>
          <ProductsList products={products} />
        </section>
      )}

      {/* Accessories Promo Section */}
      <section className="flex flex-col items-center gap-8 overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-xl md:flex-row">
        <div className="md:w-1/2">
          <Image
            src="/assets/images/mac-acc.jpg"
            alt="Mac Accessories"
            width={800}
            height={600}
            className="h-auto w-full rounded-xl object-cover"
          />
        </div>
        <div className="space-y-4 text-center md:w-1/2 md:text-left">
          <h2 className="text-2xl font-light md:text-3xl">
            Pogledajte dodatke za Mac
          </h2>
          <p className="text-lg">
            Upotpunite svoj Mac iskustvo uz originalne dodatke – od adaptera do
            tastatura.
          </p>
          <Link
            href="/dodaci"
            className="inline-block rounded-full bg-black px-6 py-3 text-white transition hover:bg-neutral-800"
          >
            Prikaži dodatke
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-8 py-16 text-center">
        <InfoBlock
          actionLink={macLink}
          className="mx-auto max-w-xl"
          description={t('whyMacPage.viewAll')}
        />
      </section>
    </main>
  );
}
