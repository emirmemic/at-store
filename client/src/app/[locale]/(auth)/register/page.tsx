import { getTranslations } from 'next-intl/server';

import RegisterForm from '@/app/[locale]/(auth)/register/components/register-form';

interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData' });

  return {
    title: t('register.title'),
    description: t('register.description'),
  };
}
export default function RegisterPage() {
  return <RegisterForm />;
}
