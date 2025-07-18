import Link from 'next/link';
import { getFaqSection } from './data';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';

interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'paymentMethods' });
  return {
    title: t('paymentMethods.title'),
    description: t('paymentMethods.description'),
    openGraph: {
      title: t('paymentMethods.title'),
      description: t('paymentMethods.description'),
    },
  };
}

export default function PaymentMethods() {
  const t = useTranslations();

  const faqSection = getFaqSection(t);

  return (
    <div className="w-full py-12 container-max-width md:py-[60px]">
      <h1 className="mb-8 text-center text-3xl font-semibold md:text-4xl">
        {t('paymentMethodsPage.title')}
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left content */}
        <div className="lg:col-span-2">
          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
            <div className="rounded-md bg-neutral-50 p-6 shadow-sm">
              <h2 className="mb-2 text-xl font-semibold">
                {t('Jednokratna plaćanja')}
              </h2>
              <p className="text-sm text-neutral-700">
                {t(
                  'Možete plaćati debitnim i kreditnim karticama, uključujući Maestro, Visa, Mastercard, Diners, American Express.'
                )}
              </p>
            </div>
            <div className="rounded-md bg-neutral-50 p-6 shadow-sm">
              <h2 className="mb-2 text-xl font-semibold">
                {t('Plaćanje na rate')}
              </h2>
              <p className="text-sm text-neutral-700">
                {t(
                  'Omogućeno do 36 rata putem banaka kao što su UniCredit, NLB, Raiffeisen i ProCredit Bank.'
                )}
              </p>
            </div>
            <div className="rounded-md bg-neutral-50 p-6 shadow-sm">
              <h2 className="mb-2 text-xl font-semibold">
                {t('Plaćanje pouzećem')}
              </h2>
              <p className="text-sm text-neutral-700">
                {t(
                  'Dostupno samo u online trgovini. Plaćanje gotovinom prilikom preuzimanja.'
                )}
              </p>
            </div>
          </div>

          <div className="mb-12 rounded-md bg-neutral-100 p-6 md:p-10">
            <h2 className="mb-4 text-2xl font-semibold">
              {t('Dodatne opcije')}
            </h2>
            <ul className="list-disc space-y-2 pl-6 text-sm text-neutral-700">
              <li>
                {t(
                  'Plaćanje virmanom ili internet bankarstvom uz automatski e-mail s podacima za uplatu.'
                )}
              </li>
              <li>
                {t(
                  'Online plaćanje kreditnim i debitnim karticama (MasterCard, Visa, Maestro).'
                )}
              </li>
              <li>
                {t('Kreditiranje putem Mikrofina bez dolaska u poslovnicu.')}
              </li>
            </ul>
          </div>

          <div className="space-y-4 text-neutral-700">
            {faqSection.map((faqSection) => (
              <details
                key={faqSection.question}
                className="rounded-md bg-neutral-50 p-4 shadow-sm"
              >
                <summary className="cursor-pointer font-semibold">
                  {faqSection.question}
                </summary>
                <p className="mt-2 text-sm">{faqSection.answer}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          <div className="flex flex-col items-center rounded-lg bg-neutral-100 px-6 py-8 text-center shadow-sm">
            <h2 className="mb-2 text-xl font-semibold text-neutral-900">
              {t('Potrebna vam je pomoć?')}
            </h2>
            <p className="mb-4 text-sm text-neutral-700">
              {t(
                'Naša korisnička podrška stoji vam na raspolaganju za sva pitanja.'
              )}
            </p>
            <Link
              className="inline-block rounded-full bg-black px-6 py-2 text-sm font-medium text-white transition hover:bg-neutral-800"
              href="/contact"
            >
              {t('Kontaktirajte nas')}
            </Link>
          </div>
          <div className="flex flex-col rounded-lg bg-neutral-100 px-6 py-8 shadow-sm">
            <h3 className="mb-4 text-center text-base font-semibold text-neutral-900">
              {t('Brzi linkovi za pomoć')}
            </h3>
            <ul className="space-y-3 text-center text-sm text-blue-600">
              <li>
                <Link className="hover:underline" href="/faq/shipping">
                  {t('Informacije o isporuci')}
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/faq/returns">
                  {t('Povrati i reklamacije')}
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/faq/payment">
                  {t('Načini plaćanja')}
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
              {t('Pronađite poslovnicu')}
            </h3>
            <p className="mb-4 text-sm text-neutral-700">
              {t('Posjetite najbližu AT Store lokaciju za podršku i kupovinu.')}
            </p>
            <Link
              className="inline-block rounded-full bg-black px-6 py-2 text-sm font-medium text-white transition hover:bg-neutral-800"
              href="/find-store"
            >
              {t('Pronađi poslovnicu')}
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
