import { SectionProps } from '../components/section';

export const getSections = (t: (key: string) => string): SectionProps[] => [
  {
    title: t('privacyPolicyPage.item1.title'),
    listItems: [
      [{ text: t('privacyPolicyPage.item1.listItem') }],
      [{ text: t('privacyPolicyPage.item1.listItem2') }],
      [{ text: t('privacyPolicyPage.item1.listItem3') }],
    ],
    sectionNumber: 1,
  },
  {
    title: t('privacyPolicyPage.item2.title'),
    listItems: [
      [{ text: t('privacyPolicyPage.item2.listItem1') }],
      [{ text: t('privacyPolicyPage.item2.listItem2') }],
      [{ text: t('privacyPolicyPage.item2.listItem3') }],
      [{ text: t('privacyPolicyPage.item2.listItem4') }],
    ],
    sectionNumber: 2,
  },
  {
    title: t('privacyPolicyPage.item3.title'),
    listItems: [
      [{ text: t('privacyPolicyPage.item3.listItem1') }],
      [{ text: t('privacyPolicyPage.item3.listItem2') }],
    ],
    sectionNumber: 3,
  },
  {
    title: t('privacyPolicyPage.item4.title'),
    listItems: [[{ text: t('privacyPolicyPage.item4.listItem1') }]],
    sectionNumber: 4,
  },
  {
    title: t('privacyPolicyPage.item5.title'),
    listItems: [
      [{ text: t('privacyPolicyPage.item5.listItem1') }],
      [{ text: t('privacyPolicyPage.item5.listItem2') }],
      [{ text: t('privacyPolicyPage.item5.listItem3') }],
      [
        { text: t('privacyPolicyPage.item5.listItem4') },
        {
          text: t('contact.atStoreEmail'),
          path: t('contact.atStoreEmailLink'),
        },
      ],
    ],
    sectionNumber: 5,
  },
  {
    title: t('privacyPolicyPage.item6.title'),
    listItems: [[{ text: t('privacyPolicyPage.item6.listItem1') }]],
    sectionNumber: 6,
  },
  {
    title: t('privacyPolicyPage.item7.title'),
    listItems: [[{ text: t('privacyPolicyPage.item7.listItem1') }]],
    sectionNumber: 7,
  },
  {
    title: t('privacyPolicyPage.item8.title'),
    listItems: [
      [
        { text: t('privacyPolicyPage.item8.listItem1') },
        {
          text: t('contact.atStoreEmail'),
          path: t('contact.atStoreEmailLink'),
        },
      ],
    ],
    sectionNumber: 8,
  },
];
