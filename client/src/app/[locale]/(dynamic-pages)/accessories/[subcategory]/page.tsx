import { getTranslations } from 'next-intl/server';
import React from 'react';

import { ACCESSORY_CATEGORY_LINK } from '@/lib/constants';

import { Content } from '../components';

const normalizeLink = (subcategory: string) =>
  subcategory.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());

interface GenerateMetadataParams {
  params: Promise<{ locale: string; subcategory: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale, subcategory } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'metaData.accessories',
  });

  return {
    title: subcategory
      ? `${normalizeLink(subcategory)} | AT Store`
      : t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
    },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{
    subcategory: string;
  }>;
}) {
  const { subcategory } = await params;
  const normalizedSubcategory = normalizeLink(subcategory);

  return (
    <Content
      categoryLink={ACCESSORY_CATEGORY_LINK}
      pageTitle={normalizedSubcategory}
      subCategoryLink={subcategory}
    />
  );
}
