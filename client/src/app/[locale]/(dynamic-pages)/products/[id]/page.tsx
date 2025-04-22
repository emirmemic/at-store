import { getTranslations } from 'next-intl/server';

interface GenerateMetadataParams {
  params: Promise<{ locale: string; id: string }>;
}

export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'metaData.mac',
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
  return <div>Page ID</div>;
}
