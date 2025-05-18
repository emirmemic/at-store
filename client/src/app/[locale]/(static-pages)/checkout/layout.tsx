import { getTranslations } from 'next-intl/server';

import PageTitle from '../components/page-title';

import CheckoutProvider from './providers/checkout-provider';

interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData' });

  return {
    title: t('checkout.title'),
    description: t('checkout.description'),
    openGraph: {
      title: t('checkout.title'),
      description: t('checkout.description'),
    },
  };
}

export default async function CheckoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations('checkoutPage');
  return (
    <CheckoutProvider>
      <main className="flex flex-col py-12 container-max-width">
        <PageTitle className="pb-3 md:pb-8" title={t('title')} />
        {children}
      </main>
    </CheckoutProvider>
  );
}
