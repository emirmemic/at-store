import { getTranslations } from 'next-intl/server';

import Content from './components/content';

interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData' });

  return {
    title: t('newsletter.title'),
    description: t('newsletter.description'),
    openGraph: {
      title: t('newsletter.title'),
      description: t('newsletter.description'),
    },
  };
}
export default function Page() {
  return <Content />;
}
