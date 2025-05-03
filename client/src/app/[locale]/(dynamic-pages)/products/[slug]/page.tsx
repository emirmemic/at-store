import { redirect, notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { InfoBlock } from '@/components';
import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { ProductResponse, ProductTypeResponse } from '@/lib/types';

import { ProductDetails } from './components';
import { getInfoBlocksData } from './data';
interface GenerateMetadataParams {
  params: Promise<{ locale: string; slug: string }>;
}
async function fetchUniqueProduct(slug: string) {
  const path = `/api/products/link/${slug}`;
  const url = new URL(path, STRAPI_BASE_URL);

  const res = await fetchAPI<ProductResponse>(url.href, {
    method: 'GET',
  });
  return res;
}
async function fetchProductOptions(productTypeId: string) {
  const path = `/api/products/${productTypeId}/options`;
  const url = new URL(path, STRAPI_BASE_URL);

  const res = await fetchAPI<ProductTypeResponse>(url.href, {
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
  const response = await fetchUniqueProduct(slug);
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
  const t = await getTranslations();

  if (!slug) {
    notFound();
  }
  const response = await fetchUniqueProduct(slug);
  if (!response?.data) {
    notFound();
  }
  const productData = response.data;
  let productTypeResponse: ProductTypeResponse = {
    productTypeId: '',
  };

  if (productData.productTypeId) {
    const response = await fetchProductOptions(productData.productTypeId);
    productTypeResponse = response.data || {
      productTypeId: productData.productTypeId,
    };
  }

  if (!productData) {
    redirect('/');
  }

  const infoBlocks = getInfoBlocksData(t);
  return (
    <main className="flex flex-col gap-24 py-8 container-max-width md:py-20">
      <ProductDetails
        productData={productData}
        productOptions={productTypeResponse}
      />
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
  );
}
