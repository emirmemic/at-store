import FaqSection from '@/app/[locale]/(static-pages)/components/faq-section';
import IconInterest from '@/components/icons/interest';
import IconRepayments from '@/components/icons/repayments';
import IconRequest from '@/components/icons/request';
import MikrofinForm from './components/form';
import { getFaqSection } from '@/app/[locale]/(static-pages)/payment-methods/data';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';

interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData' });

  return {
    title: t('mikrofinInvoice.title'),
    description: t('mikrofinInvoice.description'),
    openGraph: {
      title: t('mikrofinInvoice.title'),
      description: t('mikrofinInvoice.description'),
    },
  };
}
export default function Page() {
  const t = useTranslations();
  const faqSection = getFaqSection(t);
  const cards = [
    {
      id: 1,
      title: t('mikrofinInvoicePage.IconRepayments'),
      Icon: IconRepayments,
    },
    {
      id: 2,
      title: t('mikrofinInvoicePage.IconRequest'),
      Icon: IconRequest,
    },
    {
      id: 3,
      title: t('mikrofinInvoicePage.IconInterest'),
      Icon: IconInterest,
    },
  ];
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="w-full bg-[#f5f7fa] px-6 py-16 md:px-10">
        <div className="mx-auto max-w-5xl text-center">
          <img
            alt="Mikrofin"
            className="mx-auto mb-6 h-12 w-auto md:h-16"
            src="/images/mikrofin.jpg"
          />
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Finansiranje uz Mikrofin
          </h1>
          <p className="text-lg text-gray-600">
            Nema potrebe da više gubite vrijeme na dolazak u poslovnice.
            Informišite se o našim proizvodima putem web stranice, a zatim
            podnesite online zahtjev za kredit.
          </p>
        </div>
      </section>

      {/* Icons section */}
      <section className="mt-20 px-6 md:px-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Zašto Mikrofin finansiranje?
          </h2>
          <div className="flex flex-col justify-between gap-8 text-center md:flex-row">
            <div className="flex-1 rounded-xl bg-white p-6 shadow-lg">
              <img className="mx-auto mb-4 h-16" src="/icons/icon1.svg" />
              <h3 className="mb-2 text-xl font-semibold">Bez kamata</h3>
              <p className="text-gray-600">
                Plaćate samo ono što kupite, bez skrivenih troškova.
              </p>
            </div>
            <div className="flex-1 rounded-xl bg-white p-6 shadow-lg">
              <img className="mx-auto mb-4 h-16" src="/icons/icon2.svg" />
              <h3 className="mb-2 text-xl font-semibold">Brzo odobrenje</h3>
              <p className="text-gray-600">
                Odobrenje kredita u roku od nekoliko minuta.
              </p>
            </div>
            <div className="flex-1 rounded-xl bg-white p-6 shadow-lg">
              <img className="mx-auto mb-4 h-16" src="/icons/icon3.svg" />
              <h3 className="mb-2 text-xl font-semibold">Bez papira</h3>
              <p className="text-gray-600">
                Kompletna procedura online, bez posjete poslovnici.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="mx-auto mt-16 grid max-w-6xl grid-cols-1 items-start gap-12 px-6 md:grid-cols-2 md:px-10">
        {/* Left info block */}
        <div className="rounded-xl bg-white p-6 shadow-lg">
          <MikrofinForm />
        </div>

        {/* Right info block */}
        <div>
          <div className="rounded-xl bg-[#f8fafc] p-6 text-gray-800 shadow-md">
            <h2 className="mb-4 text-2xl font-semibold">Kako funkcioniše?</h2>
            <p className="mb-4">
              Nakon popunjavanja obrasca, dobićete informacije o odobrenju i
              mogućnostima otplate direktno putem naše platforme.
            </p>
            <p>
              Kupovina na rate nikad nije bila jednostavnija – bez papirologije
              i čekanja.
            </p>
          </div>
          <div className="mt-6 rounded-xl bg-[#f8fafc] p-6 text-gray-800 shadow-md">
            <h2 className="mb-4 text-2xl font-semibold">Dodatne informacije</h2>
            <p>
              Detaljniji opis procesa, uslova i ostalih korisnih informacija za
              korisnike.
            </p>
          </div>
          <div className="mt-6 rounded-xl bg-[#f8fafc] p-6 text-gray-800 shadow-md">
            <h2 className="mb-4 text-2xl font-semibold">Kontaktirajte nas</h2>
            <p>
              Ukoliko imate pitanja ili nedoumice, slobodno nas kontaktirajte
              putem telefona ili emaila.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
          Načini plaćanja
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Plaćanje pouzećem */}
          <div className="flex flex-col items-center rounded-3xl bg-white p-8 text-center shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <h3 className="mb-4 text-2xl font-semibold">Plaćanje pouzećem</h3>
            <p className="mb-6 text-gray-600">
              Plaćanje robe pouzećem prilikom preuzimanja paketa.
            </p>
            <ul className="mb-6 list-inside list-disc space-y-2 text-left text-gray-700">
              <li>Plaćanje u gotovini ili karticom.</li>
              <li>Mogućnost pregledanja i provere proizvoda pre plaćanja.</li>
              <li>Bez dodatnih troškova za kupca.</li>
            </ul>
            <button className="mt-auto rounded-full bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700">
              Saznaj više
            </button>
          </div>

          {/* Plaćanje karticom */}
          <div className="flex flex-col items-center rounded-3xl bg-white p-8 text-center shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <h3 className="mb-4 text-2xl font-semibold">Plaćanje karticom</h3>
            <p className="mb-6 text-gray-600">
              Plaćanje putem platnih kartica na web prodavnici.
            </p>
            <ul className="mb-6 list-inside list-disc space-y-2 text-left text-gray-700">
              <li>Sigurno i brzo plaćanje.</li>
              <li>Podrška za Visa, MasterCard i druge kartice.</li>
              <li>Automatska potvrda porudžbine.</li>
            </ul>
            <button className="mt-auto rounded-full bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700">
              Saznaj više
            </button>
          </div>

          {/* Plaćanje na rate */}
          <div className="flex flex-col items-center rounded-3xl bg-white p-8 text-center shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <h3 className="mb-4 text-2xl font-semibold">Plaćanje na rate</h3>
            <p className="mb-6 text-gray-600">
              Kupovina proizvoda na rate bez kamata.
            </p>
            <ul className="mb-6 list-inside list-disc space-y-2 text-left text-gray-700">
              <li>Jednostavna procedura odobrenja.</li>
              <li>Fleksibilni rokovi otplate.</li>
              <li>Bez skrivenih troškova.</li>
            </ul>
            <button className="mt-auto rounded-full bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700">
              Saznaj više
            </button>
          </div>
        </div>
        <div className="w-full py-12 md:max-w-2xl md:px-3 md:py-[60px]">
          <p className="mb-6 heading-4 md:mb-9 md:heading-2">
            {t('paymentMethodsPage.faqTitle')}
          </p>
          {faqSection.map((faq) => (
            <FaqSection key={faq.question} {...faq} />
          ))}
        </div>
      </section>
    </main>
  );
}
