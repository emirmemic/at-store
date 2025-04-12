import { getTranslations } from 'next-intl/server';

import { UserTypeSelection } from './components';

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
export default function Page() {
  return (
    <div className="flex min-h-screen-h-cutoff items-center justify-center px-4 md:px-9">
      <UserTypeSelection />
    </div>
  );
}
