'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Page() {
  const jobs = [
    {
      id: 1,
      title: '',
      department: 'Sarajevo',
      category: 'Sale Support',
      type: 'Stalno zaposlenje',
      description: 'Prodaja u poslovnicama i direktan rad sa kupcima.',
      noOpenPositions: false,
      applyLink: '/jobs/sarajevo',
    },
    {
      id: 2,
      title: '',
      department: 'Banja Luka',
      category: 'Sale Support',
      type: 'Stalno zaposlenje',
      description: 'Prodaja u poslovnicama i direktan rad sa kupcima.',
      noOpenPositions: false,
      applyLink: '/jobs/banja-luka',
    },
    {
      id: 3,
      title: '',
      department: 'Sarajevo',
      category: 'Voditelj poslovnice (m/ž)',
      type: 'Stalno zaposlenje',
      description:
        'Organizacija i vođenje poslovnice, upravljanje timom i odgovornost za prodajne rezultate.',
      noOpenPositions: false,
      applyLink: '/jobs/voditelj-poslovnice-sa',
    },
    {
      id: 4,
      title: 'Marketing Specijalista',
      department: 'Mostar',
      category: 'Marketing Manager',
      type: '',
      description: '',
      noOpenPositions: true,
      applyLink: '',
    },
    {
      id: 5,
      title: '',
      department: 'Sarajevo',
      category: 'B2B Specijalist',
      type: 'Puno radno vrijeme',
      description:
        'Razvoj i održavanje poslovnih odnosa sa kompanijama, priprema ponuda i realizacija B2B prodaje.',
      noOpenPositions: false,
      applyLink: 'jobs/b2b',
    },
    {
      id: 6,
      title: '',
      department: 'Sarajevo',
      category: 'Savjetnik prodaje',
      type: 'Puno radno vrijeme',
      description:
        'Savjetovanje kupaca, prezentacija proizvoda i pružanje podrške pri izboru i kupovini.',
      noOpenPositions: false,
      applyLink: 'jobs/savjetnik-prodaja-sa',
    },
  ];

  const groupedJobs = jobs.reduce(
    (acc, job) => {
      if (!acc[job.category]) {
        acc[job.category] = [];
      }
      acc[job.category].push(job);
      return acc;
    },
    {} as Record<string, typeof jobs>
  );

  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {}
  );

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <main className="py-12 container-max-width md:py-16">
      <section className="mb-16 text-center">
        <Image
          src="/assets/images/jobs.png"
          alt="Join our team"
          width={2048}
          height={280}
          className="mx-auto mb-8 h-64 w-full max-w-4xl rounded-3xl object-cover shadow-lg"
          priority
        />
        <h2 className="mb-4 text-3xl font-semibold tracking-tight text-gray-900">
          Pridruži se AT Store timu
        </h2>
        <p className="mx-auto max-w-4xl text-lg text-gray-600">
          U <b>AT Store</b> vjerujemo u inovacije, saradnju i savršenstvo.{' '}
          <br />
          Istražite uzbudljive prilike za karijeru i postanite dio naše misije
          stvaranja premium iskustava za naše kupce.
        </p>
      </section>
      <h1 className="mb-12 text-center text-4xl font-semibold tracking-tight text-gray-900">
        Pozicije
      </h1>
      {Object.entries(groupedJobs).map(([category, jobsInCategory]) => (
        <section key={category} className="mb-4">
          <button
            onClick={() => toggleCategory(category)}
            className="mb-6 flex w-full items-center justify-between rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 p-4 text-left text-2xl font-semibold tracking-tight text-gray-900 shadow transition-all hover:from-gray-200 hover:to-gray-300"
          >
            <span>{category}</span>
            <span
              className={`transform text-xl transition-transform duration-300 ${
                openCategories[category] ? 'rotate-180' : ''
              }`}
            >
              ▼
            </span>
          </button>
          {openCategories[category] && (
            <>
              {jobsInCategory[0]?.noOpenPositions ? (
                <p className="italic text-gray-500">
                  Trenutno nema otvorenih pozicija.
                </p>
              ) : (
                <div className="grid gap-8 md:grid-cols-2">
                  {jobsInCategory.map((job) => (
                    <div
                      key={job.id}
                      className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                    >
                      <div className="absolute inset-0 z-0 rounded-3xl border border-white/20 bg-white/30 opacity-0 shadow-inner backdrop-blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                      <h2 className="relative z-10 mb-2 text-2xl font-semibold tracking-tight text-gray-900 group-hover:text-black">
                        {job.title}
                      </h2>
                      <p className="relative z-10 mb-4 text-sm text-gray-500">
                        <span className="font-medium text-gray-700">
                          {job.department}
                        </span>{' '}
                        • {job.type}
                      </p>
                      <p className="relative z-10 mb-6 leading-relaxed text-gray-700">
                        {job.description}
                      </p>
                      <Link
                        href={`${job.applyLink || ''}`}
                        className="relative z-10 inline-block rounded-full bg-black/80 px-6 py-3 text-sm font-medium text-white shadow-md backdrop-blur-md transition hover:bg-black"
                      >
                        Prijavi se sada
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      ))}
    </main>
  );
}
