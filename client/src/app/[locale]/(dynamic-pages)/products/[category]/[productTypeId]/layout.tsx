import { notFound } from 'next/navigation';

import ProductVariantsProvider from '@/app/providers/product-variants-provider';
import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { ProductResponse } from '@/lib/types';

import { ProductTypeResponse } from './[productLink]/types';

const getProductOptions = async (
  subCategoryLink: string
): Promise<ProductTypeResponse> => {
  const path = `/api/products/${subCategoryLink}/options`;
  const url = new URL(path, STRAPI_BASE_URL);

  const response = await fetchAPI<ProductTypeResponse>(url.href, {
    method: 'GET',
    isAuth: false,
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
    isAuth: false,
  });
  if (!response.data) {
    return [];
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
    productTypeId: string;
  }>;
  children: React.ReactNode;
}) {
  const { category, productTypeId } = await params;
  if (!category || !productTypeId) {
    notFound();
  }
  const options = await getProductOptions(productTypeId);
  if (!options) {
    notFound();
  }
  const variants = options.variants ?? [];
  const attributes = options.attributes ?? {};
  const relatedProducts = (await getRelatedProducts(productTypeId)) ?? [];

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
