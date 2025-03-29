import { SectionProps } from '../components/section';

export const getSections = (t: (key: string) => string): SectionProps[] => [
  {
    title: t('orderCancellationPage.item1.title'),
    listItems: [
      [{ text: t('orderCancellationPage.item1.listItem1') }],
      [{ text: t('orderCancellationPage.item1.listItem2') }],
      [{ text: t('orderCancellationPage.item1.listItem3') }],
    ],
    subTitle: t('orderCancellationPage.item1.subTitle'),
    sectionNumber: 1,
  },
  {
    title: t('orderCancellationPage.item2.title'),
    subTitle: t('orderCancellationPage.item2.listItem1'),
    listItems: [
      [
        {
          text: t('contact.telephone'),
          path: t('contact.telephoneLink'),
        },
      ],
      [
        {
          text: t('contact.orderEmail'),
          path: t('contact.orderEmailLink'),
        },
      ],
    ],
    sectionNumber: 2,
  },
  {
    title: t('orderCancellationPage.item3.title'),
    listItems: [[{ text: t('orderCancellationPage.item3.listItem1') }]],
    sectionNumber: 3,
  },
  {
    title: t('orderCancellationPage.item4.title'),
    listItems: [[{ text: t('orderCancellationPage.item4.listItem1') }]],
    sectionNumber: 4,
  },
  {
    title: t('orderCancellationPage.item5.title'),
    listItems: [
      [
        { text: t('orderCancellationPage.item5.listItem1') },
        {
          text: t('contact.atStoreEmail'),
          path: t('contact.atStoreEmailLink'),
        },
      ],
    ],
    sectionNumber: 5,
  },
];
