import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { OAuthButton } from '@/components/auth';
import { IconAtStoreLogo } from '@/components/icons';
import { PAGE_NAMES } from '@/i18n/page-names';

import { Container, Title } from '../components';

import Form from './components/form';

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
  const t = useTranslations('loginPage');
  return (
    <main className="flex min-h-screen-h-cutoff w-full flex-col items-center justify-center px-4 py-9 md:px-9 md:py-16">
      <Container className="!pt-16 md:flex-row md:justify-between md:!pt-32">
        <div className="mb-10 hidden flex-col gap-5 md:flex">
          <IconAtStoreLogo className="h-12 w-56" />
          <p className="mt-8 text-center">{t('loginThrough')}</p>
          <OAuthButton provider="facebook" />
          <OAuthButton provider="apple" />
          <OAuthButton provider="google" />
        </div>
        <IconAtStoreLogo className="h-8 w-36 md:hidden" />
        <Title
          className="mb-8 md:hidden"
          linkPath={PAGE_NAMES.REGISTER}
          linkText={t('registerPrompt')}
          subtitle={t('subtitle')}
          title={t('title')}
        />
        <Form />
      </Container>
    </main>
  );
}
