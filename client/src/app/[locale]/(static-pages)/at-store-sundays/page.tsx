'use client';

import { IconAtStoreLogo } from '@/components/icons';
import { TypeAnimation } from 'react-type-animation';

export default function AtStoreSundays() {
  return (
    <div className="min-h-screen space-y-8 bg-gradient-to-br from-gray-100 to-white p-6">
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg bg-red-600 py-8">
        <IconAtStoreLogo className="h-20 w-full object-contain text-black md:w-60" />
        <div className="w-full text-center text-6xl font-bold text-white">
          <TypeAnimation
            repeat={1}
            sequence={['Sundays']}
            speed={50}
            style={{ fontSize: '2em', display: 'inline-block' }}
            wrapper="span"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-xl bg-neutral-800 p-6 text-white">
            <h2 className="mb-2 text-2xl font-bold">
              Nedjelja je rezervirana za ovo.
            </h2>
            <p>
              Posjetite nas u AT Store poslovnici u Delta Shopping Centru, Banja
              Luka. Iskoristite posebne pogodnosti na široku ponudu dodataka i
              učinite svoje Apple uređaje još praktičnijim, sigurnijim i
              modernijim.
            </p>
          </div>
          <div className="rounded-xl bg-black p-6 text-white">
            <h2 className="mb-2 text-2xl font-bold">
              Nedjeljom je jedinstvena prilika
            </h2>
            <p>
              <strong>10%</strong> popusta na sve Apple dodatke.
            </p>
            <p>
              <strong>30%</strong> popusta na sve dodatke drugih proizvođača.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between rounded-xl bg-black p-6 text-white">
          <h2 className="mb-4 text-3xl font-bold">
            Zašto odabrati originalne dodatke za svoj Apple uređaj?
          </h2>
          <div className="space-y-4 text-base">
            <p>
              Originalni dodaci dizajnirani su kako bi savršeno funkcionirali s
              vašim Apple uređajem, osiguravajući vrhunske performanse,
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
    </div>
  );
}
