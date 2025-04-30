import { getTranslations } from 'next-intl/server';
import React from 'react';

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

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}
