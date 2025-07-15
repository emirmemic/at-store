import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { getSections } from './data';

import Section from '@/app/[locale]/(static-pages)/components/section';

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

  const sections = getSections(t);
  return (
    <div className="flex w-full justify-center px-4 py-12 text-xs text-neutral-700 md:px-8 md:text-sm">
      <div className="grid w-full max-w-6xl grid-cols-1 gap-10 md:grid-cols-3">
        <div className="md:col-span-2">
          <h1 className="mb-8 text-left text-3xl font-semibold text-neutral-900 md:text-4xl">
            {t('orderCancellationPage.title')}
          </h1>
          <div className="flex flex-col gap-10 border-t border-neutral-200 pt-8 md:gap-12">
            {sections.map((section) => (
              <Section key={section.sectionNumber} {...section} />
            ))}
          </div>
        </div>
        <aside className="space-y-8 border-l border-neutral-200 pl-6">
          <div className="flex flex-col items-center rounded-lg bg-neutral-100 px-6 py-8 text-center shadow-sm">
            <h2 className="mb-2 text-xl font-semibold text-neutral-900">
              Potrebna vam je pomoć?
            </h2>
            <p className="mb-4 text-sm text-neutral-700">
              Naša korisnička podrška stoji vam na raspolaganju za sva pitanja.
            </p>
            <Link
              className="inline-block rounded-full bg-black px-6 py-2 text-sm font-medium text-white transition hover:bg-neutral-800"
              href="/contact"
            >
              Kontaktirajte nas
            </Link>
          </div>
          <div className="flex flex-col rounded-lg bg-neutral-100 px-6 py-8 shadow-sm">
            <h3 className="mb-4 text-center text-base font-semibold text-neutral-900">
              Brzi linkovi za pomoć
            </h3>
            <ul className="space-y-3 text-center text-sm text-blue-600">
              <li>
                <Link className="hover:underline" href="/faq/shipping">
                  Informacije o isporuci
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/faq/returns">
                  Povrati i reklamacije
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/faq/payment">
                  Načini plaćanja
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-neutral-100 px-6 py-8 text-center shadow-sm">
            <svg
              className="mb-4 h-10 w-10 text-neutral-700"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 22s8-4.5 8-13a8 8 0 10-16 0c0 8.5 8 13 8 13z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3 className="mb-2 text-base font-semibold text-neutral-900">
              Pronađite poslovnicu
            </h3>
            <p className="mb-4 text-sm text-neutral-700">
              Posjetite najbližu AT Store lokaciju za podršku i kupovinu.
            </p>
            <Link
              className="inline-block rounded-full bg-black px-6 py-2 text-sm font-medium text-white transition hover:bg-neutral-800"
              href="/find-store"
            >
              Pronađi poslovnicu
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
