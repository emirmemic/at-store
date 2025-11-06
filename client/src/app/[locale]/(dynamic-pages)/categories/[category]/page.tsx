import { CategoryItem, SubCategoryItem } from '@/lib/types';
import { ProductListTitle, SubProductCard } from '@/components/product-cards';
import { STRAPI_BASE_URL, STRAPI_IMAGE_FIELDS } from '@/lib/constants';

import { PAGE_NAMES } from '@/i18n/page-names';
import { fetchAPI } from '@/lib/fetch-api';
import { getTranslations } from 'next-intl/server';
import { makeSubCategoryLink } from '@/lib/utils/link-helpers';
import { notFound } from 'next/navigation';
import qs from 'qs';

interface CategoryResponse extends CategoryItem {
  subCategories: SubCategoryItem[];
}
interface GenerateMetadataParams {
  params: Promise<{ locale: string; category: string }>;
}

async function fetchCategory(slug: string) {
  const path = `/api/categories/by-slug/${slug}`;
  const query = qs.stringify({
    populate: {
      image: {
        fields: STRAPI_IMAGE_FIELDS,
      },
    },
  });
  const url = new URL(path, STRAPI_BASE_URL);
  url.search = query;
  const res = await fetchAPI<CategoryResponse>(url.href, {
    method: 'GET',
    isAuth: false,
  });
  return res;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale, category } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'metaData.category',
  });
  const response = await fetchCategory(category);
  const categoryData = response.data;
  if (categoryData) {
    const title = `${categoryData.metaTitle || categoryData.displayName} | AT Store`;
    const description = categoryData.metaDescription || t('description');
    const productImages = categoryData?.image ? [categoryData.image] : [];
    const productImagesOP = productImages.map((image) => ({
      url: STRAPI_BASE_URL + image.url,
      alt: image.alternativeText || 'AT Store',
    }));
    const images = productImagesOP.length
      ? productImagesOP
      : [
          {
            url: '/assets/images/open-graph.jpg',
            width: 1200,
            height: 630,
            alt: 'AT Store',
          },
        ];

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images,
      },
    };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{
    category: string;
  }>;
}) {
  const { category } = await params;

  if (!category) {
    notFound();
  }
  const response = await fetchCategory(category);
  if (!response) {
    notFound();
  }
  const categoryData = response.data;
  if (!categoryData) {
    notFound();
  }

  const t = await getTranslations();

  console.log(categoryData.subCategories);

  return (
    <main className="pb-28 pt-11 container-max-width">
      <ProductListTitle title={categoryData.displayName} />
      <div className="flex flex-col gap-4 py-16 lg:grid lg:grid-cols-1">
        {categoryData.subCategories.map((subCategory) => (
          <SubProductCard
            key={subCategory.id}
            buttonText={t('common.see')}
            image={subCategory.image}
            link={makeSubCategoryLink(categoryData.link, subCategory)}
            title={subCategory.displayName || subCategory.name}
            shortDescription={subCategory.shortDescription}
            modalText={subCategory.modalText}
          />
        ))}
      </div>
    </main>
  );
}
