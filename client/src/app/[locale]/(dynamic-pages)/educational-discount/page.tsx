'use client';
// TODO Implement the section with product cards once the products are done
// TODO Add function to kupi Sada Button

import {
  atBusinessMac,
  iPadMiniAtBusiness,
  macBookAirEducationalDiscount,
} from '@/assets/images';

import { Button } from '@/components/ui/button';
import EducationalDiscountForm from './components/form';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

// export async function generateMetadata({ params }: GenerateMetadataParams) {
//   const { locale } = await params;
//   const t = await getTranslations({ locale, namespace: 'metaData' });

//   return {
//     title: t('educationalDiscount.title'),
//     description: t('educationalDiscount.description'),
//     openGraph: {
//       title: t('educationalDiscount.title'),
//       description: t('educationalDiscount.description'),
//     },
//   };
// }

export default function Page() {
  const t = useTranslations();

  const macItems = [
    {
      title: 'MacBook Air',
      subtitle: 'M4 čip',
      description:
        'Od 2.569 KM ili 118 KM/mjesec. na 24 mjeseca sa obrazovnim popustom.',
      image: '/assets/images/mbam4.png',
      icon: '🎓',
      onClick: () => {
        console.log('emirko');
      },
    },
    {
      title: 'MacBook Pro',
      subtitle: 'M4 čip',
      description:
        'Od 4.169 KM ili 191 KM/mjesec. na 24 mjeseca sa obrazovnim popustom.',
      image: '/assets/images/mbpm4.png',
      icon: '🎓',
    },
    {
      title: 'MacBook Air M3',
      subtitle: 'Tanji. Brži. Efikasniji.',
      description:
        'Od 2.249 KM ili 103 KM/mjesec. na 24 mjeseca sa obrazovnim popustom.',
      image: '/assets/images/mba.M3.png',
      icon: '🎓',
    },
    {
      title: 'MacBook Pro M3',
      subtitle: 'Snaga za kreativce',
      description:
        'Od 3.829 KM ili 176 KM/mjesec. na 24 mjeseca sa obrazovnim popustom.',
      image: '/assets/images/mbpm3.png',
      icon: '🎓',
    },
    {
      title: 'iMac 24"',
      subtitle: 'Savršen za rad od kuće ili učionicu.',
      description:
        'Od 3.329 KM ili 153 KM/mjesec. na 24 mjeseca sa obrazovnim popustom.',
      image: '/assets/images/imac.png',
      icon: '🎓',
    },
    {
      title: 'Mac Studio',
      subtitle: 'Napredna snaga. M4 Max.',
      description:
        'Od 5.199 KM ili 238 KM/mjesec. na 24 mjeseca sa obrazovnim popustom.',
      image: '/assets/images/macstudio.png',
      icon: '🎓',
    },
    {
      title: 'Mac mini',
      subtitle: 'Kompaktan i moćan',
      description:
        'Od 1.619 KM ili 74 KM/mjesec. na 24 mjeseca sa obrazovnim popustom.',
      image: '/assets/images/macmini.png',
      icon: '🎓',
    },
    {
      title: 'Studio Display',
      subtitle: 'Novo iskustvo',
      description:
        'Od 3.709 KM ili 170 KM/mjesec. na 24 mjeseca sa obrazovnim popustom.',
      image: '/assets/images/studiodisplay.png',
      icon: '🎓',
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
      image: '/assets/images/popust-studenti.png',
    },
    {
      icon: '💡',
      title: 'Podrška pri izboru uređaja',
      description:
        'Naše osoblje vam pomaže odabrati uređaj koji najbolje odgovara vašim potrebama.',
      image: '/assets/images/odabir.png',
    },
    {
      icon: '📦',
      title: 'Brza isporuka',
      description:
        'Naručite online i dobijte uređaj na kućnu adresu u najkraćem roku.',
      image: '/assets/images/memoji.png',
    },
    {
      icon: '💳',
      title: 'Fleksibilno finansiranje',
      description: 'Prilagođene opcije finansiranja za vaše potrebe.',
      image: '/assets/images/card.png',
    },
    {
      icon: '🛍️',
      title: 'Ekskluzivne ponude',
      description: 'Iskoristi posebne akcije i popuste koje AT Store nudi.',
      image: '/assets/images/multi_offer.png',
    },
    {
      icon: '🌍',
      title: 'Dostupnost širom BiH',
      description:
        'Bilo da si u Sarajevu, Mostaru, Banjoj Luci ili bilo gdje drugo — AT Store obrazovne pogodnosti su ti nadohvat ruke, online ili u poslovnicama.',
      image: '/assets/images/memoji.png',
    },
    {
      icon: '📚',
      title: 'Prilagođeno obrazovanju',
      description:
        'Po potrebi je moguća instalacija obrazovnih programa koje pomažu u učenju, istraživanju i kreativnosti – savršeno za školu, fakultet ili online kurseve.',
      image: '/assets/images/mbp_edu.png',
    },
  ];
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
                  <Image
                    fill
                    alt={item.title}
                    className="object-cover"
                    priority={index === 0}
                    sizes="(min-width: 768px) 33vw, 100vw"
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
      <section className="mt-20 w-full rounded-3xl bg-[#f7f7f7] py-16 pl-[10%] pr-[10%] text-gray-800 md:py-20">
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
          <Link href="/register">
            <Button size="lg" variant="filled">
              Registriraj se
            </Button>
          </Link>
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
                className="relative flex h-[460px] min-w-[360px] max-w-[360px] flex-shrink-0 cursor-pointer snap-center flex-col justify-between rounded-2xl bg-[#f7f7f7] p-6"
                onClick={item.onClick}
              >
                <div className="mb-2 text-ellipsis text-sm font-semibold uppercase text-orange-700">
                  Obrazovni popust
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
                  <Image
                    fill
                    alt={item.title}
                    className="object-cover"
                    priority={i === 0}
                    sizes="(min-width: 768px) 33vw, 100vw"
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
                className="relative flex h-[460px] min-w-[360px] max-w-[360px] flex-shrink-0 snap-center flex-col justify-between rounded-2xl bg-[#f7f7f7] p-6"
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
                  <Image
                    fill
                    alt={item.title}
                    className="object-cover"
                    priority={i === 0}
                    sizes="(min-width: 768px) 33vw, 100vw"
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
      <section className="relative mb-12 mt-12 h-[400px] w-full">
        <Image
          fill
          priority
          alt="Promotivni banner"
          className="object-cover brightness-75"
          sizes="100vw"
          src={'/assets/images/appleeducation.jpg'}
        />
        <div className="relative z-10 flex h-full flex-col items-start justify-center px-6 text-white md:px-24">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            Iskoristi pogodnosti obrazovanja
          </h2>
          <p className="max-w-xl text-lg md:text-xl">
            Popust od 5% važi za studente, za profesore i zaposlene u obrazovnim
            institucijama.
          </p>
        </div>
      </section>
      <section className="w-full py-10 pl-[10%] pr-[10%] md:py-14">
        <div className="flex flex-col gap-12 md:flex-row">
          {/* Lijevi blok: Forma */}
          <div className="mx-auto max-w-lg flex-1 rounded-3xl bg-white p-10 shadow-lg md:mx-0">
            <EducationalDiscountForm />
          </div>

          {/* Desni blok: Tri kartice */}
          <div className="flex flex-1 flex-col justify-center gap-6">
            {[
              {
                title: 'Obrazovni popust.',
                description:
                  'Obrazovni popust važi za studente, profesore i zaposlene u obrazovnim institucijama.',
              },
              {
                title: 'Najbolji u klasi. Na fakultetu i dalje.',
                description:
                  'Šta god da vam koledž baci na put, Mac i iPad vam čuvaju leđa.',
              },
              {
                title: 'Škola? Sjajno.',
                description:
                  'Popust od 5% važi za studente, za profesore i zaposlene u obrazovnim institucijama.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group cursor-pointer rounded-3xl bg-[#f7f7f7] p-8 shadow-md transition hover:scale-[1.02] hover:shadow-xl"
              >
                <h3 className="mb-2 text-2xl font-semibold text-teal-700 transition group-hover:text-blue-900">
                  {item.title}
                </h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full bg-white px-[10%] py-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
          Često postavljana pitanja
        </h2>
        <div className="ml-0 space-y-6">
          <details className="group rounded-xl border p-6 transition">
            <summary className="cursor-pointer text-lg font-medium text-gray-800 group-open:text-teal-700">
              Kako mogu da iskoristim EDU popust?
            </summary>
            <p className="mt-2 text-gray-600">
              Popust mogu da ostvare studenti, profesori ili zaposleni pri
              obrazovnim institucijama. Neophodno je da u svoj korisnički nalog
              priložite skeniranu kopiju indeksa sa overenom tekućom godinom
              studiranja ili potvrdu o zaposlenju pri obrazovnoj instituciji.
            </p>
          </details>
          <details className="group rounded-xl border p-6 transition">
            <summary className="cursor-pointer text-lg font-medium text-gray-800 group-open:text-blue-700">
              Na koje proizvode mogu ostvariti EDU popust?
            </summary>
            <p className="mt-2 text-gray-600">
              Popust važi za sve Mac modele, uključujući i modele koji već imaju
              snižene cijene.
            </p>
          </details>
          <details className="group rounded-xl border p-6 transition">
            <summary className="cursor-pointer text-lg font-medium text-gray-800 group-open:text-blue-700">
              Da li EDU popust važi za Mac modele specifične konfiguracije?
            </summary>
            <p className="mt-2 text-gray-600">
              Da, EDU popust važi za Mac modele specifične konfiguracije koji se
              proizvode po pojedinačnom upitu.
            </p>
          </details>
        </div>
      </section>
    </main>
  );
}
