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
  const sections = getSections(t);

  return (
    <div className="flex w-full justify-center px-4 py-12 text-sm text-neutral-700 md:px-8 md:text-base">
      <div className="grid w-full max-w-6xl grid-cols-1 gap-10 md:grid-cols-3">
        <div className="md:col-span-2">
          <h1 className="mb-8 text-left text-3xl font-semibold text-neutral-900 md:text-4xl">
            {t('deliveryPage.title')}
          </h1>
          <div className="flex flex-col gap-10 border-t border-neutral-200 pt-8 md:gap-12">
            <h2 className="mb-6 text-2xl font-semibold text-neutral-900 md:text-3xl">
              Koje su opcije dostave u AT Store-u?
            </h2>
            <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <svg
                  className="mb-2 h-10 w-10 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 10h2l1 2h13a2 2 0 012 2v1H6a2 2 0 01-2-2V5a1 1 0 011-1h2l1 2h13a1 1 0 011 1v4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
                <h3 className="text-base font-semibold text-neutral-900">
                  Besplatna dostava
                </h3>
                <p className="text-sm text-neutral-700">
                  Uživajte u besplatnoj dostavi za sve narudžbe iznad određenog
                  iznosa.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <svg
                  className="mb-2 h-10 w-10 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m1 4H8a2 2 0 01-2-2V7h12v12a2 2 0 01-2 2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
                <h3 className="text-base font-semibold text-neutral-900">
                  Brza dostava
                </h3>
                <p className="text-sm text-neutral-700">
                  Odaberite opciju brze dostave i dobijte svoj paket u roku 1-2
                  radna dana.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <svg
                  className="mb-2 h-10 w-10 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
                <h3 className="text-base font-semibold text-neutral-900">
                  Preuzimanje u poslovnici
                </h3>
                <p className="text-sm text-neutral-700">
                  Preuzmite narudžbu u najbližoj AT Store poslovnici bez
                  dodatnih troškova.
                </p>
              </div>
            </div>
            {sections.map((section) => (
              <Section key={section.sectionNumber} {...section} />
            ))}
          </div>

          <div className="mt-12 border-t border-neutral-200 pt-10">
            <h2 className="mb-6 text-2xl font-semibold text-neutral-900 md:text-3xl">
              Često postavljana pitanja (FAQ)
            </h2>
            <div className="space-y-4 text-neutral-700">
              <details className="rounded-md bg-neutral-50 p-4 shadow-sm">
                <summary className="cursor-pointer font-semibold">
                  Koliko traje dostava?
                </summary>
                <p className="mt-2 text-sm">
                  Standardna dostava traje 2-3 radna dana, dok je brza dostava
                  dostupna u roku od 1-2 radna dana.
                </p>
              </details>
              <details className="rounded-md bg-neutral-50 p-4 shadow-sm">
                <summary className="cursor-pointer font-semibold">
                  Kako mogu pratiti svoju narudžbu?
                </summary>
                <p className="mt-2 text-sm">
                  Nakon slanja narudžbe dobit ćete e-mail s brojem za praćenje.
                </p>
              </details>
              <details className="rounded-md bg-neutral-50 p-4 shadow-sm">
                <summary className="cursor-pointer font-semibold">
                  Mogu li preuzeti narudžbu u poslovnici?
                </summary>
                <p className="mt-2 text-sm">
                  Da, nudimo opciju preuzimanja u jednoj od naših poslovnica bez
                  dodatne naknade.
                </p>
              </details>
            </div>
          </div>
        </div>
        <aside className="space-y-8">
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
