import { Content } from './components';
import { GOOGLE_MAPS_LOCATIONS } from '@/lib/constants';
import { StoreType } from './types';
import { getTranslations } from 'next-intl/server';

interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData' });

  return {
    title: t('findStore.title'),
    description: t('findStore.description'),
    openGraph: {
      title: t('findStore.title'),
      description: t('findStore.description'),
    },
  };
}

const stores: StoreType[] = Object.entries(GOOGLE_MAPS_LOCATIONS).map(
  ([, store]) => ({
    id: store.placeId,
    name: store.storeName,
    address: store.storeAddress,
    cityPostcode: store.storePostCode,
    placeId: store.placeId,
    embedLink: store.embedUrl,
    phone: store.storePhone,
  })
);

export default async function Page() {
  return (
    <div className="min-h-screen bg-white">
      <Content stores={stores} />
    </div>
  );
}
