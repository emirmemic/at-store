import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { InfoBlock } from '@/components';
import { STRAPI_BASE_URL } from '@/lib/constants';
import { getInfoBlocksData } from '@/lib/data';
import { fetchAPI } from '@/lib/fetch-api';

import { ProductDetails } from './components';
import RelatedProducts from './components/related-products';
import { MetadataResponse } from './types';

interface GenerateMetadataParams {
  params: Promise<{ locale: string; productLink: string }>;
}
async function fetchMetadata(productLink: string) {
  const path = `/api/products/${productLink}/metadata`;
  const url = new URL(path, STRAPI_BASE_URL);

  const res = await fetchAPI<MetadataResponse>(url.href, {
    method: 'GET',
    isAuth: false,
  });
  return res;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale, productLink } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'metaData.productDetails',
  });
  const response = await fetchMetadata(productLink);
  const productData = response.data;
  const title = productData ? `${productData.title} | AT Store` : t('title');
  const description = productData ? productData.description : t('description');
  const productImages = productData?.images || [];
  const productImagesOP = productImages.map((image) => ({
    url: STRAPI_BASE_URL + image.url,
    alt: image.alternativeText || 'AT Store',
  }));
  const images = productImagesOP.length
    ? productImagesOP
    : [
        {
          url: '/images/open-graph.jpg',
          width: 1200,
          height: 630,
          alt: 'AT Store',
        },
      ];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images,
    },
  };
}
export default function Page() {
  const t = useTranslations();

  const infoBlocks = getInfoBlocksData(t);
  return (
    <main className="flex flex-col gap-24 py-8 container-max-width md:py-20">
      <ProductDetails />
      <RelatedProducts />
      <div className="flex flex-col items-center justify-center gap-8">
        {infoBlocks.map((infoBlock) => (
          <InfoBlock
            key={infoBlock.id}
            actionLink={infoBlock.actionLink}
            className="w-full md:max-w-[688px] lg:max-w-[1058px]"
            description={infoBlock.description}
            isFavorites={infoBlock.isFavorites}
            title={infoBlock.title}
          />
        ))}
      </div>
    </main>
  );
}
