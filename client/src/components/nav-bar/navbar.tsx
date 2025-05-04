import { useTranslations } from 'next-intl';

import { DesktopMenu, MobileMenu } from '@/components/nav-bar/components';
import { PAGE_NAMES } from '@/i18n/page-names';
import { NavMenuItem } from '@/lib/types';

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
  const isMacItem = (item: NavMenuItem): boolean => {
    const checkString = (str?: string) =>
      (str || '').toLowerCase().includes('mac');
    return checkString(item.name) || checkString(item.displayName);
  };

  const processSubcategories = (item: NavMenuItem) => {
    return (
      item?.subCategories?.map((subItem) => {
        if (isMacItem(subItem)) {
          return {
            ...subItem,
            subCategories: [whyMacSubCategory],
          };
        }
        return subItem;
      }) || []
    );
  };

  const buildNavItem = (item: NavMenuItem): NavMenuItem => {
    return {
      ...item,
      subCategories: processSubcategories(item),
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
      <MobileMenu
        cartCount={0}
        className="md:hidden"
        menuItems={finalNavbarData}
      />
      <DesktopMenu
        cart={[]}
        className="hidden md:flex"
        menuItems={finalNavbarData}
      />
    </nav>
  );
}
