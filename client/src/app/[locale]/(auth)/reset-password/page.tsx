import { getTranslations } from 'next-intl/server';

import { IconAtStoreLogo } from '@/components/icons';

import { Container } from '../components';

import { Form } from './components';

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

export default async function Page() {
  return (
    <main className="flex min-h-screen-h-cutoff w-full flex-col items-center justify-center px-4 md:px-9">
      <Container className="!pt-16">
        <IconAtStoreLogo className="mb-8 h-8 w-36" />
        <Form />
      </Container>
    </main>
  );
}
