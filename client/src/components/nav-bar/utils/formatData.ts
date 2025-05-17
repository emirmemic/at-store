import {
  makeCategoryLink,
  makeGroupedSubCategoryLink,
  makeSubCategoryLink,
} from '@/lib/utils/link-helpers';

import { NavbarResponseItem, NavMenuItem, NavSubMenuItem } from '../types';

const formatNavbarData = (items: NavbarResponseItem[]): NavMenuItem[] => {
  return items.map((item) => {
    if (!item.category) {
      return {
        id: String(item.id),
        name: '',
        displayName: '',
        link: '',
        subItems: [],
        groupedSubCategories: [],
      };
    }

    // Build base category link
    const categoryLink = makeCategoryLink(
      item.category.link,
      item.category.name,
      item.category.displayName
    );

    let subItems: NavSubMenuItem[] = [];

    // Use groupedSubCategories if present
    if (item.groupedSubCategories && item.groupedSubCategories.length > 0) {
      subItems = item.groupedSubCategories.map((group) => ({
        id: group.id,
        displayName: group.displayName,
        link: makeGroupedSubCategoryLink(item.category.link, group.slug),
        icon: group.navbarIcon ?? null,
      }));
    }
    // Otherwise use subCategories
    else if (item.subCategories && item.subCategories.length > 0) {
      subItems = item.subCategories.map((sub) => ({
        id: sub.id,
        displayName: sub.displayName,
        link: makeSubCategoryLink(item.category.link, sub),
        icon: sub.navbarIcon ?? null,
      }));
    }

    return {
      id: item.category.id,
      name: item.category.name,
      displayName: item.category.displayName,
      link: categoryLink,
      subItems,
    };
  });
};

export { formatNavbarData };
