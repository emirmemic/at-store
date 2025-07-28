import { useTranslations } from 'next-intl';

import PageTitle from '@/app/[locale]/(static-pages)/components/page-title';
import { InfoBlock } from '@/components';
import { getInfoBlocksData } from '@/lib/data';

import { MostSoldSection } from '../components';

import { Content } from './components';

import Link from 'next/link';
import { PAGE_NAMES } from '@/i18n/page-names';

export default function CartPage() {
  const t = useTranslations();
  // const infoBlocks = getInfoBlocksData(t); // unused

  return (
    <main className="w-full bg-white px-4 py-10 text-grey-almost-black md:px-8">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="mb-8 rounded-md bg-black px-4 py-3 text-sm font-medium text-white md:text-base">
          Besplatna dostava za narudžbe iznad 400 KM · Plaćanje na rate ·
          Sigurno plaćanje
        </div>
        <section className="mb-12">
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            {t('cartPage.title')}
          </h1>
          <div className="mb-6 h-[2px] w-20 bg-black" />
          <Content />
        </section>

        <section className="pt-12">
          <MostSoldSection />
        </section>

        <div className="mt-10 grid grid-cols-1 gap-4 rounded-lg border border-gray-200 p-4 md:grid-cols-3">
          <Link
            href="/dostava"
            className="rounded-lg transition hover:opacity-80"
          >
            <div className="flex items-start gap-2">
              <span className="text-lg">✓</span>
              <div>
                <p className="font-medium">Besplatna dostava</p>
                <p className="text-sm text-gray-500">
                  za narudžbe iznad 400 KM
                </p>
              </div>
            </div>
          </Link>
          <Link
            href="/nacini-placanja"
            className="rounded-lg transition hover:opacity-80"
          >
            <div className="flex items-start gap-2">
              <span className="text-lg">✓</span>
              <div>
                <p className="font-medium">Plaćanje na rate</p>
                <p className="text-sm text-gray-500">do 24 rate</p>
              </div>
            </div>
          </Link>
          <Link
            href="/nacini-placanja"
            className="rounded-lg transition hover:opacity-80"
          >
            <div className="flex items-start gap-2">
              <span className="text-lg">✓</span>
              <div>
                <p className="font-medium">Sigurno plaćanje</p>
                <p className="text-sm text-gray-500">kartice, rate, pouzeće</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-gray-200 pt-8 md:flex-row md:items-center">
          <Link
            href={PAGE_NAMES.HOME}
            className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-900"
          >
            Nastavi sa kupovinom
          </Link>
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
            <span className="font-medium text-gray-700">Podržavamo:</span>
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Monri</span>
            <span>Kartično plaćanje na rate</span>
            <span>Pouzeće</span>
          </div>
        </div>
        <section className="pt-16">
          <h2 className="mb-6 text-2xl font-bold md:text-3xl">
            Često postavljena pitanja
          </h2>
          <div className="space-y-4">
            <details className="group rounded-lg border border-gray-200 p-4">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-gray-900 group-open:mb-2">
                Kako mogu ostvariti besplatnu dostavu?
                <span className="ml-2 text-xl transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="text-sm text-gray-600">
                Besplatna dostava važi za sve narudžbe iznad 400 KM unutar Bosne
                i Hercegovine.
              </p>
            </details>
            <details className="group rounded-lg border border-gray-200 p-4">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-gray-900 group-open:mb-2">
                Kako funkcioniše plaćanje na rate?
                <span className="ml-2 text-xl transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="text-sm text-gray-600">
                Možete plaćati do 24 rate putem kartica banaka koje podržavaju
                rate kroz Monri sistem.
              </p>
            </details>
            <details className="group rounded-lg border border-gray-200 p-4">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-gray-900 group-open:mb-2">
                Da li je plaćanje sigurno?
                <span className="ml-2 text-xl transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="text-sm text-gray-600">
                Da. Koristimo Monri sigurnosni sistem koji podržava enkripciju i
                sigurnu verifikaciju.
              </p>
            </details>
          </div>
        </section>
      </div>
    </main>
  );
}
