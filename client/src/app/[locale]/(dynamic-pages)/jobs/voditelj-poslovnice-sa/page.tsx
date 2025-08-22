'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Job {
  title: string;
  location: string;
  department: string;
  postedDate: string;
  AtStore: string;
  whyAtStore: string;
  requirements: string[];
  responsibilities: string[];
  nudimo: string[];
}

const job: Job = {
  title: 'Voditelj poslovnice (m/ž)',
  location: 'Sarajevo, Bosna i Hercegovina',
  department: 'Store Manager',
  postedDate: '08/2025',
  AtStore:
    'Voliš tehnologiju, razgovor s ljudima i uživaš u pomaganju drugima da pronađu pravi proizvod za sebe? U AT Storeu tražimo savjetnika u prodaji koji će biti prva točka susreta naših kupaca s Apple iskustvom.',
  whyAtStore:
    'Postaješ dio tima koji živi Apple vrijednosti i radi u inspirativnom okruženju. Dobijaš priliku razvijati se uz globalno prepoznatljiv brend i stjecati iskustvo koje vrijedi u cijeloj industriji. Nudimo ti podršku i edukaciju, ali i prostor za samostalno donošenje odluka i realizaciju ideja.',
  requirements: [
    'Aktivno sudjeluješ u prodajnom prostoru i brineš da svaki kupac dobije najbolje iskustvo.',
    'Upoznaješ kupce s Apple proizvodima i dodatnom opremom te pomažeš pri izboru.',
    'Održavaš urednost i atraktivnost poslovnice.',
    'Pratiš novitete, promocije i osiguravaš da proizvodi budu pravilno izloženi.',
    'Sudjeluješ u zaprimanju, obradi i nadopuni zaliha.',
    'Aktivno komuniciraš s kupcima, rješavaš pritužbe i prikupljaš povratne informacije.',
    'Poštuješ interne procedure i standarde Apple partnera.',
  ],
  responsibilities: [
    'Izvrsne komunikacijske i prezentacijske vještine.',
    'Organiziranost, proaktivnost i pozitivan pristup.',
    'Ljubav prema Apple proizvodima i tehnologiji općenito.',
    'Timski duh i želju za stalnim učenjem.',
    'Prednost: iskustvo u prodaji ili radu s kupcima te dobro znanje engleskog jezika.',
  ],
  nudimo: [
    'Stimulativan mjesečni bonus vezan uz osobnu prodaju.',
    'Kontinuiranu edukaciju o Apple tehnologiji i prodajnim procesima.',
    'Rad u profesionalnom, mladom i prijateljskom timu.',
    'Mogućnost napredovanja i razvoja karijere.',
  ],
};

export default function Page() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    cv: null as File | null,
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as any;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      {/* Title Section */}
      <header className="mb-12">
        <Image
          src="/assets/images/jobs.png"
          alt="Join our team"
          width={2048}
          height={280}
          className="mx-auto mb-8 h-64 w-full max-w-4xl rounded-3xl object-cover shadow-lg"
          priority
        />
        <h1 className="text-4xl font-semibold text-gray-900">{job.title}</h1>
        <p className="mt-2 text-sm text-gray-500">
          {job.department} — {job.location} • Objavljeno {job.postedDate}
        </p>
      </header>

      {/* Overview Section */}
      <section className="mb-10 space-y-4">
        <h2 className="text-2xl font-medium text-gray-800">
          AT Store - Mono Apple Authorized Reseller
        </h2>
        <p className="leading-relaxed text-gray-700">{job.AtStore}</p>
      </section>

      {/* Overview Section */}
      <section className="mb-10 space-y-4">
        <h2 className="text-2xl font-medium text-gray-800">Zašto AT Store?</h2>
        <p className="leading-relaxed text-gray-700">{job.whyAtStore}</p>
      </section>

      {/* Split Grid Layout */}
      <div className="grid gap-12 md:grid-cols-1">
        {/* Requirements */}
        <section>
          <h3 className="text-xl font-medium text-gray-800">
            Tvoje odgovornosti
          </h3>
          <ul className="mt-4 list-inside list-disc space-y-2 text-gray-700">
            {job.requirements.map((req, idx) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>
        </section>
      </div>

      {/* Split Grid Layout */}
      <div className="mt-10 grid gap-12 md:grid-cols-1">
        {/* Requirements */}
        <section>
          <h3 className="text-xl font-medium text-gray-800">
            Šta očekujemo od tebe
          </h3>
          <ul className="mt-4 list-inside list-disc space-y-2 text-gray-700">
            {job.responsibilities.map((req, idx) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>
        </section>
      </div>

      {/* Split Grid Layout */}
      <div className="mb-10 mt-10 grid gap-12 md:grid-cols-1">
        {/* Requirements */}
        <section>
          <h3 className="text-xl font-medium text-gray-800">
            Šta očekujemo od tebe
          </h3>
          <ul className="mt-4 list-inside list-disc space-y-2 text-gray-700">
            {job.nudimo.map((req, idx) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>
        </section>
      </div>

      {/* Application Form */}
      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-medium text-gray-800">
          Prijavi se sada
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ime i Prezime
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-black focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-black focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Broj telefona{' '}
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-black focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dodaj CV
            </label>
            <input
              type="file"
              name="cv"
              onChange={handleChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-black file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Poruka
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-black focus:ring-black"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="rounded-full bg-black px-8 py-3 font-medium text-white shadow-md hover:bg-gray-800"
            >
              Pošalji prijavu
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
