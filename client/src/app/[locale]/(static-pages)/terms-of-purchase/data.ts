import { SectionProps } from '../components/section';

export const getSections = (t: (key: string) => string): SectionProps[] => [
  {
    title: t('termsOfPurchasePage.item1.title'),
    listItems: [
      [{ text: t('termsOfPurchasePage.item1.listItems1') }],
      [{ text: t('termsOfPurchasePage.item1.listItems2') }],
      [{ text: t('termsOfPurchasePage.item1.listItems3') }],
    ],
    sectionNumber: 1,
  },
  {
    title: t('termsOfPurchasePage.item2.title'),
    listItems: [
      [{ text: t('termsOfPurchasePage.item2.listItems1') }],
      [{ text: t('termsOfPurchasePage.item2.listItems2') }],
      [{ text: t('termsOfPurchasePage.item2.listItems3') }],
    ],
    sectionNumber: 2,
  },
  {
    title: t('termsOfPurchasePage.item3.title'),
    subTitle: t('termsOfPurchasePage.item3.subTitle'),
    listItems: [
      [{ text: t('termsOfPurchasePage.item3.listItems1') }],
      [{ text: t('termsOfPurchasePage.item3.listItems2') }],
      [{ text: t('termsOfPurchasePage.item3.listItems3') }],
    ],
    sectionNumber: 3,
  },
  {
    title: t('termsOfPurchasePage.item4.title'),
    listItems: [
      [{ text: t('termsOfPurchasePage.item4.listItems1') }],
      [{ text: t('termsOfPurchasePage.item4.listItems2') }],
      [{ text: t('termsOfPurchasePage.item4.listItems3') }],
    ],
    sectionNumber: 4,
  },
  {
    title: t('termsOfPurchasePage.item5.title'),
    listItems: [
      [{ text: t('termsOfPurchasePage.item5.listItems1') }],
      [{ text: t('termsOfPurchasePage.item5.listItems2') }],
    ],
    sectionNumber: 5,
  },
  {
    title: t('termsOfPurchasePage.item6.title'),
    listItems: [
      [{ text: t('termsOfPurchasePage.item6.listItems1') }],
      [{ text: t('termsOfPurchasePage.item6.listItems2') }],
    ],
    sectionNumber: 6,
  },
  {
    title: t('termsOfPurchasePage.item7.title'),
    listItems: [
      [
        { text: t('termsOfPurchasePage.item7.listItems1') },
        {
          text: t('contact.atStoreEmail'),
          path: t('contact.atStoreEmailLink'),
        },
      ],
    ],
    sectionNumber: 7,
  },
];
