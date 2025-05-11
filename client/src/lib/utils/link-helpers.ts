import { PAGE_NAMES } from '@/i18n/page-names';
import { ACCESSORY_CATEGORY_NAME } from '@/lib/constants';
import { NavMenuItem, SubCategoryItem } from '@/lib/types';

const matchesCategory = (item: NavMenuItem, categoryName: string): boolean => {
  const check = (str?: string) =>
    str?.toLowerCase().includes(categoryName.toLowerCase()) ?? false;
  return check(item.name) || check(item.displayName);
};
const makeSubCategoryLink = (
  item: SubCategoryItem,
  categoryLink: string
): string => {
  return `${PAGE_NAMES.PRODUCTS}/${categoryLink}/${item.link}`;
};
const updateSubCategoryLink = (
  item: SubCategoryItem,
  isAccessory: boolean,
  categoryLink: string,
  firstProductLink: string = ''
): SubCategoryItem => {
  let link;
  if (isAccessory) {
    link = `${PAGE_NAMES.ACCESSORIES}/${item.link}`;
  } else {
    link = `${PAGE_NAMES.PRODUCTS}/${categoryLink}/${item.link}/${firstProductLink}`;
  }

  return {
    ...item,
    link,
  };
};
const updateCategoryLink = (item: NavMenuItem): NavMenuItem => {
  let link;
  if (matchesCategory(item, ACCESSORY_CATEGORY_NAME)) {
    link = PAGE_NAMES.ACCESSORIES;
    const newSubCategories = item.subCategories?.map((sub) =>
      updateSubCategoryLink(sub, true, item.link)
    );
    return {
      ...item,
      link,
      subCategories: newSubCategories,
    };
  } else {
    link = `${PAGE_NAMES.CATEGORY}/${item.link}`;
    const newSubCategories = item.subCategories?.map((sub) => {
      const firstProductLink = sub.products?.[0]?.productLink ?? '';
      return updateSubCategoryLink(sub, false, item.link, firstProductLink);
    });
    return {
      ...item,
      link,
      subCategories: newSubCategories,
    };
  }
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
  updateSubCategoryLink,
  updateCategoryLink,
  makeProductLink,
};
