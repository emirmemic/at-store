import { ProductTypeResponse, ProductVariant } from './[productLink]/types';

import { ProductResponse } from '@/lib/types';
import ProductVariantsProvider from '@/app/providers/product-variants-provider';
import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { notFound } from 'next/navigation';

const getVariantBasePrice = (variant: ProductVariant): number => {
  const price = variant.discountedPrice ?? variant.originalPrice;
  if (price === null || price === undefined) {
    return Number.POSITIVE_INFINITY;
  }
  const numericPrice = Number(price);
  return Number.isNaN(numericPrice) ? Number.POSITIVE_INFINITY : numericPrice;
};

const getProductOptions = async (
  subCategoryLink: string
): Promise<ProductTypeResponse> => {
  // Decode the subCategoryLink to handle encoded special characters
  const decodedSubCategoryLink = decodeURIComponent(subCategoryLink);
  const path = `/api/products/${decodedSubCategoryLink}/options`;
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
  // Decode the subCategoryLink to handle encoded special characters
  const decodedSubCategoryLink = decodeURIComponent(subCategoryLink);
  const path = `/api/products/${decodedSubCategoryLink}/related-products`;
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
  const variants = [...(options.variants ?? [])].sort(
    (a, b) => getVariantBasePrice(a) - getVariantBasePrice(b)
  );
  const attributes = options.attributes ?? {};
  const hasCuratedRelated = variants.some(
    (variant) => variant.subCategory?.related_group?.products?.length
  );

  let legacyRelatedProducts: ProductResponse[] = [];

  if (!hasCuratedRelated) {
    // Fallback to the legacy compatibility endpoint until all products have curated bundles.
    legacyRelatedProducts = (await getRelatedProducts(productTypeId)) ?? [];
  }

  return (
    <ProductVariantsProvider
      productOptions={attributes}
      legacyRelatedProducts={legacyRelatedProducts}
      variants={variants}
    >
      {children}
    </ProductVariantsProvider>
  );
}
