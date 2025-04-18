import { getTranslations } from 'next-intl/server';

interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData' });

  return {
    title: t('resetPassword.title'),
    description: t('resetPassword.description'),
    openGraph: {
      title: t('resetPassword.title'),
      description: t('resetPassword.description'),
    },
  };
}
export default function Page() {
  return <div>Reset Password</div>;
}
