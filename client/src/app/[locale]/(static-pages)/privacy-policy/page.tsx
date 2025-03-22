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
    title: t('privacyPolicy.title'),
    description: t('privacyPolicy.description'),
    openGraph: {
      title: t('privacyPolicy.title'),
      description: t('privacyPolicy.description'),
    },
  };
}

export default function PrivacyPolicy() {
  const t = useTranslations();
  const sections: SectionProps[] = [
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

  return (
    <div className="w-full py-10 pt-12 container-max-width md:py-[60px]">
      <h1 className="mb-9 text-center heading-1 md:mb-16">
        {t('privacyPolicyPage.title')}
      </h1>
      <p className="mb-5 paragraph-2 md:paragraph-1">
        <span className="heading-5 md:heading-4">
          {t('privacyPolicyPage.paragraphHeading')}
        </span>
        {`${' '}${t('privacyPolicyPage.paragraph')}`}
      </p>
      <div className="flex flex-col gap-5">
        {sections.map((section) => (
          <Section key={section.sectionNumber} {...section} />
        ))}
      </div>
    </div>
  );
}
