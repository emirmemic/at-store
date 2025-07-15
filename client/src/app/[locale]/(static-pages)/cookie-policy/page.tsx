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
  const sections = getSections(t);

  function generateIdFromTitle(title: string) {
    return title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
  }

  return (
    <div className="flex w-full justify-center bg-white px-4 py-12 text-sm text-neutral-700 md:px-8 md:text-base">
      <div className="w-full max-w-3xl">
        <h1 className="mb-8 text-left text-3xl font-semibold text-neutral-900 md:text-4xl">
          {t('cookiePolicyPage.title')}
        </h1>
        <p className="mb-10 text-neutral-700">
          {t('cookiePolicyPage.paragraph')}
        </p>
        <div className="border-t border-neutral-200 pt-8" />
        <div className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-neutral-900">
            Sadržaj
          </h2>
          <ul className="list-inside list-decimal space-y-2 text-blue-600">
            {sections.map((section) => {
              const id = generateIdFromTitle(section.title);
              return (
                <li key={section.sectionNumber}>
                  <a className="hover:underline" href={`#${id}`}>
                    {section.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col gap-10 border-t border-neutral-200 pt-8 md:gap-12">
          {sections.map((section) => (
            <div
              key={section.sectionNumber}
              id={generateIdFromTitle(section.title)}
            >
              <Section {...section} />
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-neutral-200 pt-10" id="faq">
          <h2 className="mb-6 text-2xl font-semibold text-neutral-900 md:text-3xl">
            Često postavljana pitanja (FAQ)
          </h2>
          <div className="space-y-4 text-neutral-700">
            <details className="rounded-md bg-neutral-50 p-4 shadow-sm">
              <summary className="cursor-pointer font-semibold">
                Koje kolačiće koristite?
              </summary>
              <p className="mt-2 text-sm">
                Koristimo kolačiće za poboljšanje korisničkog iskustva i analizu
                saobraćaja na sajtu.
              </p>
            </details>
            <details className="rounded-md bg-neutral-50 p-4 shadow-sm">
              <summary className="cursor-pointer font-semibold">
                Mogu li isključiti kolačiće?
              </summary>
              <p className="mt-2 text-sm">
                Da, možete promijeniti postavke u vašem pretraživaču da odbijete
                neke ili sve kolačiće.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
