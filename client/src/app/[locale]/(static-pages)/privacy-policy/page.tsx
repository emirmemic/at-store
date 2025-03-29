import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import Section from '@/app/[locale]/(static-pages)/components/section';

import { getSections } from './data';

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
  const sections = getSections(t);

  return (
    <div className="w-full py-10 pt-12 container-max-width md:py-[60px]">
      <h1 className="mb-9 text-center heading-2 md:mb-16 md:heading-1">
        {t('privacyPolicyPage.title')}
      </h1>
      <p className="mb-5 paragraph-2 md:paragraph-1">
        <span className="heading-5 md:heading-4">
          {t('privacyPolicyPage.paragraphHeading')}
        </span>
        {` ${t('privacyPolicyPage.paragraph')}`}
      </p>
      <div className="flex flex-col gap-5">
        {sections.map((section) => (
          <Section key={section.sectionNumber} {...section} />
        ))}
      </div>
    </div>
  );
}
