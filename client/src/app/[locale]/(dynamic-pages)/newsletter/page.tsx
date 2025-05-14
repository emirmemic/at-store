import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { IconNews } from '@/components/icons';

import Form from './components/form';

interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData' });

  return {
    title: t('newsletter.title'),
    description: t('newsletter.description'),
    openGraph: {
      title: t('newsletter.title'),
      description: t('newsletter.description'),
    },
  };
}
export default function Page() {
  const t = useTranslations('newsletterPage');
  return (
    <main className="flex flex-col items-center py-16 container-max-width">
      <h1 className="mb-3 heading-1 md:mb-12 md:display">{t('title')}</h1>
      <h2 className="mb-11 heading-3 lg:mb-16">{t('subtitle')}</h2>
      <div className="mb-12 flex w-full max-w-5xl flex-col items-center gap-2 rounded-2xl bg-blue-steel px-3 pb-12 pt-7 text-white shadow-popup-black md:flex-row md:gap-14 md:p-16">
        <IconNews className="h-36 w-36 shrink-0" />
        <p className="text-center paragraph-1 md:text-left">
          {t('description')}
        </p>
      </div>
      <Form />
    </main>
  );
}
