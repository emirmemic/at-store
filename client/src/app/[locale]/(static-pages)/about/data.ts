import { atStoreAlta, atStoreDelta, atStoreScc } from '@/assets/images';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Pathname } from '@/i18n/routing';

import { IconAtBusiness } from '../icons';
import IconAtSoft from '../icons/at-soft';

export const getCardBlocks = (t: (key: string) => string) => [
  {
    title: t('about.cardBlock.title1'),
    name: 'AtSoft',
    Icon: IconAtSoft,
    path: 'https://www.atsofts.com' as Pathname,
    id: 1,
  },
  {
    title: t('about.cardBlock.title2'),
    name: 'AtBusiness',
    Icon: IconAtBusiness,
    path: PAGE_NAMES.B2B,
    id: 2,
  },
];
export const getTeamCard = () => [
  { id: 1, name: { firstName: 'Admir', surname: 'Tursum' }, role: 'Ceo' },
  {
    id: 2,
    name: { firstName: 'Emina', surname: 'Bećirbašić' },
    role: 'Deputy direction',
  },
  {
    id: 3,
    name: { firstName: 'Bojana', surname: 'Nuci' },
    role: 'Store Manager Alta',
  },
  {
    id: 4,
    name: { firstName: 'Gorana', surname: 'Miljanović' },
    role: 'Store Manager Delta',
  },
  {
    id: 5,
    name: { firstName: 'Selma', surname: 'Dorić' },
    role: 'Store Manager SCC',
  },
  {
    id: 6,
    name: { firstName: 'Emir', surname: 'Tukić' },
    role: 'Marketing manager',
  },
  {
    id: 7,
    name: { firstName: 'Haris', surname: 'Džiko' },
    role: 'B2B manager',
  },
  {
    id: 8,
    name: { firstName: 'Armin', surname: 'Kosovac' },
    role: 'account manager',
  },
];

export const getInfo = (t: (key: string) => string) => [
  {
    title: t('about.content1.title'),
    content: [
      {
        text: t('about.content1.item1'),
        path: 'https://maps.app.goo.gl/KCmJnmbJHi1r3hXM6',
      },
      {
        text: t('contact.atStoreAltaTelephone'),
        path: t('contact.atStoreAltaTelephoneLink'),
      },
      { text: t('about.content1.item2') },
      {
        text: t('contact.atStoreEmail'),
        path: t('contact.atStoreEmailLink'),
      },
    ],
    name: 'At Store Alta',
    image: atStoreAlta,
    id: 1,
  },
  {
    title: t('about.content2.title'),
    content: [
      {
        text: t('about.content2.item1'),
        path: 'https://maps.app.goo.gl/or6KCk3rEAfPRXsJ6',
      },
      {
        text: t('contact.atStoreSccTelephone'),
        path: t('contact.atStoreSccTelephoneLink'),
      },
      { text: t('about.content2.item2') },
      {
        text: t('contact.atStoreEmail'),
        path: t('contact.atStoreEmailLink'),
      },
    ],
    name: 'At Store SCC',
    image: atStoreScc,
    id: 2,
  },
  {
    title: t('about.content3.title'),
    content: [
      {
        text: t('about.content3.item1'),
        path: 'https://maps.app.goo.gl/ZiBYtxvfgJX4m6By7',
      },
      {
        text: t('contact.atStoreDeltaTelephone'),
        path: t('contact.atStoreDeltaTelephoneLink'),
      },
      { text: t('about.content3.item2') },
      {
        text: t('contact.atStoreDeltaEmail'),
        path: t('contact.atStoreDeltaEmailLink'),
      },
    ],
    name: 'At Store Delta',
    image: atStoreDelta,
    id: 3,
  },
];
