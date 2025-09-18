import FaqSection from '@/app/[locale]/(static-pages)/components/faq-section';
import MikrofinForm from './components/form';
import { getFaqSection } from '@/app/[locale]/(static-pages)/payment-methods/data';
import { getTranslations } from 'next-intl/server';
import mikrofinLogo from '../../../../../public/assets/images/Mikrofin-logo_1.jpg';
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

console.log(mikrofinLogo);
export default function Page() {
  const t = useTranslations();
  const faqSection = getFaqSection(t);

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="w-full bg-[#06306a] px-6 py-16 md:px-10">
        <div className="mx-auto max-w-5xl text-center">
          <img
            alt="Mikrofin"
            className="mx-auto mb-6 h-20 w-auto md:h-24"
            src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/assets/images/Mikrofin-logo_1.jpg`}
          />
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Finansiranje uz Mikrofin
          </h1>
          <p className="text-lg text-white">
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
          <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-3">
            <div className="flex flex-col items-center rounded-3xl border border-gray-200 bg-white/20 p-8 shadow-md backdrop-blur-xl transition-all duration-500 hover:shadow-xl">
              <img
                className="mx-auto mb-4 h-14"
                src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/assets/images/rok-otplate.svg`}
                alt="Rok otplate"
              />
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Rok otplate
              </h3>
              <p className="text-gray-600">
                Od 60 dana do 36 mjeseci, u zavisnosti od visine iznosa.
              </p>
            </div>
            <div className="flex flex-col items-center rounded-3xl border border-gray-200 bg-white/20 p-8 shadow-md backdrop-blur-xl transition-all duration-500 hover:shadow-xl">
              <img
                className="mx-auto mb-4 h-14"
                src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/assets/images/iznos.svg`}
                alt="Brzo odobrenje"
              />
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Brzo odobrenje
              </h3>
              <p className="text-gray-600">
                Odobrenje kredita u roku od nekoliko minuta.
              </p>
            </div>
            <div className="flex flex-col items-center rounded-3xl border border-gray-200 bg-white/20 p-8 shadow-md backdrop-blur-xl transition-all duration-500 hover:shadow-xl">
              <img
                className="mx-auto mb-4 h-14"
                src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/assets/images/online.svg`}
                alt="Bez papira"
              />
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Bez papira
              </h3>
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
        <div className="grid grid-cols-1 gap-8">
          <div className="flex flex-col items-center rounded-3xl border border-gray-200 bg-white/20 p-8 text-center shadow-md backdrop-blur-xl transition-all duration-500 hover:shadow-xl">
            <h3 className="mb-4 text-2xl font-semibold">Kako funkcioniše?</h3>
            <p className="mb-4 text-gray-600">
              Nakon popunjavanja obrasca, dobićete informacije o odobrenju i
              mogućnostima otplate direktno putem naše platforme.
            </p>
            <p className="text-gray-600">
              Kupovina na rate nikad nije bila jednostavnija – bez papirologije
              i čekanja.
            </p>
          </div>

          <div className="flex flex-col items-center rounded-3xl border border-gray-200 bg-white/20 p-8 text-center shadow-md backdrop-blur-xl transition-all duration-500 hover:shadow-xl">
            <h3 className="mb-4 text-2xl font-semibold">Dodatne informacije</h3>
            <p className="text-gray-600">
              Detaljniji opis procesa, uslova i ostalih korisnih informacija za
              korisnike.
            </p>
          </div>

          <div className="flex flex-col items-center rounded-3xl border border-gray-200 bg-white/20 p-8 text-center shadow-md backdrop-blur-xl transition-all duration-500 hover:shadow-xl">
            <h3 className="mb-4 text-2xl font-semibold">Kontaktirajte nas</h3>
            <p className="text-gray-600">
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
          <div className="flex flex-col items-center rounded-3xl border border-gray-200 bg-white/20 p-8 text-center shadow-md backdrop-blur-xl transition-all duration-500 hover:shadow-xl">
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
          <div className="flex flex-col items-center rounded-3xl border border-gray-200 bg-white/20 p-8 text-center shadow-md backdrop-blur-xl transition-all duration-500 hover:shadow-xl">
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
          <div className="flex flex-col items-center rounded-3xl border border-gray-200 bg-white/20 p-8 text-center shadow-md backdrop-blur-xl transition-all duration-500 hover:shadow-xl">
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
        <div className="w-full py-12 md:px-3 md:py-[60px]">
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
