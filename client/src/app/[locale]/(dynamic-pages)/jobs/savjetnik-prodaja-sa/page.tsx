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
  title: 'Savjetnik prodaje (m/ž)',
  location: 'Sarajevo, Bosna i Hercegovina',
  department: 'Retail Manager',
  postedDate: '08/2025',
  AtStore:
    'Želiš li biti dio brenda koji je sinonim za inovaciju i vrhunsku tehnologiju? U AT Storeu, ovlaštenom Apple partneru, tražimo voditelja poslovnice koji će svojim znanjem, iskustvom i energijom voditi tim prema novim uspjesima.',
  whyAtStore:
    'Postaješ dio tima koji živi Apple vrijednosti i radi u inspirativnom okruženju. Dobijaš priliku razvijati se uz globalno prepoznatljiv brend i stjecati iskustvo koje vrijedi u cijeloj industriji. Nudimo ti podršku i edukaciju, ali i prostor za samostalno donošenje odluka i realizaciju ideja.',
  requirements: [
    'Vodiš i motiviraš prodajni tim prema ciljevima i izvrsnoj korisničkoj podršci.',
    'Brineš da kupci dožive vrhunsko Apple iskustvo u našoj poslovnici.',
    'Sudjeluješ u postavljanju prodajnih ciljeva, planiranju i analizi rezultata.',
    'Organiziraš svakodnevni rad poslovnice i osiguravaš urednost izložbenog prostora.',
    'Uspostavljaš i održavaš odnose s kupcima, rješavaš zahtjeve i pritužbe na profesionalan način.',
    'Aktivno pratiš konkurenciju i tržište te predlažeš nove ideje za rast i razvoj.',
    'Tijesno surađuješ s marketingom, računovodstvom i logistikom kako bi prodajne kampanje bile uspješne.',
  ],
  responsibilities: [
    'Iskustvo u vođenju tima ili prodaje.',
    'Izvrsne komunikacijske i organizacijske vještine.',
    'Strast prema Apple proizvodima i tehnologiji.',
    'Fokus na ciljeve, analitičnost i proaktivan pristup.',
    'Pozitivan stav, timski duh i želju za stalnim učenjem.',
    'Prednost: dobro poznavanje engleskog jezika.',
  ],
  nudimo: [
    'Stimulativan bonus vezan uz ostvarene rezultate.',
    'Kontinuiranu edukaciju o Apple proizvodima i procesima prodaje.',
    'Rad u dinamičnom, profesionalnom i podržavajućem okruženju.',
    'Mogućnost napredovanja unutar kompanije.',
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
