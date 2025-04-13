import { getTranslations } from 'next-intl/server';
import React from 'react';

interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData' });

  return {
    title: t('register.title'),
    description: t('register.description'),
    openGraph: {
      title: t('register.title'),
      description: t('register.description'),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
