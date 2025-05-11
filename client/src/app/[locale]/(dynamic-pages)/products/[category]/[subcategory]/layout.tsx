import { notFound } from 'next/navigation';

import ProductVariantsProvider from '@/app/providers/product-variants-provider';
import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';

import { ProductTypeResponse } from './[slug]/types';

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
  const path = `/api/products/${subcategory}/options`;
  const url = new URL(path, STRAPI_BASE_URL);

  const response = await fetchAPI<ProductTypeResponse>(url.href, {
    method: 'GET',
  });
  if (!response.data) {
    notFound();
  }

  const variants = response.data.variants ?? [];
  const attributes = response.data.attributes ?? {};

  return (
    <ProductVariantsProvider productOptions={attributes} variants={variants}>
      {children}
    </ProductVariantsProvider>
  );
}
