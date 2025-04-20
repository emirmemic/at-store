import { getTranslations } from 'next-intl/server';
import qs from 'qs';

import { InfoBlock } from '@/components';
import CurrentPromotions from '@/components/strapi/single-types/current-promotions/current-promotions';
import PromoSliderWrapper from '@/components/strapi/single-types/promo-slider/promo-slider-wrapper';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';

import { PromoPageResponseData } from './types';

interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData' });

  return {
    title: t('promo.title'),
    description: t('promo.description'),
    openGraph: {
      title: t('promo.title'),
      description: t('promo.description'),
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
  });
  return res;
}

export default async function Page() {
  const t = await getTranslations('promoPage');
  const response = await fetchPageData();
  const info = response?.data?.data.infoBlock || null;

  return (
    <div className="flex flex-col gap-16 py-10 md:py-14">
      <h1 className="text-center heading-1 container-max-width">
        {t('title')}
      </h1>
      <PromoSliderWrapper className="container-max-width-lg" />
      {response.error && (
        <Alert
          dismissible
          className="mx-auto max-w-72 px-4"
          variant="destructive"
        >
          <AlertDescription>{response.error.message}</AlertDescription>
        </Alert>
      )}
      <div className="flex flex-col gap-16 container-max-width">
        <CurrentPromotions />
        {info && (
          <InfoBlock
            actionLink={info.actionLink}
            description={info.description}
            title={info.title ?? ''}
          />
        )}
      </div>
      {/* TODO Implement the last section with product cards once the products are configured  */}
    </div>
  );
}
