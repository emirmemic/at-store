import { getTranslations } from 'next-intl/server';

interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData' });

  return {
    title: t('cart.title'),
    description: t('cart.description'),
    openGraph: {
      title: t('cart.title'),
      description: t('cart.description'),
    },
  };
}

export default function CartPage({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
