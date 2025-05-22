/* eslint-disable no-console */
import type { MetadataRoute } from 'next';
import qs from 'qs';

import { getNavbarData } from '@/components/nav-bar/actions';
import { formatNavbarData } from '@/components/nav-bar/utils/formatData';
import { DYNAMIC_PAGES, PAGE_NAMES } from '@/i18n/page-names';
import { routing, Pathname } from '@/i18n/routing';
import { ACCESSORY_CATEGORY_NAME, STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { ProductResponse, SubCategoryItem } from '@/lib/types';

interface ProductsRequestResponse {
  data: ProductResponse[];
}
interface SubCategoriesResponse {
  data: SubCategoryItem[];
}
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl =
    process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000';
  const locales = routing.locales;

  // Static Pages
  const staticPages: MetadataRoute.Sitemap = Object.values(PAGE_NAMES).flatMap(
    (path) => {
      return locales.map((locale) => {
        const localizedPath =
          routing.pathnames[path as Pathname][locale] || path;

        return {
          url: `${siteUrl}${localizedPath}`,
          priority: path === '/' ? 1 : 0.8,
        };
      });
    }
  );
  // TODO: This implementation assumes there are no more than 1000 published and in-stock products.
  // If this limit is exceeded, implement pagination and split the sitemap accordingly.
  // Note: This only generates links for the first 1000 valid products.
  // If the page structure changes, update the logic as needed.

  // Dynamic Product Pages
  const productPages: MetadataRoute.Sitemap = [];
  try {
    const products = await fetchProducts();
    for (const product of products) {
      const { category, productTypeId, productLink, updatedAt } = product;
      for (const locale of locales) {
        const template =
          routing.pathnames[DYNAMIC_PAGES.PRODUCT_DETAILS]?.[locale];

        if (template) {
          const localizedPath = template
            .replace('[category]', category?.link || '')
            .replace('[productTypeId]', productTypeId)
            .replace('[productLink]', productLink);

          const page = {
            url: `${siteUrl}${localizedPath}`,
            priority: 0.7,
            lastModified: new Date().toISOString(),
          };
          if (updatedAt) page.lastModified = new Date(updatedAt).toISOString();
          productPages.push(page);
        }
      }
    }
  } catch (error) {
    console.error('Error fetching products for sitemap:', error);
  }

  // Dynamic Category Pages (from Navbar, localized)
  const categoryPages: MetadataRoute.Sitemap = [];
  try {
    const navbarData = await getNavbarData();
    if (navbarData) {
      const formattedNavItems = formatNavbarData(navbarData);

      for (const item of formattedNavItems) {
        for (const locale of locales) {
          const categorySlug = item.link.split('/').pop() || '';

          // Localized Category Page
          const categoryTemplate =
            routing.pathnames[DYNAMIC_PAGES.CATEGORY_PAGE]?.[locale];
          if (categoryTemplate && categorySlug) {
            const sitemapItem = {
              url: `${siteUrl}${categoryTemplate.replace(
                '[category]',
                categorySlug
              )}`,
              priority: 0.8,
              lastModified: new Date().toISOString(),
            };
            if (item.updatedAt) {
              sitemapItem.lastModified = new Date(item.updatedAt).toISOString();
            }
            categoryPages.push(sitemapItem);
          }

          for (const subItem of item.subItems ?? []) {
            const subSlug = subItem.link.split('/').pop() || '';

            // Localized GroupedSubCategory Page
            const isGrouped = subItem.link.includes(`/${categorySlug}/`);
            if (isGrouped) {
              const groupedTemplate =
                routing.pathnames[DYNAMIC_PAGES.GROUPED_SUBCATEGORY]?.[locale];
              if (groupedTemplate) {
                const sitemapItem = {
                  url: `${siteUrl}${groupedTemplate
                    .replace('[category]', categorySlug)
                    .replace('[groupedSubCategory]', subSlug)}`,
                  priority: 0.7,
                  lastModified: new Date().toISOString(),
                };
                if (subItem.updatedAt) {
                  sitemapItem.lastModified = new Date(
                    subItem.updatedAt
                  ).toISOString();
                }
                categoryPages.push(sitemapItem);
              }
            } else {
              // Localized Accessories Subcategory Page
              const subTemplate =
                routing.pathnames[DYNAMIC_PAGES.ACCESSORIES_SUBCATEGORY]?.[
                  locale
                ];
              if (subTemplate) {
                const item = {
                  url: `${siteUrl}${subTemplate.replace(
                    '[subcategory]',
                    subSlug
                  )}`,
                  priority: 0.7,
                  lastModified: new Date().toISOString(),
                };
                if (subItem.updatedAt) {
                  item.lastModified = new Date(subItem.updatedAt).toISOString();
                }
                categoryPages.push(item);
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('Error fetching navbar for sitemap:', error);
  }

  // Dynamic Accessories Subcategory Pages (localized)
  const accessoriesPages: MetadataRoute.Sitemap = [];
  try {
    const accessorySubcategories = await fetchSubCategories();
    for (const subcategory of accessorySubcategories) {
      const subSlug = subcategory.link || '';

      for (const locale of locales) {
        const subTemplate =
          routing.pathnames[DYNAMIC_PAGES.ACCESSORIES_SUBCATEGORY]?.[locale];

        if (subTemplate && subSlug) {
          const item = {
            url: `${siteUrl}${subTemplate.replace('[subcategory]', subSlug)}`,
            priority: 0.7,
            lastModified: new Date().toISOString(),
          };
          if (subcategory.updatedAt) {
            item.lastModified = new Date(subcategory.updatedAt).toISOString();
          }
          accessoriesPages.push(item);
        }
      }
    }
  } catch (error) {
    console.error('Error fetching accessories for sitemap:', error);
  }
  const allPages = [
    ...staticPages,
    ...productPages,
    ...categoryPages,
    ...accessoriesPages,
  ];
  return allPages;
}

const fetchProducts = async () => {
  const query = qs.stringify({
    populate: {
      category: true,
    },
    pagination: {
      pageSize: 1000,
    },
  });
  const path = '/api/products';
  const url = new URL(path, STRAPI_BASE_URL);
  url.search = query;
  const res = await fetchAPI<ProductsRequestResponse>(url.href, {
    method: 'GET',
    isAuth: false,
  });
  const products = res.data?.data || [];
  return products;
};

async function fetchSubCategories() {
  const query = qs.stringify(
    {
      populate: {
        products: {
          filters: {
            publishedAt: { $notNull: true },
            amountInStock: { $gt: 0 },
          },
        },
      },
      filters: {
        category: {
          name: {
            $eqi: ACCESSORY_CATEGORY_NAME,
          },
        },
        products: {
          publishedAt: {
            $notNull: true,
          },
        },
      },
    },
    { encodeValuesOnly: true }
  );
  const path = '/api/sub-categories';
  const url = new URL(path, STRAPI_BASE_URL);
  url.search = query;
  const res = await fetchAPI<SubCategoriesResponse>(url.href, {
    method: 'GET',
    isAuth: false,
  });
  const items = res?.data?.data || [];
  const filteredItems = items.filter(
    (item) => item.products && item.products.length > 0
  );
  return filteredItems;
}
