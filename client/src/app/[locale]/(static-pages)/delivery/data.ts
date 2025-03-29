import { SectionProps } from '../components/section';

export const getSections = (t: (key: string) => string): SectionProps[] => [
  {
    title: t('deliveryPage.item1.title'),
    listItems: [[{ text: t('deliveryPage.item1.listItem1') }]],
    sectionNumber: 1,
  },
  {
    title: t('deliveryPage.item2.title'),
    listItems: [
      [{ text: t('deliveryPage.item2.listItem1') }],
      [{ text: t('deliveryPage.item2.listItem2') }],
    ],
    subTitle: t('deliveryPage.item2.subTitle'),
    sectionNumber: 2,
  },
  {
    title: t('deliveryPage.item3.title'),
    listItems: [
      [{ text: t('deliveryPage.item3.listItem1') }],
      [{ text: t('deliveryPage.item3.listItem2') }],
    ],
    sectionNumber: 3,
  },
  {
    title: t('deliveryPage.item4.title'),
    listItems: [[{ text: t('deliveryPage.item4.listItem1') }]],
    sectionNumber: 4,
  },
  {
    title: t('deliveryPage.item5.title'),
    listItems: [[{ text: t('deliveryPage.item5.listItem1') }]],
    sectionNumber: 5,
  },
  {
    title: t('deliveryPage.item6.title'),
    listItems: [
      [
        { text: t('deliveryPage.item6.listItem1') },
        {
          text: t('contact.atStoreComplaints'),
          path: t('contact.atStoreComplaintsLink'),
        },
      ],
    ],
    sectionNumber: 6,
  },
  {
    title: t('deliveryPage.item7.title'),
    listItems: [
      [
        { text: t('deliveryPage.item7.listItem1') },
        {
          text: t('contact.atStoreEmail'),
          path: t('contact.atStoreEmailLink'),
        },
      ],
    ],
    sectionNumber: 7,
  },
];
