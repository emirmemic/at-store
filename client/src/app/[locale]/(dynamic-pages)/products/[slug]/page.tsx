import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import ProductVariantsProvider from '@/app/providers/product-variants-provider';
import { InfoBlock } from '@/components';
import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';

import { ProductDetails } from './components';
import { getInfoBlocksData } from './data';
import { MetadataResponse, ProductTypeResponse } from './types';

interface GenerateMetadataParams {
  params: Promise<{ locale: string; slug: string }>;
}
async function fetchMetadata(slug: string) {
  const path = `/api/products/${slug}/metadata`;
  const url = new URL(path, STRAPI_BASE_URL);

  const res = await fetchAPI<MetadataResponse>(url.href, {
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
  const response = await fetchMetadata(slug);
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

export default async function Page({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }
  const path = `/api/products/${slug}/options`;
  const url = new URL(path, STRAPI_BASE_URL);

  const response = await fetchAPI<ProductTypeResponse>(url.href, {
    method: 'GET',
  });
  if (!response.data) {
    notFound();
  }

  const variants = response.data.variants ?? [];
  const attributes = response.data.attributes ?? {};
  const product = variants.find((v) => v.productLink === slug);

  if (!product) notFound();

  const t = await getTranslations();
  const infoBlocks = getInfoBlocksData(t);
  return (
    <ProductVariantsProvider
      initialVariant={product}
      productOptions={attributes}
      variants={variants}
    >
      <main className="flex flex-col gap-24 py-8 container-max-width md:py-20">
        <ProductDetails />
        {/* TODO Make related products once we see the device compatibility response */}
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
    </ProductVariantsProvider>
  );
}
