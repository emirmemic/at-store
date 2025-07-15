import { PAGE_NAMES } from '@/i18n/page-names';
import { CURRENCY, MINIMUM_AMOUNT_FREE_DELIVERY } from '@/lib/constants';
import { LocalizationKey } from '@/lib/types';

import { FaqSectionType } from '../components/faq-section';
import { SectionProps } from '../components/section';

export const getFaqSection = (t: (key: string) => string): FaqSectionType[] => [
  {
    question: t('paymentMethodsPage.faqItem1.question'),
    answer: t('paymentMethodsPage.faqItem1.answer'),
  },
  {
    question: t('paymentMethodsPage.faqItem2.question'),
    answer: t('paymentMethodsPage.faqItem2.answer'),
  },
  {
    question: t('paymentMethodsPage.faqItem3.question'),
    answer: t('paymentMethodsPage.faqItem3.answer'),
  },
  {
    question: t('paymentMethodsPage.faqItem4.question'),
    answer: t('paymentMethodsPage.faqItem4.answer'),
  },
  {
    question: t('paymentMethodsPage.faqItem5.question'),
    answer: t('paymentMethodsPage.faqItem5.answer'),
  },
];

export const getInfoBlock = (t: LocalizationKey) => [
  {
    id: 1,
    description: t('paymentMethodsPage.infoBlock1.description'),
    actionLink: {
      id: 1,
      linkUrl: PAGE_NAMES.MIKROFIN_INVOICE,
    },
    title: t('paymentMethodsPage.infoBlock1.title'),
  },
  {
    id: 2,
    description: t('paymentMethodsPage.infoBlock2.description', {
      amount: MINIMUM_AMOUNT_FREE_DELIVERY,
      currency: CURRENCY,
    }),
    actionLink: {
      id: 2,
      linkUrl: PAGE_NAMES.DELIVERY,
    },
    title: t('paymentMethodsPage.infoBlock2.title'),
  },
  {
    id: 3,
    description: t('paymentMethodsPage.infoBlock3.description'),
    actionLink: {
      id: 3,
      linkUrl: PAGE_NAMES.COMPLAINTS,
    },
    title: t('paymentMethodsPage.infoBlock3.title'),
  },
];
export const getSections = (t: (key: string) => string): SectionProps[] => [
  {
    title: t('paymentMethodsPage.item1.title'),
    listItems: [[{ text: t('paymentMethodsPage.item1.listItem1') }]],
    sectionNumber: 1,
  },
  {
    title: t('paymentMethodsPage.item2.title'),
    listItems: [
      [{ text: t('paymentMethodsPage.item2.listItem1') }],
      [{ text: t('paymentMethodsPage.item2.listItem2') }],
    ],
    sectionNumber: 2,
  },
  {
    title: t('paymentMethodsPage.item3.title'),
    listItems: [
      [{ text: t('paymentMethodsPage.item3.listItem1') }],
      [{ text: t('paymentMethodsPage.item3.listItem2') }],
      [{ text: t('paymentMethodsPage.item3.listItem3') }],
    ],
    sectionNumber: 3,
  },
  {
    title: t('paymentMethodsPage.item4.title'),
    listItems: [
      [{ text: t('paymentMethodsPage.item4.listItem1') }],
      [{ text: t('paymentMethodsPage.item4.listItem2') }],
    ],
    sectionNumber: 4,
  },
  {
    title: t('paymentMethodsPage.item5.title'),
    listItems: [
      [{ text: t('paymentMethodsPage.item5.listItem1') }],
      [{ text: t('paymentMethodsPage.item5.listItem2') }],
    ],
    sectionNumber: 5,
  },
  {
    title: t('paymentMethodsPage.item6.title'),
    listItems: [[{ text: t('paymentMethodsPage.item6.listItem1') }]],
    sectionNumber: 6,
  },
  {
    title: t('paymentMethodsPage.item7.title'),
    listItems: [
      [
        { text: t('paymentMethodsPage.item7.listItem1') },
        {
          text: t('contact.atStoreEmail'),
          path: t('contact.atStoreEmailLink'),
        },
        { text: 'ili putem telefona' },
        { text: '080 051 055.', path: t('contact.telephoneLink') },
      ],
    ],
    sectionNumber: 7,
  },
];
