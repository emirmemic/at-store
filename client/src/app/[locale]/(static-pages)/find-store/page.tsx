import { getTranslations } from 'next-intl/server';

import { GOOGLE_MAPS_LOCATIONS } from '@/lib/constants';

import { Content } from './components';
import { StoreType } from './types';

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
  })
);

export default async function Page() {
  return (
    <div className="py-20 container-max-width md:py-28 lg:py-32">
      <Content stores={stores} />
    </div>
  );
}
