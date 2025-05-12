import { CategoryItem } from '@/lib/types';
import {
  makeCategoryLink,
  makeGroupedSubCategoryLink,
  makeSubCategoryLink,
} from '@/lib/utils/link-helpers';

import { NavMenuItem, NavSubMenuItem } from '../types';

const formatNavbarData = (items: CategoryItem[]): NavMenuItem[] => {
  return items.map((category) => {
    // Build base category link
    const categoryLink = makeCategoryLink(
      category.link,
      category.name,
      category.displayName
    );

    let subItems: NavSubMenuItem[] = [];

    // Use groupedSubCategories if present
    if (
      category.groupedSubCategories &&
      category.groupedSubCategories.length > 0
    ) {
      subItems = category.groupedSubCategories.map((group) => ({
        id: group.id,
        displayName: group.displayName,
        link: makeGroupedSubCategoryLink(category.link, group.slug),
        icon: group.navbarIcon ?? null,
      }));
    }
    // Otherwise use subCategories
    else if (category.subCategories && category.subCategories.length > 0) {
      subItems = category.subCategories.map((sub) => ({
        id: sub.id,
        displayName: sub.displayName,
        link: makeSubCategoryLink(category.link, sub),
        icon: sub.navbarIcon ?? null,
      }));
    }

    return {
      id: category.id,
      name: category.name,
      displayName: category.displayName,
      link: categoryLink,
      subItems,
    };
  });
};

export { formatNavbarData };
