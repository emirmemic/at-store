import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import qs from 'qs';

import { InfoBlock } from '@/components';
import { ProductListTitle, SubProductCard } from '@/components/product-cards';
import { PAGE_NAMES } from '@/i18n/page-names';
import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { CategoryItem, SubCategoryItem } from '@/lib/types';

interface CategoryResponse extends CategoryItem {
  subCategories: SubCategoryItem[];
}
interface GenerateMetadataParams {
  params: Promise<{ locale: string; slug: string }>;
}

async function fetchCategory(slug: string) {
  const path = `/api/categories/by-slug/${slug}`;
  const url = new URL(path, STRAPI_BASE_URL);

  const res = await fetchAPI<CategoryResponse>(url.href, {
    method: 'GET',
  });
  console.log('category response', res);
  return res;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale, slug } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'metaData.category',
  });
  const response = await fetchCategory(slug);
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
            url: '/images/open-graph.jpg',
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
    slug: string;
  }>;
}) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }
  const response = await fetchCategory(slug);
  if (!response) {
    notFound();
  }
  const categoryData = response.data;

  if (!categoryData) {
    notFound();
  }

  const t = await getTranslations();
  const makeSubCategoryLink = (subCategory: SubCategoryItem) => {
    const firstProduct = subCategory.products?.[0];
    const categoryLink = categoryData.link;
    return `${PAGE_NAMES.PRODUCTS}/${categoryLink}/${firstProduct?.productTypeId}/${firstProduct?.productLink}`;
  };

  return (
    <main className="pb-28 pt-11 container-max-width">
      <ProductListTitle title={categoryData.displayName} />
      <div className="mb-16 flex flex-col gap-6 py-16 lg:grid lg:grid-cols-2">
        {categoryData.subCategories.map((subCategory) => (
          <SubProductCard
            key={subCategory.id}
            buttonText={t('common.see')}
            image={subCategory.image}
            link={makeSubCategoryLink(subCategory)}
            specifications={[]}
            title={subCategory.displayName}
          />
        ))}
      </div>
      <InfoBlock
        actionLink={{
          id: 1,
          linkUrl: PAGE_NAMES.EDUCATIONAL_DISCOUNT,
        }}
        description={t('categoryPage.edDescription')}
        title={t('categoryPage.edTitle')}
      />
    </main>
  );
}
