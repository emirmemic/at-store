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
    title: t('cookiePolicy.title'),
    description: t('cookiePolicy.description'),
    openGraph: {
      title: t('cookiePolicy.title'),
      description: t('cookiePolicy.description'),
    },
  };
}

export default function CookiePolicy() {
  const t = useTranslations();
  const sections: SectionProps[] = [
    {
      title: t('cookiePolicyPage.item1.title'),
      listItems: [[{ text: t('cookiePolicyPage.item1.listItem1') }]],
      sectionNumber: 1,
    },
    {
      title: t('cookiePolicyPage.item2.title'),
      listItems: [
        [{ text: t('cookiePolicyPage.item2.listItem1') }],
        [{ text: t('cookiePolicyPage.item2.listItem2') }],
        [{ text: t('cookiePolicyPage.item2.listItem3') }],
        [{ text: t('cookiePolicyPage.item2.listItem4') }],
      ],
      sectionNumber: 2,
    },
    {
      title: t('cookiePolicyPage.item3.title'),
      listItems: [
        [{ text: t('cookiePolicyPage.item3.listItem1') }],
        [{ text: t('cookiePolicyPage.item3.listItem2') }],
        [{ text: t('cookiePolicyPage.item3.listItem3') }],
      ],
      subTitle: t('cookiePolicyPage.item3.subTitle'),
      sectionNumber: 3,
    },
    {
      title: t('cookiePolicyPage.item4.title'),
      listItems: [[{ text: t('cookiePolicyPage.item4.listItem1') }]],
      sectionNumber: 4,
    },
    {
      title: t('cookiePolicyPage.item5.title'),
      listItems: [[{ text: t('cookiePolicyPage.item5.listItem1') }]],
      sectionNumber: 5,
    },
    {
      title: t('cookiePolicyPage.item6.title'),
      listItems: [
        [
          { text: t('cookiePolicyPage.item6.listItem1') },
          {
            text: t('contact.atStoreEmail'),
            path: t('contact.atStoreEmailLink'),
          },
        ],
      ],
      sectionNumber: 6,
    },
  ];

  return (
    <div className="w-full py-10 pt-12 container-max-width md:py-[60px]">
      <h1 className="mb-9 text-center heading-1 md:mb-16">
        {t('cookiePolicyPage.title')}
      </h1>
      <p className="mb-5 paragraph-2 md:paragraph-1">
        {t('cookiePolicyPage.paragraph')}
      </p>
      <div className="flex flex-col gap-5">
        {sections.map((section) => (
          <Section key={section.sectionNumber} {...section} />
        ))}
      </div>
    </div>
  );
}
