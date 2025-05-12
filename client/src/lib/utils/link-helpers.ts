import { PAGE_NAMES } from '@/i18n/page-names';
import { ACCESSORY_CATEGORY_NAME } from '@/lib/constants';

import { SubCategoryItem } from '../types';

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
  return `${PAGE_NAMES.CATEGORIES}/${categoryLink}`;
};
const makeSubCategoryLink = (
  categoryLink: string,
  subCategory: SubCategoryItem
): string => {
  const name = subCategory.name || subCategory.displayName;
  const subCategoryLink = subCategory?.link || '';
  const firstProduct = subCategory.products?.[0];
  const productTypeId = firstProduct?.productTypeId || '';
  const productLink = firstProduct?.productLink || '';
  if (isAccessory(name)) {
    return `${PAGE_NAMES.ACCESSORIES}/${subCategoryLink}`;
  }
  return `${PAGE_NAMES.PRODUCTS}/${categoryLink}/${productTypeId}/${productLink}`;
};
const makeGroupedSubCategoryLink = (
  categoryLink: string,
  groupedSubCategoryLink: string
): string => {
  return `${PAGE_NAMES.CATEGORIES}/${categoryLink}/${groupedSubCategoryLink}`;
};

const makeProductLink = (
  categoryLink: string,
  productTypeId: string,
  productLink: string
): string => {
  const lowerCased = productTypeId.toLowerCase();
  return `${PAGE_NAMES.PRODUCTS}/${categoryLink}/${lowerCased}/${productLink}`;
};

export {
  matchesCategory,
  isAccessory,
  makeCategoryLink,
  makeProductLink,
  makeSubCategoryLink,
  makeGroupedSubCategoryLink,
};
