import {
  AccessoriesBar,
  ProductListTitle,
  SubProductCard,
} from '@/components/product-cards';
import { GroupedSubCategoryItem, SubCategoryItem } from '@/lib/types';

import { InfoBlock } from '@/components';
import { PAGE_NAMES } from '@/i18n/page-names';
import { STRAPI_BASE_URL } from '@/lib/constants';
import Slider from './slider';
import { fetchAPI } from '@/lib/fetch-api';
import { getTranslations } from 'next-intl/server';
import { makeSubCategoryLink } from '@/lib/utils/link-helpers';
import { notFound } from 'next/navigation';

interface GenerateMetadataParams {
  params: Promise<{ locale: string; groupedSubCategory: string }>;
}

async function fetchData(slug: string) {
  const path = `/api/grouped-sub-categories/by-slug/${slug}`;
  const url = new URL(path, STRAPI_BASE_URL);

  const res = await fetchAPI<GroupedSubCategoryItem>(url.href, {
    method: 'GET',
    isAuth: false,
  });
  return res;
}
async function getAccessoryModels(category: string) {
  const path = `/api/categories/${category}/accessory-models`;
  const url = new URL(path, STRAPI_BASE_URL);
  const response = await fetchAPI<SubCategoryItem>(url.href, {
    method: 'GET',
    isAuth: false,
  });
  return response;
}

export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale, groupedSubCategory } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'metaData.category',
  });
  const response = await fetchData(groupedSubCategory);
  const data = response.data;
  if (data) {
    const title = `${data.metaTitle || data.displayName} | AT Store`;
    const description = data.metaDescription || t('description');
    const productImages = data?.sliderImages ? data.sliderImages : [];
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
    groupedSubCategory: string;
    category: string;
  }>;
}) {
  const { groupedSubCategory, category } = await params;
  if (!groupedSubCategory || !category) {
    notFound();
  }
  const response = await fetchData(groupedSubCategory);
  const data = response.data;
  if (!data) {
    notFound();
  }
  const t = await getTranslations();
  const title = data.displayName;
  const subCategories = data.subCategories || [];
  const categoryLink = data.category?.link || '';
  const images = data?.sliderImages || [];
  const accessoryType = (await getAccessoryModels(category)).data;
  const accessoryModels = accessoryType?.models || [];

  return (
    <main className="pb-28 pt-11">
      <div className="container-max-width">
        <ProductListTitle title={title} />
        <div className="flex flex-col gap-6 py-16 lg:grid lg:grid-cols-2">
          {subCategories.map((subCategory) => (
            <SubProductCard
              key={subCategory.id}
              buttonText={t('common.see')}
              image={subCategory.image}
              link={makeSubCategoryLink(categoryLink, subCategory)}
              title={subCategory.displayName || subCategory.name}
            />
          ))}
        </div>
      </div>
      <section className="pb-24 pt-16 container-max-width-xl">
        {images.length > 1 && <Slider images={images} />}
      </section>
      {accessoryModels.length > 0 && (
        <section className="container-max-width">
          <AccessoriesBar
            accessoryTypeLink={accessoryType?.link || ''}
            items={accessoryModels}
            subtitle={accessoryType?.shortDescription || ''}
            title={accessoryType?.displayName || ''}
          />
        </section>
      )}
      <section className="py-8 container-max-width">
        <InfoBlock
          actionLink={{
            id: 1,
            linkUrl: PAGE_NAMES.EDUCATIONAL_DISCOUNT,
          }}
          description={t('categoryPage.edDescription')}
          title={t('categoryPage.edTitle')}
        />
      </section>
    </main>
  );
}
