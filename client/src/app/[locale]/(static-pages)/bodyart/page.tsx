'use client';

import {
  airpods4,
  airpodsMax,
  airpodsMaxOrange,
  airpodsPro2,
  appleWatch,
  awNSB,
  awNSL,
  awOB,
  awSe,
  awSeries10,
  awUltra,
  beats,
  beatsSolo4,
  bodyArtLogo,
  slusalice,
  zvucnici,
} from '@/assets/images';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BodyArt() {
  const router = useRouter();
  const data = [
    {
      title: 'AirPods Pro 2. generacija',
      img: airpodsPro2,
      url: '/proizvodi/music/APP2/apple-airpods-pro2-with-magsafe-case-usb-c-9764',
    },
    {
      title: 'AirPods Max',
      img: airpodsMax,
      url: '/proizvodi/music/APM/apple-airpods-max-silver-5687',
    },
    {
      title: 'AirPods 4',
      img: airpods4,
      url: '/proizvodi/music/AP4/apple-airpods-4-usb-c-with-active-noise-cancellation-95024037',
    },

    { title: 'Beats', img: beats, url: '/kategorije/music/beats' },
    { title: 'Zvučnici', img: zvucnici, url: '/kategorije/music/zvucnici' },
    { title: 'Slušalice', img: slusalice, url: '' },
  ];

  const watchData = [
    {
      title: 'Apple Watch Series 10',
      originalPrice: 899,
      discountPrice: 859,
      url: '',
      img: awSeries10,
    },
    {
      title: 'Apple Watch Ultra 2',
      originalPrice: 1.999,
      discountPrice: 1.899,
      url: '',
      img: awUltra,
    },
    {
      title: 'Apple Watch SE',
      originalPrice: 499,
      discountPrice: 479,
      url: '',
      img: awSe,
    },
  ];

  const headphonesData = [
    {
      title: 'AirPods Pro 2',
      originalPrice: 589,
      discountPrice: 559,
      url: '',
      img: airpodsPro2,
    },
    {
      title: 'AirPods Max',
      originalPrice: 1.339,
      discountPrice: 1.269,
      url: '',
      img: airpodsMaxOrange,
    },
    {
      title: 'Beats Solo 4',
      originalPrice: 519,
      discountPrice: 469,
      url: '',
      img: beatsSolo4,
    },
  ];

  const bandsData = [
    {
      title: 'Apple Watch Nike Sport Band',
      discountPrice: 129,
      url: '',
      img: awNSB,
    },
    {
      title: 'Apple Watch Nike Sport Loop',
      discountPrice: 129,
      url: '',
      img: awNSL,
    },
    {
      title: 'Apple Watch 49mm Ocean Band',
      discountPrice: 249,
      url: '',
      img: awOB,
    },
  ];

  return (
    <main className="bg-white text-gray-900">
      {/* Hero sekcija */}
      <section className="flex flex-col items-center justify-center gap-6 px-4 py-16 text-center">
        <Image
          alt={'Body Art Logo'}
          className="w-48"
          height={200}
          src={bodyArtLogo}
          width={200}
        />
        <h1 className="text-6xl font-extrabold">
          Želiš trenirati sa nama? OK!
        </h1>
        <div>
          <p className="mt-4 text-3xl font-bold">
            AT Store i Body Art spajaju inovaciju i snagu za tvoje rezultate.
          </p>
          <p className="mt-4 text-xl">
            Članovi fitness kluba Body Art ostvaruju ekskluzivne pogodnosti
            prilikom kupovine selektiranih Apple uređaja. Detalje i uslove
            ponude potražite ispod.
          </p>
        </div>
        <button className="mt-6 rounded-2xl bg-blue-600 px-4 py-2 text-lg text-white">
          Iskoristi popust
        </button>
      </section>
      <section className="bg-black px-4 py-16">
        <div className="mx-auto flex max-w-6xl flex-col">
          <div className="mb-12 text-center">
            <div className="text-6xl">🏃‍♂️</div>
            <h2 className="mt-2 text-6xl font-bold text-red-500">
              Vaša članarina vrijedi više.
            </h2>
            <p className="mt-2 text-3xl text-white">
              AT Store vam donosi ekskluzivne popuste na Apple proizvode.
            </p>
            <p className="mt-2 text-2xl text-white">
              Iskoristite ovu priliku i nabavite Apple Watch, AirPods ili Beats
              po povoljnijim cijenama.
            </p>
            <p className="mt-2 text-xl text-white">
              <a href="#" className="underline">
                Kako ostati fit? Izazovi sebe &gt;
              </a>
            </p>
          </div>
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            {/* FAQ Accordion */}
            <div>
              <span className="px-2 text-3xl font-bold text-white">
                Pitanja? Odgovoreno.
              </span>
              <div className="mt-4 divide-y divide-gray-200 overflow-hidden rounded-xl border bg-white shadow">
                <details className="group open:bg-gray-50">
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-4 font-semibold">
                    <span>Kako mogu da ostvarim popust?</span>
                    <span className="transform transition-transform group-open:rotate-180">
                      ⌄
                    </span>
                  </summary>
                  <div className="px-6 pb-4 text-sm text-gray-700">
                    Iskoristite ekskluzivnu pogodnost uz predočenje važeće{' '}
                    <strong>Body Art članske kartice </strong>
                    ostvarujete popust pri kupovini u AT Storeu. Popust vrijedi
                    na sve Apple Watch modele, AirPods i kompletan muzički
                    program, te se obračunava odmah na kasi.
                  </div>
                </details>
                <details className="group open:bg-gray-50">
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-4 font-semibold">
                    <span>Gdje se može iskoristiti popust?</span>
                    <span className="transform transition-transform group-open:rotate-180">
                      ⌄
                    </span>
                  </summary>
                  <div className="px-6 pb-4 text-sm text-gray-700">
                    Popusti su dostupni isključivo u našoj fizičkoj trgovini,
                    gdje se vrši provjera vašeg članstva na licu mjesta.
                    Posjetite nas i iskoristite svoju člansku pogodnost odmah
                    prilikom kupovine. Detaljnije o AT Store lokacijama možete
                    saznati klikom ovdje.
                  </div>
                </details>
                <details className="group open:bg-gray-50">
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-4 font-semibold">
                    <span>Mogu li ostvariti popust za Apple Watch?</span>
                    <span className="transform transition-transform group-open:rotate-180">
                      ⌄
                    </span>
                  </summary>
                  <div className="px-6 pb-4 text-sm text-gray-700">
                    Svi članovi Body Arta ostvaruju 5% popusta na sve Apple
                    Watch modele. Dovoljno je prilikom kupovine predočiti važeću
                    člansku karticu Body Arta kako bi se popust odmah
                    primijenio. Popust nije vremenski ograničen i odnosi se na
                    već snižene artikle ili promotivne pakete.
                  </div>
                </details>
                <details className="group open:bg-gray-50">
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-4 font-semibold">
                    <span>Da li imam popust na AirPods?</span>
                    <span className="transform transition-transform group-open:rotate-180">
                      ⌄
                    </span>
                  </summary>
                  <div className="px-6 pb-4 text-sm text-gray-700">
                    Članovi Body Arta ostvaruju 5% popusta na sve AirPods i 10%
                    popusta na Beats proizvode. Dovoljno je prilikom kupovine
                    predočiti važeću člansku karticu Body Arta kako bi se popust
                    odmah primijenio. Popust nije vremenski ograničen i odnosi
                    se na već snižene artikle ili promotivne pakete.
                  </div>
                </details>
              </div>
            </div>
            {/* Image */}
            <div className="flex justify-center">
              <Image
                alt={'Body Art Logo'}
                className="w-64"
                height={200}
                src={appleWatch}
                width={200}
              />
            </div>
          </div>
        </div>
      </section>

      {/* PONUDE */}
      <section className="mt-10 text-center text-white">
        <div className="mx-4 rounded-[2rem] bg-red-500 px-4 py-12">
          <h2 className="mb-2 text-4xl font-extrabold">
            Želiš trenirati uz AirPods? Iskoristi popust.
          </h2>
          <p className="mb-8 text-xl">
            Popust se odnosi na kompletan muzički program
          </p>
          <div className="grid grid-cols-2 place-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {data.map((item, i) => (
              <div
                key={i}
                onClick={() => router.push(item.url)}
                className="flex cursor-pointer flex-col items-center rounded-xl bg-white p-8 text-center text-black shadow"
              >
                <Image
                  alt={item.title}
                  className="mb-2"
                  height={120}
                  src={item.img}
                  width={120}
                />
                <span className="text-sm font-medium">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Satovi */}
        <div className="mt-8 text-3xl text-black">
          <p>
            <span className="text-gray-800">Samo za </span>
            <span className="font-bold underline decoration-green-500 decoration-4 underline-offset-4">
              članove
            </span>
          </p>
          <p className="mt-2 text-4xl font-bold">5% popusta za Apple Watch.</p>
          <a href="#" className="text-xl underline">
            Izazovi sebe &gt;
          </a>
          <div className="flex items-center justify-center">
            <div className="mb-10 mt-10 grid w-full max-w-7xl grid-cols-1 gap-3 px-12 md:grid-cols-3">
              {watchData.map((item, i) => (
                <div
                  key={i}
                  onClick={() => router.push(item.url)}
                  className="flex cursor-pointer flex-col items-center rounded-xl bg-white p-8 text-center text-black shadow"
                >
                  <Image
                    alt={item.title}
                    className="mb-2"
                    height={350}
                    src={item.img}
                    width={350}
                  />
                  <span className="text-2xl font-thin">{item.title}</span>
                  <span className="mt-2 text-sm font-thin">Od</span>
                  <span className="text-lg font-semibold">
                    {item.originalPrice} KM
                  </span>
                  <span className="mt-2 text-2xl font-bold">Za članove</span>
                  <span className="text-3xl font-bold text-red-500">
                    {item.discountPrice} KM
                  </span>
                  <Link
                    href={item.url}
                    className="mt-6 w-full rounded-full bg-red-500 p-4 text-xl font-thin text-white"
                  >
                    Saznaj više
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Slusalice */}
        <div className="mt-8 text-3xl text-black">
          <p className="mt-2 text-4xl font-bold">
            5% popusta na sve slušalice? Dobro zvuči.
          </p>
          <a href="#" className="text-xl underline">
            Klikni za snagu &gt;
          </a>
          <div className="flex items-center justify-center">
            <div className="mb-10 mt-10 grid w-full max-w-7xl grid-cols-1 gap-3 px-12 md:grid-cols-3">
              {headphonesData.map((item, i) => (
                <div
                  key={i}
                  onClick={() => router.push(item.url)}
                  className="flex cursor-pointer flex-col items-center rounded-xl bg-white p-8 text-center text-black shadow"
                >
                  <Image
                    alt={item.title}
                    className="mb-2 md:h-[350px] md:w-[350px]"
                    height={350}
                    src={item.img}
                    width={350}
                  />
                  <span className="text-2xl font-thin">{item.title}</span>
                  <span className="mt-2 text-sm font-thin">Od</span>
                  <span className="text-lg font-semibold">
                    {item.originalPrice} KM
                  </span>
                  <span className="mt-2 text-2xl font-bold">Za članove</span>
                  <span className="text-3xl font-bold text-red-500">
                    {item.discountPrice} KM
                  </span>
                  <Link
                    href={item.url}
                    className="mt-6 w-full rounded-full bg-red-500 p-4 text-xl font-thin text-white"
                  >
                    Započni trening
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Narukvice */}
        <div className="mt-8 text-3xl text-black">
          <p className="mt-2 text-4xl font-bold">
            Do 10% popusta na narukvice za Apple Watch.
          </p>
          <a href="#" className="text-xl underline">
            Klikni za snagu &gt;
          </a>
          <div className="flex items-center justify-center">
            <div className="mb-10 mt-10 grid w-full max-w-7xl grid-cols-1 gap-3 px-12 md:grid-cols-3">
              {bandsData.map((item, i) => (
                <div
                  key={i}
                  onClick={() => router.push(item.url)}
                  className="flex cursor-pointer flex-col items-center rounded-xl bg-white p-8 text-center text-black shadow"
                >
                  <Image
                    alt={item.title}
                    className="mb-2 md:h-[350px] md:w-[100px]"
                    height={350}
                    src={item.img}
                    width={100}
                  />
                  <span className="text-xl font-thin">{item.title}</span>
                  <span className="mt-2 text-2xl font-bold">Za članove</span>
                  <span className="text-3xl font-bold text-red-500">
                    {item.discountPrice} KM
                  </span>
                  <Link
                    href={item.url}
                    className="mt-6 w-full rounded-full bg-red-500 p-4 text-xl font-thin text-white"
                  >
                    Započni trening
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Preporuka AIRPODS MAX */}
      <section className="mb-10 mt-10 text-center text-black">
        <div className="relative flex h-[600px] w-full items-center justify-center bg-[#100021]">
          <div className="text-md absolute top-8 z-10 text-center font-bold text-[#F3AD87] md:text-4xl">
            <span>
              Apple stručnjaci preporučuju <br />
              AirPods Max
            </span>
          </div>
          <Image
            className="absolute top-1/2 mt-24 -translate-y-1/2"
            src={airpodsMaxOrange}
            alt={'Airpods Max Orange'}
            width={600}
            height={600}
          />
        </div>
        {/* TEKST */}
        <div className="mt-24 flex flex-col gap-4">
          <span className="text-xl font-thin">
            Istraživanja pokazuju da čak 80% korisnika doživljava učinkovitiji i
            fokusiraniji trening uz <b>AirPods Max</b>.
          </span>
          <span className="text-xl font-thin">
            Savršen zvuk, udobnost i aktivno poništavanje buke čine ih idealnim
            partnerom za svaki funkcionalni trening.
          </span>
          <span className="text-2xl font-bold">Cijena samo za članove</span>
          <span className="text-4xl font-extrabold text-red-500">1.269 KM</span>
          <div className="flex w-full items-center justify-center">
            <button className="w-fit rounded-full bg-red-500 px-6 py-2 text-xl text-white">
              Kupi sada
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
