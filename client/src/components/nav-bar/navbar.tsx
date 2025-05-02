import { useTranslations } from 'next-intl';

import { DesktopMenu, MobileMenu } from '@/components/nav-bar/components';
import { placeholderCart } from '@/data/dummy-data';
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
    link: PAGE_NAMES.WHY_MAC,
    startingPrice: 0,
    image: null,
    navbarIcon: null,
    shortDescription: null,
    tag: null,
  };
  const finalNavbarData: NavMenuItem[] = [
    ...navbarData.map((item) => {
      const lowerCaseName = item.name.toLowerCase();
      const lowerCaseDisplayName = item.displayName?.toLowerCase();
      const isMac =
        lowerCaseName.includes('mac') || lowerCaseDisplayName?.includes('mac');
      if (isMac) {
        return {
          ...item,
          subCategories: [...(item.subCategories || []), whyMacSubCategory],
        };
      }
      return item;
    }),
    {
      id: 'podraska',
      documentId: 'podraska',
      name: t('footer.services.support'),
      displayName: t('footer.services.support'),
      link: PAGE_NAMES.SUPPORT,
      startingPrice: 0,
      image: null,
      subCategories: [],
    },
  ];

  return (
    <nav className="fixed top-0 z-50 flex h-nav-height w-screen bg-black pr-4">
      <MobileMenu
        cartCount={placeholderCart.length}
        className="md:hidden"
        menuItems={finalNavbarData}
      />
      <DesktopMenu
        cart={placeholderCart}
        className="hidden md:flex"
        menuItems={finalNavbarData}
      />
    </nav>
  );
}
