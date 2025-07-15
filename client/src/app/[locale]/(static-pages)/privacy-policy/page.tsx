import Link from 'next/link';
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
    <div className="flex w-full justify-center px-4 py-12 text-sm text-neutral-700 md:px-0 md:text-base">
      <div className="w-full max-w-3xl">
        <h1 className="mb-6 text-left text-2xl font-semibold text-neutral-900 md:text-4xl">
          {t('privacyPolicyPage.title')}
        </h1>
        <p className="mb-8 text-base leading-relaxed text-neutral-600 md:text-lg">
          <span className="mb-4 block text-lg font-medium text-neutral-800 md:text-xl">
            {t('privacyPolicyPage.paragraphHeading')}
          </span>
          {t('privacyPolicyPage.paragraph')}
        </p>
        <div className="mb-10 border-y border-neutral-200 py-6">
          <h2 className="mb-4 text-lg font-semibold text-neutral-800">
            Sadržaj
          </h2>
          <ul className="list-inside list-decimal space-y-2 text-blue-600">
            {sections.map((section) => (
              <li key={section.sectionNumber}>
                <Link
                  className="hover:underline"
                  href={`#section-${section.sectionNumber}`}
                >
                  {section.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-8 border-t border-neutral-200 pt-6 md:gap-12">
          {sections.map((section) => (
            <div
              key={section.sectionNumber}
              id={`section-${section.sectionNumber}`}
            >
              <Section {...section} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
