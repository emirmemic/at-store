import { atStoreAlta, atStoreDelta, atStoreScc } from '@/assets/images';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Pathname } from '@/i18n/routing';
import { GOOGLE_MAPS_LOCATIONS } from '@/lib/constants';

import { IconAtBusiness } from '../icons';
import IconAtSoft from '../icons/at-soft';

export const getCardBlocks = (t: (key: string) => string) => [
  {
    title: t('about.cardBlock.title1'),
    name: 'ATSoft',
    Icon: IconAtSoft,
    path: 'https://www.atsofts.com' as Pathname,
    id: 1,
  },
  {
    title: t('about.cardBlock.title2'),
    name: 'ATBusiness',
    Icon: IconAtBusiness,
    path: PAGE_NAMES.B2B,
    id: 2,
  },
];

export const getInfo = (t: (key: string) => string) => [
  {
    id: 1,
    placeId: GOOGLE_MAPS_LOCATIONS.SARAJEVO_ALTA.placeId,
    title: GOOGLE_MAPS_LOCATIONS.SARAJEVO_ALTA.storeName,
    content: [
      {
        id: 'map_link',
        text: GOOGLE_MAPS_LOCATIONS.SARAJEVO_ALTA.storeAddress,
        path: '',
      },
      {
        id: 'telephone',
        text: t('contact.atStoreAltaTelephone'),
        path: t('contact.atStoreAltaTelephoneLink'),
      },
      {
        id: 'working_hours',
        text: '',
      },
      {
        id: 'email',
        text: t('contact.atStoreEmail'),
        path: t('contact.atStoreEmailLink'),
      },
    ],
    name: 'At Store Alta',
    image: atStoreAlta,
  },
  {
    id: 2,
    placeId: GOOGLE_MAPS_LOCATIONS.SARAJEVO_SCC.placeId,
    title: GOOGLE_MAPS_LOCATIONS.SARAJEVO_SCC.storeName,
    content: [
      {
        id: 'map_link',
        text: GOOGLE_MAPS_LOCATIONS.SARAJEVO_SCC.storeAddress,
        path: '',
      },
      {
        id: 'telephone',
        text: t('contact.atStoreSccTelephone'),
        path: t('contact.atStoreSccTelephoneLink'),
      },
      {
        id: 'working_hours',
        text: '',
      },
      {
        id: 'email',
        text: t('contact.atStoreEmail'),
        path: t('contact.atStoreEmailLink'),
      },
    ],
    name: 'At Store SCC',
    image: atStoreScc,
  },
  {
    id: 3,
    placeId: GOOGLE_MAPS_LOCATIONS.BANJA_LUKA_DELTA.placeId,
    title: GOOGLE_MAPS_LOCATIONS.BANJA_LUKA_DELTA.storeName,
    content: [
      {
        id: 'map_link',
        text: GOOGLE_MAPS_LOCATIONS.BANJA_LUKA_DELTA.storeAddress,
        path: '',
      },
      {
        id: 'telephone',
        text: t('contact.atStoreDeltaTelephone'),
        path: t('contact.atStoreDeltaTelephoneLink'),
      },
      {
        id: 'working_hours',
        text: '',
      },
      {
        id: 'email',
        text: t('contact.atStoreDeltaEmail'),
        path: t('contact.atStoreDeltaEmailLink'),
      },
    ],
    name: 'At Store Delta',
    image: atStoreDelta,
  },
];
