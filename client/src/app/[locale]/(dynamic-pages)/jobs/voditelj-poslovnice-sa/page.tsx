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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as any;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Send everything via Formsubmit
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append(
        '_subject',
        `Nova prijava za posao: ${job.title} - ${formData.fullName}`
      );
      formDataToSend.append(
        'message',
        `
🔔 NOVA PRIJAVA ZA POSAO
========================

📋 OSNOVNE INFORMACIJE:
- Pozicija: ${job.title}
- Ime i prezime: ${formData.fullName}
- Email: ${formData.email}
- Telefon: ${formData.phone}
- Lokacija: ${job.location}

💬 PORUKA OD KANDIDATA:
${formData.message || 'Nije ostavljena poruka.'}

📄 CV: ${formData.cv ? 'Priložen u fajlu' : 'Nije priložen'}

========================
Automatski generisano iz AT Store web stranice
      `
      );

      // Formsubmit configuration
      formDataToSend.append('_next', window.location.href);
      formDataToSend.append('_captcha', 'false');
      formDataToSend.append('_template', 'table');

      // Auto-response to applicant
      formDataToSend.append(
        '_autoresponse',
        `Poštovani/a ${formData.fullName},

Hvala vam na prijavi za poziciju ${job.title} u AT Store.

Vaša prijava je uspješno zaprimljena i naš tim će je pregledati u najkraćem mogućem roku. Ukoliko vaš profil odgovara našim trenutnim potrebama, kontaktiraćemo vas putem emaila ili telefona.

Srdačan pozdrav,
AT Store Tim

---
Ova poruka je automatski generisana.`
      );

      // Add CV file if exists
      if (formData.cv) {
        formDataToSend.append('attachment', formData.cv);
      }

      // Send to Formsubmit with timeout

      await fetch('https://formsubmit.co/posao@atstore.ba', {
        method: 'POST',
        body: formDataToSend,
      });

      // Clear form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        cv: null,
        message: '',
      });

      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }

      setSubmitStatus('success');
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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
          <h3 className="text-xl font-medium text-gray-800">Šta nudimo</h3>
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

        {/* Status Messages */}
        {submitStatus === 'success' ||
          (submitStatus === 'error' && (
            <div className="mb-6 rounded-md bg-green-50 p-4 text-green-800">
              <p className="font-medium">✅ Prijava je uspješno poslana!</p>
              <p className="text-sm">
                Kontaktiraćemo vas u najkraćem mogućem roku. Također ste dobili
                potvrdu na vaš email.
              </p>
            </div>
          ))}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ime i Prezime *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-black focus:ring-black disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-black focus:ring-black disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Broj telefona
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={isSubmitting}
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-black focus:ring-black disabled:opacity-50"
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
              disabled={isSubmitting}
              accept=".pdf,.doc,.docx"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-black file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-gray-800 disabled:opacity-50"
            />
            <p className="mt-1 text-xs text-gray-500">
              Podržani formati: PDF, DOC, DOCX (max 10MB)
            </p>
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
              disabled={isSubmitting}
              placeholder="Napišite zašto ste zainteresovani za ovu poziciju..."
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-black focus:ring-black disabled:opacity-50"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-black px-8 py-3 font-medium text-white shadow-md hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Šalje se...' : 'Pošalji prijavu'}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
