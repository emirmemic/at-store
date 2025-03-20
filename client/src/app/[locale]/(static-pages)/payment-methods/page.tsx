import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import FaqSection, {
  FaqSectionType,
} from '@/app/[locale]/(static-pages)/components/faq-section';
import Section, {
  SectionProps,
} from '@/app/[locale]/(static-pages)/components/section';

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
  const t = useTranslations('paymentMethodsPage');
  const contactT = useTranslations('contact');
  const sections: SectionProps[] = [
    {
      title: t('item1.title'),
      listItems: [[{ text: t('item1.listItem1') }]],
      sectionNumber: 1,
    },
    {
      title: t('item2.title'),
      listItems: [
        [{ text: t('item2.listItem1') }],
        [{ text: t('item2.listItem2') }],
      ],
      sectionNumber: 2,
    },
    {
      title: t('item3.title'),
      listItems: [
        [{ text: t('item3.listItem1') }],
        [{ text: t('item3.listItem2') }],
        [{ text: t('item3.listItem3') }],
      ],
      sectionNumber: 3,
    },
    {
      title: t('item4.title'),
      listItems: [
        [{ text: t('item4.listItem1') }],
        [{ text: t('item4.listItem2') }],
      ],
      sectionNumber: 4,
    },
    {
      title: t('item5.title'),
      listItems: [
        [{ text: t('item5.listItem1') }],
        [{ text: t('item5.listItem2') }],
      ],
      sectionNumber: 5,
    },
    {
      title: t('item6.title'),
      listItems: [[{ text: t('item6.listItem1') }]],
      sectionNumber: 6,
    },
    {
      title: t('item7.title'),
      listItems: [
        [
          { text: t('item7.listItem1') },
          {
            text: contactT('atStoreEmail'),
            path: contactT('atStoreEmailLink'),
          },
          { text: 'ili putem telefona' },
          { text: '080 051 055.', path: contactT('telephoneLink') },
        ],
      ],
      sectionNumber: 7,
    },
  ];

  const faqSection: FaqSectionType[] = [
    {
      question: 'Kako mogu izvršiti kupovinu na AT Store web stranici?',
      answer:
        'Kupovinu možete izvršiti dodavanjem željenih proizvoda u korpu, unosom potrebnih podataka i odabirom načina plaćanja i dostave. Nakon potvrde narudžbe, dobit ćete e-mail s detaljima.',
    },
    {
      question: 'Koji su dostupni načini plaćanja?',
      answer: 'Your look pretty tonight ',
    },
    {
      question: 'Who is the Company CEO ',
      answer: 'Ibrahim Tanich ',
    },
    {
      question: 'Kako mogu pratiti svoju narudžbu?',
      answer: 'I am out of answers  ',
    },
    {
      question: 'Kako mogu ostvariti garanciju na kupljeni proizvod?',
      answer: 'I am out of answers  ',
    },
  ];

  return (
    <div className="w-full py-12 pt-12 container-max-width md:py-[60px]">
      <h1 className="mb-9 text-center heading-1 md:mb-16">{t('title')}</h1>
      <div className="flex flex-col gap-5">
        {sections.map((section) => (
          <Section key={section.sectionNumber} {...section} />
        ))}
      </div>
      <div className="w-full max-w-[362] justify-self-center py-12 md:max-w-2xl md:justify-self-start md:px-3 md:py-[60px]">
        <p className="mb-6 heading-4 md:mb-9 md:heading-2">{t('faq')}</p>
        <div className="md:hidden">
          {faqSection.map((faqSection) => (
            <FaqSection key={faqSection.question} {...faqSection} />
          ))}
        </div>
        <div className="hidden grow flex-col justify-between md:flex">
          {faqSection.map((faqSection) => (
            <FaqSection key={faqSection.question} {...faqSection} />
          ))}
        </div>
      </div>
    </div>
  );
}
