'use client';

import Link from 'next/link';

export default function BodyArt() {
  return (
    <main className="bg-white text-gray-900">
      {/* Hero sekcija */}
      <section className="px-4 py-16 text-center">
        <h1 className="text-4xl font-bold">Želiš trenirati sa nama? OK!</h1>
        <p className="mt-4">
          AT Store i Body Art spajaju inovaciju i snagu za tvoje rezultate.
        </p>
        <button className="mt-6 rounded bg-blue-600 px-4 py-2 text-white">
          Iskoristi popust
        </button>
      </section>

      {/* Uvodni paragraf i list pitanja */}
      <section className="mx-auto max-w-2xl px-4 py-8">
        <h2 className="mb-4 text-2xl font-semibold">
          Članovi fitness kluba Body Art ostvaruju ekskluzivne pogodnosti
        </h2>
        <p>
          Članovi fitness kluba Body Art ostvaruju ekskluzivne pogodnosti
          prilikom kupovine selektiranih Apple uređaja. Detalje i uslove ponude
          potražite ispod.
        </p>

        <dl className="mt-6 space-y-4">
          <div>
            <dt className="font-semibold">Kako mogu da ostvarim popust?</dt>
            <dd>
              Iskoristite ekskluzivnu pogodnost uz predočenje važeće Body Art
              članske kartice…
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Gdje se može iskoristiti popust?</dt>
            <dd>Popusti su dostupni isključivo u našoj fizičkoj trgovini…</dd>
          </div>
          <div>
            <dt className="font-semibold">
              Mogu li ostvariti popust za Apple Watch?
            </dt>
            <dd>
              Svi članovi Body Arta ostvaruju 5% popusta na sve Apple Watch
              modele
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Da li imam popust na AirPods?</dt>
            <dd>
              Članovi Body Arta ostvaruju 5% popusta na sve AirPods i 10% na
              Beats
            </dd>
          </div>
        </dl>
      </section>

      {/* Pregled ponude */}
      <section className="bg-gray-100 py-8">
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 px-4 md:grid-cols-2">
          {[
            {
              title: 'Apple Watch Series 10',
              price: '899 KM',
              member: '859 KM',
            },
            {
              title: 'Apple Watch Ultra 2',
              price: '1 999 KM',
              member: '1 899 KM',
            },
            { title: 'Apple Watch SE', price: '499 KM', member: '479 KM' },
            { title: 'AirPods Pro 2', price: '589 KM', member: '559 KM' },
            { title: 'AirPods Max', price: '1 339 KM', member: '1 269 KM' },
            { title: 'Beats Solo 4', price: '519 KM', member: '469 KM' },
          ].map((item, i) => (
            <div key={i} className="rounded border bg-white p-4 shadow">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p>Od: {item.price}</p>
              <p>
                Za članove: <strong>{item.member}</strong>
              </p>
              <Link
                className="mt-2 inline-block rounded bg-blue-600 px-3 py-1 text-white"
                href="#"
              >
                Saznaj više
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Dodaci i zaključak */}
      <section className="px-4 py-8 text-center">
        <p>Do 10% popusta na narukvice za Apple Watch.</p>
        <button className="mt-4 rounded bg-blue-600 px-4 py-2 text-white">
          Klikni za snagu &gt;&gt;
        </button>

        <p className="mt-8 italic">
          “Stručnjaci preporučuju AirPods Max – 80% korisnika doživljava
          učinkovitiji trening…”
        </p>
      </section>
    </main>
  );
}
