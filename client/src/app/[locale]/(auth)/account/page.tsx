import { getTranslations } from 'next-intl/server';

interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData' });

  return {
    title: t('account.title'),
    description: t('account.description'),
  };
}
export default async function AccountDetails() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Account</h1>
    </div>
  );
}
