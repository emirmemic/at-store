import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

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
    title: t('termsOfPurchase.title'),
    description: t('termsOfPurchase.description'),
    openGraph: {
      title: t('termsOfPurchase.title'),
      description: t('termsOfPurchase.description'),
    },
  };
}

export default function TermsOfPurchase() {
  const t = useTranslations('termsOfPurchasePage');
  const contactT = useTranslations('contact');
  const sections: SectionProps[] = [
    {
      title: t('item1.title'),
      listItems: [
        [{ text: t('item1.listItems1') }],
        [{ text: t('item1.listItems2') }],
        [{ text: t('item1.listItems3') }],
      ],
      sectionNumber: 1,
    },
    {
      title: t('item2.title'),
      listItems: [
        [{ text: t('item2.listItems1') }],
        [{ text: t('item2.listItems2') }],
        [{ text: t('item2.listItems3') }],
      ],
      sectionNumber: 2,
    },
    {
      title: t('item3.title'),
      subTitle: t('item3.subTitle'),
      listItems: [
        [{ text: t('item3.listItems1') }],
        [{ text: t('item3.listItems2') }],
        [{ text: t('item3.listItems3') }],
      ],
      sectionNumber: 3,
    },
    {
      title: t('item4.title'),
      listItems: [
        [{ text: t('item4.listItems1') }],
        [{ text: t('item4.listItems2') }],
        [{ text: t('item4.listItems3') }],
      ],
      sectionNumber: 4,
    },
    {
      title: t('item5.title'),
      listItems: [
        [{ text: t('item5.listItems1') }],
        [{ text: t('item5.listItems2') }],
      ],
      sectionNumber: 5,
    },
    {
      title: t('item6.title'),
      listItems: [
        [{ text: t('item6.listItems1') }],
        [{ text: t('item6.listItems2') }],
      ],
      sectionNumber: 6,
    },
    {
      title: t('item7.title'),
      listItems: [
        [
          { text: t('item7.listItems1') },
          {
            text: contactT('atStoreEmail'),
            path: contactT('atStoreEmailLink'),
          },
        ],
      ],
      sectionNumber: 7,
    },
  ];

  return (
    <div className="w-full py-10 pt-12 container-max-width md:py-[60px]">
      <h1 className="mb-9 text-center heading-1 md:mb-16">{t('title')}</h1>
      <p className="mb-5 paragraph-2 md:paragraph-1">{t('paragraph')}</p>
      <div className="flex flex-col gap-5">
        {sections.map((section) => (
          <Section key={section.sectionNumber} {...section} />
        ))}
      </div>
    </div>
  );
}
