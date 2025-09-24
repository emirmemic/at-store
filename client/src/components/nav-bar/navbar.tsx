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
  const whyMacIcon = getLocalIcon(
    'shop_why_mac_0c5a1ff96b',
    t('whyMacPage.title')
  );
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
    const icon = slug ? getLocalIcon(`shop_${slug}`, seeAllAlt || null) : null;
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

// Local SVG icons served from /public; extend map as new assets are added.
const LOCAL_ICON_METADATA: Record<string, number> = {
  why_mac: -1,
  shop_ipad: -2,
  shop_music: -3,
  shop_mac: -4,
  shop_dodaci: -5,
};

const LOCAL_ICON_BASE_PATH = '/uploads';
const LOCAL_ICON_SUFFIXES: Record<string, string> = {
  ipad: '_e6fa3b9082',
  music: '_ec098ee8ee',
  mac: '_b6c39267ee',
  accessories: '_2e81ee748d',
};

function resolveLocalIconFileName(name: string): string {
  if (/_([a-f0-9]{10})$/.test(name)) {
    return name;
  }

  const hasShopPrefix = name.startsWith('shop_');
  const slug = hasShopPrefix ? name.slice(5) : name;
  const directSuffix = LOCAL_ICON_SUFFIXES[slug];
  const inferredSuffix = directSuffix
    ? directSuffix
    : Object.entries(LOCAL_ICON_SUFFIXES).find(([keyword]) =>
        slug.includes(keyword)
      )?.[1];

  const base = `${hasShopPrefix ? 'shop_' : ''}${slug}`;
  if (!inferredSuffix || base.endsWith(inferredSuffix)) {
    return base;
  }

  console.log(base, inferredSuffix);
  return `${base}${inferredSuffix}`;
}

function getLocalIcon(
  name: string,
  alternativeText: string | null = null
): ImageProps | null {
  const iconId = LOCAL_ICON_METADATA[name];
  if (iconId === undefined) {
    return null;
  }

  const fileName = resolveLocalIconFileName(name);

  return {
    id: iconId,
    documentId: `local-${name}`,
    url: `${LOCAL_ICON_BASE_PATH}/${fileName}.svg`,
    alternativeText,
    name,
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
