import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { ProductResponse } from '@/lib/types';

import { Content } from './components';

interface GenerateMetadataParams {
  params: Promise<{ locale: string; slug: string }>;
}

async function fetchPageData(slug: string) {
  const path = `/api/products/link/${slug}`;
  const url = new URL(path, STRAPI_BASE_URL);

  const res = await fetchAPI<ProductResponse>(url.href, {
    method: 'GET',
  });
  return res;
}

export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale, slug } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'metaData.mac',
  });
  const response = await fetchPageData(slug);
  const productData = response.data;
  const title = productData ? `${productData.name} | AT Store` : t('title');
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

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) {
    redirect('/');
  }
  const response = await fetchPageData(slug);
  if (!response?.data) {
    redirect('/');
  }
  const productData = response.data;

  if (!productData) {
    redirect('/');
  }
  return <Content {...productData} />;
}
