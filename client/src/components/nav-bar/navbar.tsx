import { DesktopMenu, MobileMenu } from '@/components/nav-bar/components';
import { NavMenuItem, NavSubMenuItem } from './types';

import { PAGE_NAMES } from '@/i18n/page-names';
import { Pathname } from '@/i18n/routing';
import { matchesCategory } from '@/lib/utils/link-helpers';
import { useTranslations } from 'next-intl';

interface NavbarProps {
  navbarData: NavMenuItem[];
}
export default function Navbar({ navbarData }: NavbarProps) {
  const t = useTranslations();
  const whyMacSubCategory: NavSubMenuItem = {
    id: 'zasto-mac',
    displayName: t('whyMacPage.title'),
    link: PAGE_NAMES.WHY_MAC,
    icon: null,
  };

  // Helper functions
  function seeAllSubCategory(categoryPath: Pathname): NavSubMenuItem {
    return {
      id: 'see-all',
      displayName: t('common.seeAll'),
      link: categoryPath,
      icon: null,
    };
  }

  // Builds a navigation item with custom logic based on its category:
  // - For Mac: retain existing subcategories and add the "Why Mac" subcategory.
  // - For all others: retain existing subcategories and append a "See All"  subcategory if subcategories exist.
  const buildNavItem = (item: NavMenuItem): NavMenuItem => {
    const baseSubItems =
      item.subItems && item.subItems.length > 0
        ? [...(item.subItems ?? []), seeAllSubCategory(item.link as Pathname)]
        : [];

    if (
      matchesCategory({
        name: item.name || item.displayName,
        categoryName: 'mac',
      })
    ) {
      return {
        ...item,
        subItems: [...baseSubItems, whyMacSubCategory],
      };
    }

    return {
      ...item,
      subItems: baseSubItems,
    };
  };

  const createSupportItem = (): NavMenuItem => ({
    id: 'podraska',
    name: t('footer.services.support'),
    displayName: t('footer.services.support'),
    link: PAGE_NAMES.SUPPORT,
    subItems: [],
  });

  // Final composed data
  const finalNavbarData: NavMenuItem[] = [
    ...navbarData.map(buildNavItem),
    createSupportItem(),
  ];
  return (
    <nav className="fixed top-0 z-[500] flex h-nav-height w-screen bg-white/10">
      <MobileMenu className="md:hidden" menuItems={finalNavbarData} />
      <DesktopMenu className="hidden md:flex" menuItems={finalNavbarData} />
    </nav>
  );
}
