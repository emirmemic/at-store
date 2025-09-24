import { DesktopMenu, MobileMenu } from '@/components/nav-bar/components';
import { NavMenuItem, NavSubMenuItem } from './types';

import { ImageProps } from '@/lib/types';
import { PAGE_NAMES } from '@/i18n/page-names';
import { matchesCategory } from '@/lib/utils/link-helpers';
import { useTranslations } from 'next-intl';

interface NavbarProps {
  navbarData: NavMenuItem[];
}
export default function Navbar({ navbarData }: NavbarProps) {
  const t = useTranslations();
  const whyMacIcon = getLocalIcon('why_mac', t('whyMacPage.title'));
  const whyMacSubCategory: NavSubMenuItem = {
    id: 'zasto-mac',
    displayName: t('whyMacPage.title'),
    link: PAGE_NAMES.WHY_MAC,
    icon: whyMacIcon,
  };

  // Helper functions
  function seeAllSubCategory(
    categoryPath: string,
    categoryDisplayName: string
  ): NavSubMenuItem {
    const slug = extractCategorySlug(categoryPath);
    const seeAllAlt = `${t('common.seeAll')} ${categoryDisplayName}`.trim();
    const icon = slug ? getLocalIcon(slug, seeAllAlt || null) : null;
    return {
      id: `see-all-${slug ?? 'category'}`,
      displayName: t('common.seeAll'),
      link: categoryPath,
      icon,
    };
  }

  // Builds a navigation item with custom logic based on its category:
  // - For Mac: retain existing subcategories and add the "Why Mac" subcategory.
  // - For all others: retain existing subcategories and append a "See All"  subcategory if subcategories exist.
  const buildNavItem = (item: NavMenuItem): NavMenuItem => {
    const baseSubItems =
      item.subItems && item.subItems.length > 0
        ? [
            ...(item.subItems ?? []),
            seeAllSubCategory(item.link, item.displayName || item.name),
          ]
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

// Local SVG icons served from the public assets directory of the frontend.
const FRONTEND_IMAGE_BASE = (() => {
  const root = process.env.NEXT_PUBLIC_FRONTEND_URL ?? '';
  const normalizedRoot = root.endsWith('/') ? root.slice(0, -1) : root;
  if (!normalizedRoot) {
    return '/assets/images';
  }
  return `${normalizedRoot}/assets/images`;
})();

function createIconId(name: string): number {
  let hash = 0;
  for (let index = 0; index < name.length; index += 1) {
    hash = (hash << 5) - hash + name.charCodeAt(index);
    hash |= 0;
  }
  return hash || -1;
}

function getLocalIcon(
  name: string,
  alternativeText: string | null = null
): ImageProps | null {
  if (!name) return null;
  const sanitizedName = name.replace(/\.svg$/i, '');
  const iconId = createIconId(sanitizedName);

  return {
    id: iconId,
    documentId: `local-${sanitizedName}`,
    url: `${FRONTEND_IMAGE_BASE}/${sanitizedName}.svg`,
    alternativeText,
    name: sanitizedName,
  };
}

function extractCategorySlug(categoryPath: string): string | null {
  if (!categoryPath) return null;
  const segments = categoryPath.split('/').filter(Boolean);
  if (segments.length === 0) return null;
  const lastSegment = segments[segments.length - 1];
  if (!lastSegment) return null;
  return lastSegment.split('?')[0].split('#')[0];
}
