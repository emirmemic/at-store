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
    title: t('orderCancellation.title'),
    description: t('orderCancellation.description'),
    openGraph: {
      title: t('orderCancellation.title'),
      description: t('orderCancellation.description'),
    },
  };
}

export default function OrderCancellation() {
  const t = useTranslations();

  const sections: SectionProps[] = [
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

  return (
    <div className="w-full py-10 pt-12 container-max-width md:py-[60px]">
      <h1 className="mb-9 text-center heading-2 md:mb-16 md:heading-1">
        {t('orderCancellationPage.title')}
      </h1>
      <div className="flex flex-col gap-5">
        {sections.map((section) => (
          <Section key={section.sectionNumber} {...section} />
        ))}
      </div>
    </div>
  );
}
