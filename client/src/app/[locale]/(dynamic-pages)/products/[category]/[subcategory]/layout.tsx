import { notFound } from 'next/navigation';

import ProductVariantsProvider from '@/app/providers/product-variants-provider';
import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { ProductResponse } from '@/lib/types';

import { ProductTypeResponse } from './[slug]/types';

const getProductOptions = async (
  subCategoryLink: string
): Promise<ProductTypeResponse> => {
  const path = `/api/products/${subCategoryLink}/options`;
  const url = new URL(path, STRAPI_BASE_URL);

  const response = await fetchAPI<ProductTypeResponse>(url.href, {
    method: 'GET',
  });
  if (!response.data) {
    notFound();
  }
  return response.data;
};
const getRelatedProducts = async (
  subCategoryLink: string
): Promise<ProductResponse[]> => {
  const path = `/api/products/${subCategoryLink}/related-products`;
  const url = new URL(path, STRAPI_BASE_URL);

  const response = await fetchAPI<ProductResponse[]>(url.href, {
    method: 'GET',
  });
  if (!response.data) {
    notFound();
  }
  return response.data;
};
export default async function Layout({
  params,
  children,
}: {
  params: Promise<{
    locale: string;
    category: string;
    subcategory: string;
  }>;
  children: React.ReactNode;
}) {
  const { category, subcategory } = await params;

  if (!category || !subcategory) {
    notFound();
  }
  const options = await getProductOptions(subcategory);
  if (!options) {
    notFound();
  }
  const variants = options.variants ?? [];
  const attributes = options.attributes ?? {};
  const relatedProducts = (await getRelatedProducts(subcategory)) ?? [];

  return (
    <ProductVariantsProvider
      productOptions={attributes}
      relatedProducts={relatedProducts}
      variants={variants}
    >
      {children}
    </ProductVariantsProvider>
  );
}
