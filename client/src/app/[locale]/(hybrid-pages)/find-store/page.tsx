import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { getOpeningHours } from './actions';
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
const stores: StoreType[] = [
  {
    id: 'at-store-scc',
    name: 'AT Store SCC',
    address: 'Vrbanja 1',
    cityPostcode: 'Sarajevo, 71000',
    placeId: 'ChIJIzR7EADJWEcRbc1hkL7OXmI',
    embedLink:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2876.998657953327!2d18.40413792653904!3d43.85585648929949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758c900107b3423%3A0x625ecebe9061cd6d!2sAT%20Store%20I%20Mono%20Apple%20Authorised%20Reseller%20-%20SCC!5e0!3m2!1sen!2sba!4v1744555723780!5m2!1sen!2sba',
  },
  {
    id: 'at-store-alta',
    name: 'AT Store Alta',
    address: 'Franca Lehara 2',
    cityPostcode: 'Sarajevo, 71000',
    placeId: 'ChIJH9KzTN_IWEcRuRRjxwD6vCc',
    embedLink:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2876.998657953327!2d18.40413792653904!3d43.85585648929949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758c8df4cb3d21f%3A0x27bcfa00c76314b9!2sAT%20Store%20I%20Mono%20Apple%20Authorised%20Reseller%20-%20Alta!5e0!3m2!1sen!2sba!4v1744555667024!5m2!1sen!2sba',
  },
  {
    id: 'at-store-delta',
    name: 'AT Store Delta',
    address: 'Bulevar srpske vojske 8',
    cityPostcode: 'Banja Luka, 78000',
    placeId: 'ChIJyVPuVkYDXkcRHEpveWmgqN4',
    embedLink:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2832.037585521767!2d17.204256776577544!3d44.78003907882575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475e034656ee53c9%3A0xdea8a069796f4a1c!2sAT%20Store%2C%20Delta%20Planet!5e0!3m2!1sen!2sba!4v1744555743654!5m2!1sen!2sba',
  },
];

export default async function Page() {
  return (
    <div className="py-20 container-max-width md:py-28 lg:py-32">
      <Content stores={stores} />
    </div>
  );
}
