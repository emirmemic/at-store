'use client';

import Image from 'next/image';

import JobApplicationForm from '../components/job-application-form';

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
      <JobApplicationForm
        jobTitle={job.title}
        jobDepartment={job.department}
        jobLocation={job.location}
      />
    </main>
  );
}
