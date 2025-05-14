import {
  CategoryItem,
  GroupedSubCategoryItem,
  ImageProps,
  SubCategoryItem,
} from '@/lib/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const POPUP_TYPES = ['none', 'menu', 'search'] as const;
type PopupType = (typeof POPUP_TYPES)[number];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MOBILE_MENU_TYPES = ['list', 'sub-list', 'search'] as const;
type MobileMenuType = (typeof MOBILE_MENU_TYPES)[number];

interface NavMenuItem {
  id: string;
  name: string;
  displayName: string;
  link: string;
  subItems?: NavSubMenuItem[];
}
interface NavSubMenuItem {
  id: string;
  displayName: string;
  link: string;
  icon: ImageProps | null;
}

interface NavbarResponseItem {
  category: CategoryItem;
  subCategories: SubCategoryItem[];
  groupedSubCategories: GroupedSubCategoryItem[];
}
interface NavbarResponseData {
  items: NavbarResponseItem[];
}
export type {
  PopupType,
  MobileMenuType,
  NavbarResponseData,
  NavbarResponseItem,
  NavMenuItem,
  NavSubMenuItem,
};
