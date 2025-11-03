import { DYNAMIC_PAGES, PAGE_NAMES } from '@/i18n/page-names';

import { ACCESSORY_CATEGORY_NAME } from '@/lib/constants';
import { SubCategoryItem } from '../types';

const getBasePrice = (product?: {
  discountedPrice?: number | null;
  originalPrice: number;
}): number => {
  if (!product) return Number.POSITIVE_INFINITY;
  const price = product.discountedPrice ?? product.originalPrice;
  if (price === null || price === undefined) {
    return Number.POSITIVE_INFINITY;
  }
  const numericPrice = Number(price);
  return Number.isNaN(numericPrice) ? Number.POSITIVE_INFINITY : numericPrice;
};

const getCheapestProduct = <
  T extends { discountedPrice?: number | null; originalPrice: number },
>(
  products: T[] | undefined | null
): T | null => {
  if (!products || products.length === 0) {
    return null;
  }

  const cheapest = products.reduce<T | null>((cheapest, product) => {
    if (!cheapest) {
      return product;
    }
    const productPrice = getBasePrice(product);
    const cheapestPrice = getBasePrice(cheapest);

    return productPrice < cheapestPrice ? product : cheapest;
  }, null);

  return cheapest;
};

const matchesCategory = ({
  name,
  categoryName,
}: {
  name?: string;
  categoryName: string;
}): boolean => {
  const check = (str?: string) =>
    str?.toLowerCase().includes(categoryName.toLowerCase()) ?? false;
  return check(name);
};
const isAccessory = (name: string): boolean => {
  return matchesCategory({
    name,
    categoryName: ACCESSORY_CATEGORY_NAME,
  });
};

const makeCategoryLink = (
  categoryLink: string,
  name: string,
  displayName: string
): string => {
  if (isAccessory(name || displayName)) {
    return PAGE_NAMES.ACCESSORIES;
  }
  return `${DYNAMIC_PAGES.CATEGORIES}/${categoryLink}`;
};
const makeSubCategoryLink = (
  categoryLink: string,
  subCategory: SubCategoryItem
): string => {
  const name = subCategory.name || subCategory.displayName;
  const subCategoryLink = subCategory?.link || '';
  const cheapestProduct = getCheapestProduct(subCategory.products || []);
  const fallbackProduct = subCategory.products?.[0];
  const productTypeId =
    cheapestProduct?.productTypeId || fallbackProduct?.productTypeId || '';
  const productLink =
    cheapestProduct?.productLink || fallbackProduct?.productLink || '';

  if (isAccessory(name)) {
    return `${PAGE_NAMES.ACCESSORIES}/${subCategoryLink}`;
  }
  // Triple encode dots - Next.js decodes multiple times during routing
  const encodedProductTypeId = encodeURIComponent(productTypeId).replace(
    /\./g,
    '%25252E'
  );
  const encodedProductLink = encodeURIComponent(productLink).replace(
    /\./g,
    '%25252E'
  );
  return `${DYNAMIC_PAGES.PRODUCTS}/${categoryLink}/${encodedProductTypeId}/${encodedProductLink}`;
};
const makeGroupedSubCategoryLink = (
  categoryLink: string,
  groupedSubCategoryLink: string
): string => {
  return `${DYNAMIC_PAGES.CATEGORIES}/${categoryLink}/${groupedSubCategoryLink}`;
};

const makeProductLink = (
  categoryLink: string,
  productTypeId: string,
  productLink: string
): string => {
  console.warn('⚠️ makeProductLink called with:', {
    categoryLink,
    productTypeId,
    productLink,
  });

  const lowerCased = productTypeId.toLowerCase();
  // Triple encode dots - Next.js decodes multiple times during routing
  const encodedProductTypeId = encodeURIComponent(lowerCased).replace(
    /\./g,
    '%25252E'
  );
  const encodedProductLink = encodeURIComponent(productLink).replace(
    /\./g,
    '%25252E'
  );
  const result = `${DYNAMIC_PAGES.PRODUCTS}/${categoryLink}/${encodedProductTypeId}/${encodedProductLink}`;

  console.warn('⚠️ makeProductLink result:', result);

  return result;
};

export {
  matchesCategory,
  isAccessory,
  makeCategoryLink,
  makeProductLink,
  makeSubCategoryLink,
  makeGroupedSubCategoryLink,
};
