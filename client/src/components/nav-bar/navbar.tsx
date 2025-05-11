import { useTranslations } from 'next-intl';

import { DesktopMenu, MobileMenu } from '@/components/nav-bar/components';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Pathname } from '@/i18n/routing';
import { NavMenuItem } from '@/lib/types';
import { matchesCategory } from '@/lib/utils/link-helpers';

interface NavbarProps {
  navbarData: NavMenuItem[];
}
export default function Navbar({ navbarData }: NavbarProps) {
  const t = useTranslations();
  const whyMacSubCategory = {
    id: 'zasto-mac',
    documentId: 'zasto-mac',
    name: t('whyMacPage.title'),
    displayName: t('whyMacPage.title'),
    pathname: '',
    link: PAGE_NAMES.WHY_MAC,
    startingPrice: 0,
    image: null,
    navbarIcon: null,
    shortDescription: null,
    tag: null,
  };

  // Helper functions
  function seeAllSubCategory(categoryPath: Pathname) {
    return {
      id: 'see-all',
      documentId: 'see-all',
      name: t('common.seeAll'),
      displayName: t('common.seeAll'),
      link: categoryPath,
      startingPrice: 0,
      image: null,
      navbarIcon: null,
      shortDescription: null,
      tag: null,
    };
  }

  // Builds a navigation item with custom logic based on its category:
  // - For Mac: retain existing subcategories and add the "Why Mac" subcategory.
  // - For all others: retain existing subcategories and append a "See All"  subcategory if subcategories exist.
  const buildNavItem = (item: NavMenuItem): NavMenuItem => {
    const baseSubCategories =
      item.subCategories && item.subCategories.length > 0
        ? [
            ...(item.subCategories ?? []),
            seeAllSubCategory(item.link as Pathname),
          ]
        : [];

    if (matchesCategory(item, 'mac')) {
      return {
        ...item,
        subCategories: [...baseSubCategories, whyMacSubCategory],
      };
    }

    return {
      ...item,
      subCategories: baseSubCategories,
    };
  };

  const createSupportItem = (): NavMenuItem => ({
    id: 'podraska',
    documentId: 'podraska',
    name: t('footer.services.support'),
    displayName: t('footer.services.support'),
    link: PAGE_NAMES.SUPPORT,
    startingPrice: 0,
    image: null,
    subCategories: [],
  });

  // Final composed data
  const finalNavbarData: NavMenuItem[] = [
    ...navbarData.map(buildNavItem),
    createSupportItem(),
  ];
  return (
    <nav className="fixed top-0 z-50 flex h-nav-height w-screen bg-black pr-4">
      <MobileMenu className="md:hidden" menuItems={finalNavbarData} />
      <DesktopMenu className="hidden md:flex" menuItems={finalNavbarData} />
    </nav>
  );
}
