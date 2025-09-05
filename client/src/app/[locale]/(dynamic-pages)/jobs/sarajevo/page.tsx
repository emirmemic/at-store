'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Job {
  title: string;
  location: string;
  department: string;
  postedDate: string;
  overview: string;
  requirements: string[];
  responsibilities: string[];
  osobine: string;
}

const job: Job = {
  title: 'Prodavač (m/ž)',
  location: 'Sarajevo, Bosna i Hercegovina',
  department: 'Sale Support',
  postedDate: '08/2025',
  overview: 'Prodaja u poslovnicama i direktan rad sa kupcima.',
  requirements: [
    'Poznavanje Apple proizvoda.',
    'Spremnost učenja po standardima Apple kompanije.',
    'Obavljanje više zadataka istovremeno.',
    'Elokventnost, strpljenje, upornost i entuzijazam.',
    'Pripremljenost, empatija, kreativnost i odgovornost.',
    'Poznavanje engleskog jezika.',
    'Prednost imaju kandidati koji posjeduju Apple uređaje i imaju iskustva u prodaji.',
  ],
  responsibilities: [
    'Oversee finance operations from A to Z',
    'Lead financial planning, budgeting, and forecasting',
    'Maintain solvency and cashflow control',
    'Manage tax policy & accounting improvements',
    'Provide reports to executive management',
  ],
  osobine:
    'Spremnost učenja po standardima Apple kompanije, dinamičnost, otvorenost, orijentiranost na klijente, brzina, poslovna etika, timski rad, proaktivnost i pouzdanost, izražene komunikacijske vještine, vještine za rješavanje problema, sposobnost pružanja izvanrednog prodajnog iskustva.',
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

      const response = await fetch('https://formsubmit.co/posao@atstore.ba', {
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
        <h2 className="text-2xl font-medium text-gray-800">Opis posla</h2>
        <p className="leading-relaxed text-gray-700">{job.overview}</p>
      </section>

      {/* Split Grid Layout */}
      <div className="grid gap-12 md:grid-cols-1">
        {/* Requirements */}
        <section>
          <h3 className="text-xl font-medium text-gray-800">
            Kandidati moraju ispunjavati sljedeće uvjete
          </h3>
          <ul className="mt-4 list-inside list-disc space-y-2 text-gray-700">
            {job.requirements.map((req, idx) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>
        </section>
      </div>

      {/* Benefits Section */}
      <section className="mb-16 mt-12">
        <h3 className="text-xl font-medium text-gray-800">Osobine</h3>
        <ul className="mt-4 list-inside list-disc space-y-2 text-gray-700">
          {job.osobine}
        </ul>
      </section>

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
                Kontaktirat ćemo vas u najkraćem mogućem roku.
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
