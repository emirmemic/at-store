import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { IconAtStoreLogo } from '@/components/icons';

import { Container, Title } from '../components';

import { Form } from './components';

interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData' });

  return {
    title: t('forgotPassword.title'),
    description: t('forgotPassword.description'),
    openGraph: {
      title: t('forgotPassword.title'),
      description: t('forgotPassword.description'),
    },
  };
}
export default function Page() {
  const t = useTranslations('forgotPasswordPage');

  return (
    <main className="flex min-h-screen-h-cutoff w-full flex-col items-center justify-center px-4 md:px-9">
      <Container className="!pt-16">
        <IconAtStoreLogo className="h-8 w-36" />
        <Title className="mb-8" title={t('title')} />
        <Form />
      </Container>
    </main>
  );
}
