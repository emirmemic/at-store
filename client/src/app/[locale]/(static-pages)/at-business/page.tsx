import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { macBookAirM1AtBusiness } from '@/assets/images';
import { Button } from '@/components/ui/button';

import ImgSection from '../components/img-section';
import { IconAtBusiness } from '../icons';

import { getImgSectionInfo } from './data';

interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData' });
  return {
    title: t('atBusiness.title'),
    description: t('atBusiness.description'),
    openGraph: {
      title: t('atBusiness.title'),
      description: t('atBusiness.description'),
    },
  };
}
export default function AtBusinessPage() {
  const t = useTranslations();
  const imgSectionInfo = getImgSectionInfo(t);
  const sectionBaseStyles =
    'rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-popup-black';
  return (
    <div className="relative overflow-hidden bg-black text-white">
      <main className="flex flex-col px-6 py-16 container-max-width md:px-16">
        {/* HERO SECTION */}
        <section className="mb-12 flex flex-col-reverse items-center gap-12 rounded-lg border-b border-gray-700 bg-black/50 pb-12 backdrop-blur-sm md:flex-row md:gap-10">
          <div className="flex-1 text-balance text-center md:text-start">
            <h1 className="pb-12 text-4xl font-extrabold leading-tight text-white md:pb-6 md:text-6xl">
              {t('atBusinessPage.title')}
            </h1>
            <p className="text-lg leading-relaxed text-gray-300 md:text-xl">
              {t('atBusinessPage.description')}
            </p>
          </div>
          <IconAtBusiness
            className="w-full max-w-80 md:max-w-[380px]"
            fill="white"
          />
        </section>

        {/* WHY CHOOSE US SECTION */}
        <section className="mt-16 flex w-full flex-col items-center rounded-3xl bg-gray-900 p-8 shadow-lg">
          <h2 className="mb-4 text-center text-3xl font-bold underline decoration-blue-500 decoration-4 underline-offset-8 md:text-4xl">
            Zašto odabrati nas kao svog poslovnog partnera
          </h2>
          <p className="mb-10 max-w-2xl text-center text-lg text-gray-300 md:text-xl">
            Kao ovlašteni Apple partner, nudimo stručnost, podršku i prilagođena
            rješenja za vaše poslovanje. Naš tim brine o vašim potrebama kako
            biste se vi mogli fokusirati na rast i uspjeh vašeg poduzeća.
          </p>
          <div className="grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
            {/* Card 1 */}
            <div className="flex h-full flex-col items-center rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 shadow-popup-black">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 bg-opacity-20">
                <svg
                  className="h-8 w-8 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 4v16m8-8H4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <h3 className="mb-3 text-center text-xl font-semibold text-white">
                Stručna podrška
              </h3>
              <p className="text-center text-base text-gray-300">
                Naš tim certificiranih Apple stručnjaka stoji vam na
                raspolaganju za savjetovanje i podršku u svakom koraku.
              </p>
            </div>
            {/* Card 2 */}
            <div className="flex h-full flex-col items-center rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 shadow-popup-black">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-600 bg-opacity-20">
                <svg
                  className="h-8 w-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  ></circle>
                  <path
                    d="M8 12l2 2 4-4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <h3 className="mb-3 text-center text-xl font-semibold text-white">
                Prilagođena rješenja
              </h3>
              <p className="text-center text-base text-gray-300">
                Nudimo personalizirane ponude i implementaciju Apple uređaja
                prema specifičnim potrebama vašeg poslovanja.
              </p>
            </div>
            {/* Card 3 */}
            <div className="flex h-full flex-col items-center rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 shadow-popup-black">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-600 bg-opacity-20">
                <svg
                  className="h-8 w-8 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13 16h-1v-4h-1m1-4h.01"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  ></circle>
                </svg>
              </div>
              <h3 className="mb-3 text-center text-xl font-semibold text-white">
                Brza isporuka i podrška
              </h3>
              <p className="text-center text-base text-gray-300">
                Osiguravamo brzu isporuku, instalaciju i kontinuiranu tehničku
                podršku za vaše Apple uređaje.
              </p>
            </div>
          </div>
        </section>

        {/* APPLE DEVICES SECTIONS */}
        <section className="mt-16">
          <div className="w-full">
            <img
              alt="Mac za poslovne korisnike"
              className="h-auto w-full object-cover"
              src="/client/public/images/why-mac-devices.png"
            />
            <div className="w-full bg-black px-6 py-10 text-center text-white md:px-16">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Mac za poslovne korisnike
              </h2>
              <p className="text-lg text-gray-300 md:text-xl">
                Brzina, pouzdanost i moć — savršeno za svakodnevne poslovne
                izazove.
              </p>
            </div>
          </div>
          {/* MACBOOKS SECTION */}
          <div className="mx-auto mt-20 grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-2 md:px-0">
            {/* MacBook Air M1 */}
            <section className="flex flex-col items-stretch gap-8">
              <div className="w-full">
                <img
                  alt="MacBook Air M1"
                  className="h-[300px] max-h-[50vh] w-full rounded-3xl object-contain shadow-lg"
                  src="/images/macbook-air-m1.png"
                />
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="flex items-start gap-6 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 shadow-lg">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600">
                    <svg
                      className="h-7 w-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 4v16m8-8H4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      Vrhunske performanse
                    </h3>
                    <p className="text-gray-300">
                      Najnoviji M1 čip pruža nevjerojatnu brzinu i efikasnost za
                      poslovne zadatke.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 shadow-lg">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-600">
                    <svg
                      className="h-7 w-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                      ></circle>
                      <path
                        d="M8 12l2 2 4-4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      Dugotrajna baterija
                    </h3>
                    <p className="text-gray-300">
                      Uživajte u dugom trajanju baterije koja prati vaše
                      poslovne potrebe cijeli dan.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <Button size="lg" variant="filled">
                  Kupi sada
                </Button>
              </div>
            </section>
            {/* MacBook Pro M4 */}
            <section className="flex flex-col items-stretch gap-8">
              <div className="w-full">
                <img
                  alt="MacBook Pro M4"
                  className="h-[300px] max-h-[50vh] w-full rounded-3xl object-contain shadow-lg"
                  src="/images/macbook-air-m1.png"
                />
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="flex items-start gap-6 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 shadow-lg">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600">
                    <svg
                      className="h-7 w-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 4v16m8-8H4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      Profesionalne performanse
                    </h3>
                    <p className="text-gray-300">
                      MacBook Pro M4 donosi ekstremnu snagu za najzahtjevnije
                      poslovne i kreativne zadatke.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 shadow-lg">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-600">
                    <svg
                      className="h-7 w-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                      ></circle>
                      <path
                        d="M8 12l2 2 4-4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      Napredna grafika
                    </h3>
                    <p className="text-gray-300">
                      Savršen za obradu videa, dizajn i softverski razvoj uz
                      novu M4 grafiku i optimizaciju.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <Button size="lg" variant="filled">
                  Kupi sada
                </Button>
              </div>
            </section>
          </div>
          <div className="mt-20 w-full">
            <img
              alt="iPhone u poslovanju"
              className="h-auto w-full object-cover"
              src="/images/iphone.jpg"
            />
            <div className="w-full bg-black px-6 py-10 text-center text-white md:px-16">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                iPhone u poslovanju
              </h2>
              <p className="text-lg text-gray-300 md:text-xl">
                Sigurnost i mobilnost uz najpametniji telefon na tržištu.
              </p>
            </div>
          </div>
          <div className="w-full">
            <img
              alt="iPad za produktivnost"
              className="h-auto w-full object-cover"
              src="/images/ipad.jpg"
            />
            <div className="w-full bg-black px-6 py-10 text-center text-white md:px-16">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                iPad za produktivnost
              </h2>
              <p className="text-lg text-gray-300 md:text-xl">
                Fleksibilnost tableta uz moć laptopa u vašem poslovanju.
              </p>
            </div>
          </div>
        </section>

        {/* STEP-BY-STEP SECTION */}
        <section className="mt-20 w-full rounded-3xl bg-gray-900 px-6 py-10 text-white shadow-lg md:px-16 md:py-16">
          <h2 className="mb-8 text-center text-4xl font-extrabold">
            Početak je jednostavan
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-gray-300 md:text-xl">
            Registrirajte svoj poslovni profil, prijavite se i odmah počnite
            štedjeti.
          </p>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {/* Step 1 */}
            <div
              className="flex flex-col items-center rounded-2xl p-8 text-center"
              style={{ backgroundColor: 'rgba(59, 130, 246, 0.25)' }}
            >
              <div className="mb-4 text-5xl font-extrabold text-blue-600">
                1
              </div>
              <h3 className="mb-3 text-xl font-semibold">
                Kreirajte korisnički račun
              </h3>
              <p className="max-w-xs text-gray-300">
                Za početak registrirajte svoje poduzeće. Ako već imate račun kod
                nas, morat ćete izraditi novi, zasebni profil za svoje
                poslovanje.
              </p>
            </div>

            {/* Step 2 */}
            <div
              className="flex flex-col items-center rounded-2xl p-8 text-center"
              style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)' }}
            >
              <div className="mb-4 text-5xl font-extrabold text-blue-600">
                2
              </div>
              <h3 className="mb-3 text-xl font-semibold">
                Pričekajte našu početnu procjenu
              </h3>
              <p className="max-w-xs text-gray-300">
                Na temelju podataka o vašem poduzeću pregledat ćemo vašu
                registraciju i dodijeliti vam početne popuste. Imajte na umu da
                ovaj proces može trajati do 24 sata.
              </p>
            </div>

            {/* Step 3 */}
            <div
              className="flex flex-col items-center rounded-2xl p-8 text-center"
              style={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
            >
              <div className="mb-4 text-5xl font-extrabold text-blue-600">
                3
              </div>
              <h3 className="mb-3 text-xl font-semibold">
                Iskoristite naše popuste i pogodnosti
              </h3>
              <p className="max-w-xs text-gray-300">
                Čim ste spremni i prijavljeni, odmah ćete vidjeti dostupne
                popuste. Sada možete započeti kupovinu i uskladiti je sa svojim
                poslovnim potrebama.
              </p>
            </div>
          </div>
          <div className="mt-12 flex justify-center">
            <Button size="lg" variant="filled">
              Registrirajte svoju tvrtku
            </Button>
          </div>
        </section>
        {/* HARIS DZIKO CONTACT BLOCK */}
        <section className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-gray-900 p-8 text-white shadow-lg md:flex-row"
            >
              <div className="flex-shrink-0">
                <img
                  alt="Haris Dziko"
                  className="h-24 w-24 rounded-full object-cover shadow-md md:h-28 md:w-28"
                  src="/images/haris-dziko.jpg"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="mb-2 text-sm uppercase tracking-wider text-gray-400">
                  Vaš kontakt za poslovne korisnike
                </p>
                <h3 className="mb-2 text-2xl font-bold">Haris Dziko</h3>
                <p className="mb-4 text-lg text-gray-300">B2B Manager</p>
                <div className="flex flex-col gap-2 text-sm md:flex-row md:items-center md:text-base">
                  <Link
                    className="text-blue-400 hover:underline"
                    href="tel:+387956188"
                  >
                    +387956188
                  </Link>
                  <span className="hidden text-gray-500 md:inline-block">
                    |
                  </span>
                  <Link
                    className="text-blue-400 hover:underline"
                    href="mailto:b2b@atstore.ba"
                  >
                    b2b@atstore.ba
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
