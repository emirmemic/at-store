import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import FaqSection, {
  FaqSectionType,
} from '@/app/[locale]/(static-pages)/components/faq-section';
import Section, {
  SectionProps,
} from '@/app/[locale]/(static-pages)/components/section';
import { InfoBlock } from '@/components';
import { PAGE_NAMES } from '@/i18n/page-names';

interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData' });
  return {
    title: t('paymentMethods.title'),
    description: t('paymentMethods.description'),
    openGraph: {
      title: t('paymentMethods.title'),
      description: t('paymentMethods.description'),
    },
  };
}

export default function PaymentMethods() {
  const t = useTranslations();
  const sections: SectionProps[] = [
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

  const faqSection: FaqSectionType[] = [
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

  const infoBlock = [
    {
      id: 1,
      description: t('paymentMethodsPage.infoBlock1.description'),
      path: PAGE_NAMES.MICROFIN_INVOICE,
      title: t('paymentMethodsPage.infoBlock1.title'),
    },
    {
      id: 2,
      description: t('paymentMethodsPage.infoBlock2.description'),
      path: PAGE_NAMES.DELIVERY,
      title: t('paymentMethodsPage.infoBlock2.title'),
    },
    {
      id: 3,
      description: t('paymentMethodsPage.infoBlock3.description'),
      path: PAGE_NAMES.COMPLAINTS,
      title: t('paymentMethodsPage.infoBlock3.title'),
    },
  ];

  return (
    <div className="w-full py-12 pt-12 container-max-width md:py-[60px]">
      <h1 className="mb-9 text-center heading-2 md:mb-16 md:heading-1">
        {t('paymentMethodsPage.title')}
      </h1>
      <div className="flex flex-col gap-5">
        {sections.map((section) => (
          <Section key={section.sectionNumber} {...section} />
        ))}
      </div>
      <div className="w-full justify-self-center py-12 md:max-w-2xl md:justify-self-start md:px-3 md:py-[60px]">
        <p className="mb-6 heading-4 md:mb-9 md:heading-2">
          {t('paymentMethodsPage.faqTitle')}
        </p>
        {faqSection.map((faqSection) => (
          <FaqSection key={faqSection.question} {...faqSection} />
        ))}
      </div>

      <div className="flex flex-col items-center justify-center gap-8">
        {infoBlock.map((infoBlock) => (
          <InfoBlock
            key={infoBlock.id}
            className="w-full md:max-w-[688px] lg:max-w-[1058px]"
            description={infoBlock.description}
            path={infoBlock.path}
            title={infoBlock.title}
          />
        ))}
      </div>
    </div>
  );
}
