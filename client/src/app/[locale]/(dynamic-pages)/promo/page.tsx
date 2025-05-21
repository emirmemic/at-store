import { getTranslations } from 'next-intl/server';
import qs from 'qs';

import { InfoBlock } from '@/components';
import CurrentPromotions from '@/components/strapi/single-types/current-promotions/current-promotions';
import PromoSliderWrapper from '@/components/strapi/single-types/promo-slider/promo-slider-wrapper';
import { STRAPI_BASE_URL, STRAPI_IMAGE_FIELDS } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';

import ProductsSlider from './products-slider';
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
      products: {
        populate: {
          images: {
            fields: STRAPI_IMAGE_FIELDS,
          },
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
  const products = response?.data?.data.products || [];

  return (
    <div className="flex flex-col gap-16 py-10 md:py-14">
      <h1 className="text-center heading-1 container-max-width">
        {t('title')}
      </h1>
      <PromoSliderWrapper className="container-max-width-xl" />
      <CurrentPromotions className="pl-6 container-max-width-lg md:pl-12" />
      <div className="flex flex-col gap-16 container-max-width">
        {info && (
          <InfoBlock
            actionLink={info.actionLink}
            description={info.description}
            title={info.title ?? ''}
          />
        )}
      </div>
      {products.length > 0 && <ProductsSlider products={products} />}
    </div>
  );
}
