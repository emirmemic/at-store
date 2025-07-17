// TODO Implement the section with product cards once the products are done
// TODO Add function to kupi Sada Button

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import SafeImage from './components/SafeImage';

const macItems = [
  {
    title: 'MacBook Air',
    subtitle: 'Apple Intelligence',
    description: 'From $899 or $74.91/mo. for 12 mo.† with education savings',
    image: '/images/mac-1.jpg',
    icon: '🎓',
  },
  {
    title: 'MacBook Pro',
    subtitle: 'M4 Chip',
    description: 'Powerful performance for professionals and students alike.',
    image: '/images/mac-2.jpg',
    icon: '💻',
  },
  {
    title: 'MacBook Air M2',
    subtitle: 'Tanji. Brži. Efikasniji.',
    description: 'Od 1.999 KM uz EDU popust. Idealno za studente.',
    image: '/images/mac-3.jpg',
    icon: '✨',
  },
  {
    title: 'MacBook Pro M3',
    subtitle: 'Snaga za kreativce',
    description: 'Profesionalni alati. Studentska cijena.',
    image: '/images/mac-4.jpg',
    icon: '🚀',
  },
  {
    title: 'iMac 24"',
    subtitle: 'Sve-u-jednom',
    description: 'Savršen za rad od kuće ili učionicu.',
    image: '/images/mac-5.jpg',
    icon: '🖥️',
  },
  {
    title: 'Mac Studio',
    subtitle: 'Napredna snaga',
    description: 'Za najzahtjevnije kreativne zadatke.',
    image: '/images/mac-6.jpg',
    icon: '🎛️',
  },
  {
    title: 'Mac mini',
    subtitle: 'Kompaktan i moćan',
    description: 'Idealno rješenje za studente programere.',
    image: '/images/mac-7.jpg',
    icon: '📦',
  },
  {
    title: 'MacBook Air M3',
    subtitle: 'Novo iskustvo',
    description: 'Ušteda i performanse u jednom.',
    image: '/images/mac-8.jpg',
    icon: '🌟',
  },
];

const ipadItems = [
  {
    title: 'iPad Air',
    subtitle: 'Apple Intelligence',
    description: 'From $599 or $49.91/mo. for 12 mo.† with education savings',
    image: '/images/ipad-1.jpg',
    icon: '🎓',
  },
  {
    title: 'iPad Pro',
    subtitle: 'M4 Chip',
    description: 'Professional power for creative minds.',
    image: '/images/ipad-2.jpg',
    icon: '🖊️',
  },
  {
    title: 'iPad 10th Gen',
    subtitle: 'Boje. Moć. Praktičnost.',
    description: 'Odličan izbor za školske obaveze.',
    image: '/images/ipad-3.jpg',
    icon: '📘',
  },
  {
    title: 'iPad mini',
    subtitle: 'Mali, ali moćan',
    description: 'Savršen za čitanje i bilješke.',
    image: '/images/ipad-4.jpg',
    icon: '📱',
  },
  {
    title: 'iPad 9th Gen',
    subtitle: 'Dostupan i pouzdan',
    description: 'Omiljeni izbor učenika i roditelja.',
    image: '/images/ipad-5.jpg',
    icon: '🧮',
  },
  {
    title: 'iPad Pro 13"',
    subtitle: 'Najveći ekran ikad',
    description: 'Više prostora za kreativnost.',
    image: '/images/ipad-6.jpg',
    icon: '📺',
  },
  {
    title: 'iPad Air M2',
    subtitle: 'Više snage, isti stil',
    description: 'Povežite se, stvarajte i učite.',
    image: '/images/ipad-7.jpg',
    icon: '🌈',
  },
  {
    title: 'iPad Pro 11"',
    subtitle: 'Prijenosna moć',
    description: 'Savršen spoj performansi i prenosivosti.',
    image: '/images/ipad-8.jpg',
    icon: '🔋',
  },
];

const benefitsItems = [
  {
    icon: '🎓',
    title: 'Popust za studente',
    description:
      'Uživajte u posebnim cijenama na Mac uređaje uz dokaz o obrazovanju.',
    image: 'assets/images/popust-studenti.png',
  },
  {
    icon: '💡',
    title: 'Podrška pri izboru uređaja',
    description:
      'Naše osoblje vam pomaže odabrati uređaj koji najbolje odgovara vašim potrebama.',
    image: 'assets/images/odabir.png',
  },
  {
    icon: '📦',
    title: 'Brza isporuka',
    description:
      'Naručite online i dobijte uređaj na kućnu adresu u najkraćem roku.',
    image: 'assets/images/memoji.png',
  },
  {
    icon: '💳',
    title: 'Fleksibilno finansiranje',
    description: 'Prilagođene opcije finansiranja za vaše potrebe.',
    image: '/images/mac-2.jpg',
  },
  {
    icon: '🛍️',
    title: 'Ekskluzivne ponude',
    description: 'Iskoristi posebne akcije i popuste koje AT Store nudi.',
    image: '/images/mac-2.jpg',
  },
  {
    icon: '🌍',
    title: 'Dostupnost širom BiH',
    description:
      'Bilo da si u Sarajevu, Mostaru, Banjoj Luci ili bilo gdje drugo — AT Store obrazovne pogodnosti su ti nadohvat ruke, online ili u poslovnicama.',
    image: '/images/mac-2.jpg',
  },
  {
    icon: '📚',
    title: 'Prilagođeno obrazovanju',
    description:
      'Po potrebi je moguća instalacija obrazovnih programa koje pomažu u učenju, istraživanju i kreativnosti – savršeno za školu, fakultet ili online kurseve.',
    image: '/images/mac-2.jpg',
  },
];

import {
  atBusinessMac,
  iPadMiniAtBusiness,
  macBookAirEducationalDiscount,
  macBookAirM1AtBusiness,
} from '@/assets/images';
import { Button } from '@/components/ui/button';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Link } from '@/i18n/routing';

import { ImgSection } from '../../(static-pages)/components';

import EducationalDiscountForm from './components/form';

interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData' });

  return {
    title: t('educationalDiscount.title'),
    description: t('educationalDiscount.description'),
    openGraph: {
      title: t('educationalDiscount.title'),
      description: t('educationalDiscount.description'),
    },
  };
}

export default function Page() {
  const t = useTranslations();
  const imgSection = [
    {
      title: t('educationalDiscountPage.item1.title'),
      description: t('educationalDiscountPage.item1.description'),
      name: 'Mac',
      image: atBusinessMac,
      id: 1,
    },
    {
      title: t('educationalDiscountPage.item2.title'),
      description: t('educationalDiscountPage.item2.description'),
      name: 'IPhone',
      image: macBookAirEducationalDiscount,
      id: 2,
    },
    {
      title: t('educationalDiscountPage.item3.title'),
      description: t('educationalDiscountPage.item3.description'),
      name: 'IPad',
      image: iPadMiniAtBusiness,
      id: 3,
    },
  ];

  return (
    <main className="w-full py-12 md:py-16 lg:py-16">
      <div className="w-full py-10">
        <div className="flex flex-col items-start justify-between gap-6 px-4 container-max-width md:flex-row md:items-center md:px-0">
          <div className="text-left">
            <h1 className="text-4xl font-bold md:text-5xl">
              <span className="ml-[100px] text-teal-700">
                Obrazovni popust.
              </span>{' '}
              <br></br>
              <span className="ml-[100px] text-gray-900">
                Učenje bez granica.
              </span>{' '}
            </h1>
          </div>
          <div className="flex flex-col gap-4 text-right text-sm text-gray-700">
            {/* Pomoć pri kupovini */}
            <div className="flex items-start gap-3">
              <div>
                <span className="inline-block flex h-6 w-6 items-center justify-center rounded-full">
                  🎓
                </span>
              </div>
              <div>
                <h3 className="mr-[100px] text-sm font-semibold text-gray-900">
                  Potrebna pomoć
                </h3>
                <a
                  className="mr-[100px] text-sm text-blue-600 underline hover:text-blue-800"
                  href="mailto:at@atstore.ba"
                >
                  Kontaktirajte nas
                </a>
              </div>
            </div>
            {/* Pronađite poslovnicu */}
            <div className="flex items-start gap-3">
              <div>
                <span className="text-sm text-blue-600 hover:text-blue-800">
                  📍
                </span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Posjeti AT Store
                </h3>
                <Link
                  className="text-sm text-blue-600 underline hover:text-blue-800"
                  href="/find-store"
                >
                  Pronađi poslovnicu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Novi slider za Pogodnosti uređaje */}
      <section className="w-full py-12 pb-6 pl-[10%] pr-0">
        <h2 className="mb-6 pl-4 text-2xl font-bold md:text-4xl">Pogodnosti</h2>
        <div className="relative w-full pl-0 pr-0">
          <div
            className="scrollbar-hide flex snap-x snap-mandatory space-x-6 overflow-x-auto scroll-smooth pr-6"
            id="benefits-slider"
          >
            {benefitsItems.map((item, index) => (
              <div
                key={index}
                className="relative flex h-[460px] min-w-[360px] max-w-[360px] flex-shrink-0 snap-center flex-col justify-between rounded-2xl bg-[#f7f7f7] p-6"
              >
                <div className="mb-2 text-ellipsis text-sm font-semibold uppercase text-orange-700">
                  Podrška obrazovanju u <br></br>svakom koraku.
                </div>
                <h3 className="mb-1 h-[52px] overflow-hidden text-ellipsis text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <div className="mb-3 h-[60px] overflow-hidden text-ellipsis text-sm text-gray-700">
                  {item.description}
                </div>
                <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
                  <img
                    alt={item.title}
                    className="h-full w-full object-cover"
                    src={item.image}
                  />
                </div>
                <div className="absolute right-4 top-4 text-2xl">
                  {item.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mt-16 grid w-full gap-12 pl-[10%] pr-[10%] md:grid-cols-3">
        {imgSection.map(({ id, title, description, image, name }) => (
          <div
            key={id}
            className="group flex flex-col rounded-3xl bg-white p-6 shadow-lg transition-transform hover:scale-[1.03] hover:shadow-xl"
          >
            <div className="relative mb-6 h-48 w-full overflow-hidden rounded-2xl">
              <Image
                fill
                alt={name}
                className="object-cover transition-transform group-hover:scale-105"
                priority={id === 1}
                sizes="(min-width: 768px) 33vw, 100vw"
                src={image}
              />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              {title}
            </h3>
            <p className="text-gray-600">{description}</p>
          </div>
        ))}
      </section>
      <section className="mt-20 w-full rounded-3xl py-16 pl-[10%] pr-[10%] text-gray-800 md:py-20">
        <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-gray-700 md:text-xl">
          Registrirajte svoj profil, prijavite se i odmah počnite štedjeti.
        </p>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Step 1 */}
          <div className="flex flex-col items-center rounded-xl bg-blue-50 p-10 text-center shadow-md transition hover:shadow-lg">
            <div className="mb-4 text-5xl font-extrabold text-blue-500">1</div>
            <h3 className="mb-3 text-xl font-semibold text-blue-700">
              Registruj se
            </h3>
            <p className="max-w-xs text-gray-800">
              Napravi svoj korisnički nalog na našem sajtu.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center rounded-xl bg-blue-50 p-10 text-center shadow-md transition hover:shadow-lg">
            <div className="mb-4 text-5xl font-extrabold text-blue-500">2</div>
            <h3 className="mb-3 text-xl font-semibold text-blue-700">
              Prikači
            </h3>
            <p className="max-w-xs text-gray-800">
              Prikači scan tvog indeksa ili potvrdu o zaposlenju pri nekoj
              obrazovnoj instituciji.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center rounded-xl bg-blue-50 p-10 text-center shadow-md transition hover:shadow-lg">
            <div className="mb-4 text-5xl font-extrabold text-blue-500">3</div>
            <h3 className="mb-3 text-xl font-semibold text-blue-700">Uštedi</h3>
            <p className="max-w-xs text-gray-800">
              Izaberi savršen Mac za tebe, unesi kod kupona u korpu i cijena će
              biti umanjena.
            </p>
          </div>
        </div>
        <div className="mt-12 flex justify-center">
          <Button size="lg" variant="filled">
            Registriraj se
          </Button>
        </div>
      </section>
      {/* Novi slider za Mac uređaje */}
      <section className="w-full py-12 pb-6 pl-[10%] pr-0">
        <h2 className="mb-6 pl-4 text-2xl font-bold md:text-4xl">
          Mac za obrazovanje
        </h2>
        <div className="relative w-full pl-0 pr-0">
          <div
            className="scrollbar-hide flex snap-x snap-mandatory space-x-6 overflow-x-auto scroll-smooth pr-6"
            id="mac-slider"
          >
            {macItems.map((item, i) => (
              <div
                key={i}
                className="relative flex h-[460px] min-w-[360px] max-w-[360px] flex-shrink-0 snap-center flex-col justify-between rounded-2xl bg-green p-6"
              >
                <div className="mb-2 text-ellipsis text-sm font-semibold uppercase text-orange-700">
                  Offer eligible
                </div>
                <h3 className="mb-1 h-[52px] overflow-hidden text-ellipsis text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <div className="mb-1 text-ellipsis text-sm font-medium text-blue-600">
                  {item.subtitle}
                </div>
                <div className="mb-3 h-[60px] overflow-hidden text-ellipsis text-sm text-gray-700">
                  {item.description}
                </div>
                <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
                  <img
                    alt={item.title}
                    className="h-full w-full object-cover"
                    src={item.image}
                  />
                </div>
                <div className="absolute right-4 top-4 text-2xl">
                  {item.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Novi slider za iPad uređaje */}
      <section className="w-full py-12 pb-6 pl-[10%] pr-0">
        <h2 className="mb-6 pl-4 text-2xl font-bold md:text-4xl">
          iPad za obrazovanje
        </h2>
        <div className="relative w-full pl-0 pr-0">
          <div
            className="scrollbar-hide flex snap-x snap-mandatory space-x-6 overflow-x-auto scroll-smooth pr-6"
            id="ipad-slider"
          >
            {ipadItems.map((item, i) => (
              <div
                key={i}
                className="relative flex h-[460px] min-w-[360px] max-w-[360px] flex-shrink-0 snap-center flex-col justify-between rounded-2xl bg-green p-6"
              >
                <div className="mb-2 text-ellipsis text-sm font-semibold uppercase text-orange-700">
                  Offer eligible
                </div>
                <h3 className="mb-1 h-[52px] overflow-hidden text-ellipsis text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <div className="mb-1 text-ellipsis text-sm font-medium text-blue-600">
                  {item.subtitle}
                </div>
                <div className="mb-3 h-[60px] overflow-hidden text-ellipsis text-sm text-gray-700">
                  {item.description}
                </div>
                <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
                  <img
                    alt={item.title}
                    className="h-full w-full object-cover"
                    src={item.image}
                  />
                </div>
                <div className="absolute right-4 top-4 text-2xl">
                  {item.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* MacBook Air M1, MacBook Pro M4, iMac horizontal cards */}
      <section className="flex w-full flex-col gap-8 py-12 pl-[10%] pr-[10%] md:flex-row">
        {/* MacBook Air M1 */}
        <div className="flex flex-1 flex-col rounded-3xl bg-gray-100 p-6 shadow-lg">
          <div className="mb-6 w-full">
            <img
              alt="MacBook Air M1"
              className="h-[250px] w-full rounded-3xl object-contain shadow-lg"
              src="/images/macbook-air-m1.png"
            />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 4v16m8-8H4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="mb-1 text-lg font-semibold text-black">
                  Vrhunske performanse
                </h3>
                <p className="text-sm text-black">
                  Najnoviji M1 čip pruža nevjerojatnu brzinu i efikasnost za
                  poslovne zadatke.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600">
                <svg
                  className="h-6 w-6 text-white"
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
                  />
                  <path
                    d="M8 12l2 2 4-4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="mb-1 text-lg font-semibold text-black">
                  Dugotrajna baterija
                </h3>
                <p className="text-sm text-black">
                  Uživajte u dugom trajanju baterije koja prati vaše poslovne
                  potrebe cijeli dan.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <Button size="lg" variant="filled">
              Kupi sada
            </Button>
          </div>
        </div>

        {/* MacBook Pro M4 */}
        <div className="flex flex-1 flex-col rounded-3xl bg-gray-100 p-6 shadow-lg">
          <div className="mb-6 w-full">
            <img
              alt="MacBook Pro M4"
              className="h-[250px] w-full rounded-3xl object-contain shadow-lg"
              src="/images/macbook-pro-m4.png"
            />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 4v16m8-8H4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="mb-1 text-lg font-semibold text-black">
                  Profesionalne performanse
                </h3>
                <p className="text-sm text-black">
                  MacBook Pro M4 donosi ekstremnu snagu za najzahtjevnije
                  poslovne i kreativne zadatke.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600">
                <svg
                  className="h-6 w-6 text-white"
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
                  />
                  <path
                    d="M8 12l2 2 4-4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="mb-1 text-lg font-semibold text-black">
                  Napredna grafika
                </h3>
                <p className="text-sm text-black">
                  Savršen za obradu videa, dizajn i softverski razvoj uz novu M4
                  grafiku i optimizaciju.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <Button size="lg" variant="filled">
              Kupi sada
            </Button>
          </div>
        </div>

        {/* iMac */}
        <div className="flex flex-1 flex-col rounded-3xl bg-gray-100 p-6 shadow-lg">
          <div className="mb-6 w-full">
            <img
              alt="iMac"
              className="h-[250px] w-full rounded-3xl object-contain shadow-lg"
              src="/images/imac.png"
            />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 4v16m8-8H4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="mb-1 text-lg font-semibold text-black">
                  Moćan i elegantan
                </h3>
                <p className="text-sm text-black">
                  iMac je savršen za produktivnost i kreativni rad sa
                  impresivnim ekranom.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600">
                <svg
                  className="h-6 w-6 text-white"
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
                  />
                  <path
                    d="M8 12l2 2 4-4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="mb-1 text-lg font-semibold text-black">
                  Impresivan ekran
                </h3>
                <p className="text-sm text-black">
                  Uživajte u živopisnim bojama i oštroj slici zahvaljujući
                  vrhunskom Retina ekranu.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <Button size="lg" variant="filled">
              Kupi sada
            </Button>
          </div>
        </div>
      </section>
      <section className="w-full py-10 pl-[10%] pr-[10%] md:py-14">
        <div className="flex flex-col gap-12 md:flex-row">
          {/* Lijevi blok: Forma */}
          <div className="mx-auto max-w-lg flex-1 rounded-3xl bg-white p-10 shadow-lg md:mx-0">
            <EducationalDiscountForm />
          </div>

          {/* Desni blok: Tri kartice */}
          <div className="flex flex-1 flex-col justify-center gap-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="cursor-pointer rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg"
              >
                <h3 className="mb-2 text-xl font-semibold">Kartica {item}</h3>
                <p className="text-gray-600">
                  Ovo je opis kartice broj {item}. Može sadržavati informacije
                  ili benefite koje želite istaknuti.
                </p>
                <button className="mt-4 rounded-md bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700">
                  Saznaj više
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
