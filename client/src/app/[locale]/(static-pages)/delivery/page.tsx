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
    title: t('delivery.title'),
    description: t('delivery.description'),
    openGraph: {
      title: t('delivery.title'),
      description: t('delivery.description'),
    },
  };
}

export default function DeliveryPage() {
  const t = useTranslations();
  const sections: SectionProps[] = [
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

  return (
    <div className="w-full py-10 pt-12 container-max-width md:py-[60px]">
      <h1 className="mb-9 text-center heading-2 md:mb-16 md:heading-1">
        {t('deliveryPage.title')}
      </h1>
      <div className="flex flex-col gap-5">
        {sections.map((section) => (
          <Section key={section.sectionNumber} {...section} />
        ))}
      </div>
    </div>
  );
}
