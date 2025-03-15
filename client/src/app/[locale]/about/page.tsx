import { getTranslations } from 'next-intl/server';

interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData' });

  return {
    title: t('about.title'),
    description: t('about.description'),
    openGraph: {
      title: t('about.title'),
      description: t('about.description'),
    },
  };
}
export default async function Page() {
  const t = await getTranslations('about');
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
