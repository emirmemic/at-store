'use client';

import Image from 'next/image';

import JobApplicationForm from '../components/job-application-form';

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
  title: 'B2B Specijalist (m/ž)',
  location: 'Sarajevo, Bosna i Hercegovina',
  department: 'B2B',
  postedDate: '08/2025',
  AtStore:
    'Želiš li graditi poslovne odnose, razvijati mrežu klijenata i nuditi rješenja temeljena na Apple tehnologiji? U AT Storeu tražimo B2B specijalistu koji će biti ključna poveznica između naših poslovnih partnera i najboljih Apple rješenja.',
  whyAtStore:
    'Postaješ dio profesionalnog tima koji kombinira iskustvo u prodaji i ljubav prema inovacijama. Dobijaš priliku raditi s globalno prepoznatljivim brendom i razvijati svoje vještine u svijetu tehnologije. Radit ćeš u podržavajućem okruženju koje cijeni inicijativu, timski rad i profesionalni rast.',
  requirements: [
    'Aktivno gradiš i održavaš odnose s poslovnim klijentima.',
    'Istražuješ tržište i razvijaš nove poslovne prilike.',
    'Pregovaraš i dogovaraš uvjete s klijentima unutar odobrenih okvira.',
    'Pratiš isporuke, ugovore i potrebe klijenata kako bi usluga bila na najvišem nivou.',
    'Redovito izvještavaš o postignutim rezultatima i predlažeš mjere za rast.',
    'U suradnji s drugim odjelima osiguravaš uspješnu provedbu prodajnih kampanja i uvođenje novih proizvoda.',
    'Pripremaš izvještaje o konkurenciji i daješ preporuke za jačanje tržišne pozicije.',
  ],
  responsibilities: [
    'Izvrsne komunikacijske i prezentacijske vještine.',
    'Organiziranost i fokus na ciljeve.',
    'Strast prema tehnologiji i dobro poznavanje Apple proizvoda.',
    'Analitičnost, prilagodljivost i proaktivan pristup.',
    'Timski duh i pozitivan stav.',
    'Prednost: iskustvo u B2B segmentu i dobro znanje engleskog jezika.',
  ],
  nudimo: [
    'Stimulativan bonus vezan uz ostvarenu prodaju.',
    'Kontinuiranu edukaciju o Apple tehnologiji i B2B procesima.',
    'Rad u dinamičnom i podržavajućem okruženju.',
    'Mogućnost napredovanja i profesionalnog razvoja.',
  ],
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
      <JobApplicationForm
        jobTitle={job.title}
        jobDepartment={job.department}
        jobLocation={job.location}
      />
    </main>
  );
}
