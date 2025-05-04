import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { ProductListTitle, ProductsList } from '@/components/product-cards';
import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { ProductResponse, SubCategoryItem } from '@/lib/types';

interface Response extends SubCategoryItem {
  products: ProductResponse[];
}
interface GenerateMetadataParams {
  params: Promise<{ locale: string; slug: string }>;
}
async function fetchCategory(slug: string) {
  const path = `/api/sub-categories/by-slug/${slug}`;
  const url = new URL(path, STRAPI_BASE_URL);

  const res = await fetchAPI<Response>(url.href, {
    method: 'GET',
  });
  return res;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale, slug } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'metaData.category',
  });
  const response = await fetchCategory(slug);
  const data = response.data;
  if (data) {
    const title = `${data.metaTitle || data.displayName} | AT Store`;
    const description = data.metaDescription || t('description');
    const productImages = data?.image ? [data.image] : [];
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
  const response = await fetchCategory(slug);
  if (!response) {
    notFound();
  }
  const subCategoryData = response.data;

  if (!subCategoryData) {
    notFound();
  }

  const { displayName } = subCategoryData;
  const products = subCategoryData.products;
  const t = await getTranslations('common');
  return (
    <main className="mx-auto max-w-[1200px] px-4 pb-28 pt-11">
      <ProductListTitle title={displayName} />
      <div className="py-14">
        {products.length === 0 ? (
          <p className="text-grey paragraph-2">{t('noProductsAvailable')}</p>
        ) : (
          <ProductsList productCardVariant="standard" products={products} />
        )}
      </div>
    </main>
  );
}
