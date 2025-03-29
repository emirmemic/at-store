import { SectionProps } from '../components/section';

export const getSections = (t: (key: string) => string): SectionProps[] => [
  {
    title: t('cookiePolicyPage.item1.title'),
    listItems: [[{ text: t('cookiePolicyPage.item1.listItem1') }]],
    sectionNumber: 1,
  },
  {
    title: t('cookiePolicyPage.item2.title'),
    listItems: [
      [{ text: t('cookiePolicyPage.item2.listItem1') }],
      [{ text: t('cookiePolicyPage.item2.listItem2') }],
      [{ text: t('cookiePolicyPage.item2.listItem3') }],
      [{ text: t('cookiePolicyPage.item2.listItem4') }],
    ],
    sectionNumber: 2,
  },
  {
    title: t('cookiePolicyPage.item3.title'),
    listItems: [
      [{ text: t('cookiePolicyPage.item3.listItem1') }],
      [{ text: t('cookiePolicyPage.item3.listItem2') }],
      [{ text: t('cookiePolicyPage.item3.listItem3') }],
    ],
    subTitle: t('cookiePolicyPage.item3.subTitle'),
    sectionNumber: 3,
  },
  {
    title: t('cookiePolicyPage.item4.title'),
    listItems: [[{ text: t('cookiePolicyPage.item4.listItem1') }]],
    sectionNumber: 4,
  },
  {
    title: t('cookiePolicyPage.item5.title'),
    listItems: [[{ text: t('cookiePolicyPage.item5.listItem1') }]],
    sectionNumber: 5,
  },
  {
    title: t('cookiePolicyPage.item6.title'),
    listItems: [
      [
        { text: t('cookiePolicyPage.item6.listItem1') },
        {
          text: t('contact.atStoreEmail'),
          path: t('contact.atStoreEmailLink'),
        },
      ],
    ],
    sectionNumber: 6,
  },
];
