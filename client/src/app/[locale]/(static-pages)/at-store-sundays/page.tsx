'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IconAtStoreLogo } from '@/components/icons';
import { TypeAnimation } from 'react-type-animation';
import dynamic from 'next/dynamic';
const CurrentPromotions = dynamic(
  () =>
    import(
      '@/components/strapi/single-types/current-promotions/current-promotions'
    ),
  { ssr: true }
);

export default function AtStoreSundays() {
  return (
    <div className="min-h-screen space-y-8 px-4 py-6 sm:px-6 md:mx-auto md:max-w-screen-xl md:px-8">
      <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-red-600 px-2 py-8 text-center sm:gap-2 sm:px-4 sm:py-6">
        <IconAtStoreLogo className="h-20 w-full object-contain text-white md:w-60" />
        <div className="w-full text-center text-4xl font-bold text-white sm:text-6xl">
          <TypeAnimation
            repeat={1}
            sequence={['Sundays']}
            speed={10}
            style={{ fontSize: '2em', display: 'inline-block' }}
            wrapper="span"
          />
        </div>
        <p className="mt-2 text-center text-base font-medium text-white">
          Posebna ponuda svake nedjelje u Delta Shopping Centru
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-6 sm:space-y-0">
          <div className="space-y-6 sm:space-y-10">
            <div className="rounded-xl bg-neutral-800 p-6 text-white">
              <h2 className="mb-2 text-center text-2xl font-bold sm:text-left">
                Nedjelja je rezervirana za ovo.
              </h2>
              <p className="text-center sm:text-left">
                Posjetite nas u AT Store poslovnici u Delta Shopping Centru,
                Banja Luka. Iskoristite posebne pogodnosti na široku ponudu
                dodataka i učinite svoje Apple uređaje još praktičnijim,
                sigurnijim i modernijim.
              </p>
            </div>
            <div className="rounded-xl bg-black p-6 text-white">
              <h2 className="mb-2 text-center text-2xl font-bold sm:text-left">
                Nedjeljom je jedinstvena prilika
              </h2>
              <p className="text-center sm:text-left">
                <strong>10%</strong> popusta na sve Apple dodatke.
              </p>
              <p className="text-center sm:text-left">
                <strong>30%</strong> popusta na sve dodatke drugih proizvođača.
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-6 sm:space-y-0">
          <div className="flex h-full flex-col justify-between rounded-xl bg-black p-6 text-white">
            <h2 className="mb-4 text-center text-3xl font-bold sm:text-left">
              Zašto odabrati originalne dodatke za svoj Apple uređaj?
            </h2>
            <div className="space-y-4 text-center text-base sm:text-left">
              <p>
                Originalni dodaci dizajnirani su kako bi savršeno funkcionirali
                s vašim Apple uređajem, osiguravajući vrhunske performanse,
                sigurnost i trajnost.
              </p>
              <p>
                Neoriginalni proizvodi mogu uzrokovati kvarove, smanjiti vijek
                trajanja uređaja ili čak predstavljati sigurnosni rizik.
              </p>
              <p>
                Odaberite originalne dodatke za najbolju zaštitu i dugoročno
                uživanje u vašem uređaju.
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-6 sm:space-y-0 md:col-span-2">
          <div className="rounded-xl bg-white p-6 shadow-md">
            <h2 className="mb-4 text-center text-3xl font-semibold text-gray-900 sm:text-left">
              Još više razloga da nas posjetite
            </h2>
            <div className="mb-4">
              <Image
                src="/assets/images/delta2.jpg"
                alt="AT Store iskustvo"
                width={1200}
                height={400}
                className="h-auto w-full rounded-lg object-cover"
              />
            </div>
            <div className="space-y-2 text-center text-base leading-relaxed text-gray-700 sm:text-left">
              <p>
                Svake nedjelje, osim popusta na dodatke, pripremili smo i
                posebne savjete i preporuke za vaše uređaje.
              </p>
              <p>
                Naš tim stručnjaka vam stoji na raspolaganju za personalizirane
                savjete o zaštiti uređaja, optimizaciji performansi i preporuci
                dodatne opreme koja najbolje odgovara vašim potrebama.
              </p>
              <p>
                Posjetite nas u opuštenoj atmosferi, isprobajte dodatke uživo i
                doživite Apple iskustvo kakvo zaslužujete.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-between gap-6 rounded-xl bg-neutral-900 p-6 text-left text-white md:flex-row">
        <div className="w-full space-y-4 pt-10 text-left md:w-1/2">
          <h2 className="text-3xl font-bold">
            Vidimo se ove nedjelje u AT Store!
          </h2>
          <p className="text-lg">
            Ekskluzivne pogodnosti, profesionalni savjeti i Apple iskustvo koje
            se pamti.
          </p>
        </div>

        <div className="w-full overflow-hidden rounded-xl md:w-1/2">
          <video
            className="mx-auto w-full max-w-sm rounded-lg"
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            controls={false}
          >
            <source src="/assets/images/deltavideo.mp4" type="video/mp4" />
            Vaš browser ne podržava video tag.
          </video>
        </div>
      </div>
      <div className="space-y-4 rounded-xl bg-white p-6 text-center shadow-md">
        <h3 className="text-center text-2xl font-semibold text-gray-900">
          Gdje nas možete pronaći?
        </h3>
        <p className="text-center text-gray-700">
          AT Store – Delta Shopping Centar, Banja Luka
        </p>
        <Link
          href="/find-store"
          className="inline-block rounded-md bg-black px-6 py-2 font-medium text-white transition hover:bg-gray-800"
        >
          Pronađi poslovnicu
        </Link>
      </div>
    </div>
  );
}
