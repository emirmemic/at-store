import { getTranslations } from 'next-intl/server';

import LoginForm from '@/app/[locale]/(auth)/login/components/login-form';

interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData' });

  return {
    title: t('login.title'),
    description: t('login.description'),
    openGraph: {
      title: t('login.title'),
      description: t('login.description'),
    },
  };
}
export default function Page() {
  return (
    <main className="flex h-screen-h-cutoff items-center justify-center">
      <LoginForm />
    </main>
  );
}
