import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import { ACCESSORY_CATEGORY_LINK } from '@/lib/constants';

import { Content } from './components';

interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'metaData.accessories',
  });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
    },
  };
}
export default function Page() {
  const t = useTranslations();
  return (
    <Content
      categoryLink={ACCESSORY_CATEGORY_LINK}
      pageTitle={t('accessoriesPage.title')}
    />
  );
}
