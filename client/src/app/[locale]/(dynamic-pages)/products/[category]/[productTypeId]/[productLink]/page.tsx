import { MetadataResponse } from './types';
import { ProductDetails } from './components';
import RelatedProducts from './components/related-products';
import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { getTranslations } from 'next-intl/server';

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
          url: '/assets/images/open-graph.jpg',
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
  return (
    <main className="flex flex-col gap-24 py-8 container-max-width md:py-20">
      <ProductDetails />
      <RelatedProducts />
    </main>
  );
}
