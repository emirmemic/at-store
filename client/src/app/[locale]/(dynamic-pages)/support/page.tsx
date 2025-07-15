import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import CalendlyEmbed from './components/calendly';

import multi from '@/assets/images/multi.png';
import { CardBlock } from '@/components/blocks';
import { IconBackup, IconLock, IconPhone } from '@/components/icons';
import { PAGE_NAMES } from '@/i18n/page-names';

interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData' });

  return {
    title: t('support.title'),
    description: t('support.description'),
    openGraph: {
      title: t('support.title'),
      description: t('support.description'),
    },
  };
}
export default function Page() {
  const t = useTranslations('');
  const cards = [
    {
      id: 1,
      title: t('supportPage.makeBackup'),
      Icon: IconBackup,
      link: 'https://support.apple.com/hr-hr/108306',
      target: '_blank',
    },
    {
      id: 2,
      title: t('supportPage.turnOffFindMyDevice'),
      Icon: IconLock,
      link: 'https://support.apple.com/hr-hr/guide/icloud/mmfc0eeddd/icloud',
      target: '_blank',
    },
    {
      id: 3,
      title: t('supportPage.appointmentActionLabel'),
      Icon: IconPhone,
      link: PAGE_NAMES.SUPPORT + '#zakazivanje-termina',
      target: '_self',
    },
  ];
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || '';
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-4 lg:py-6">
        <div className="mb-4 flex flex-col items-center gap-4 rounded-3xl px-6 py-6 text-center md:mb-12">
          <h1 className="text-gray-900 heading-2 md:heading-1">
            {t('supportPage.title')}
          </h1>
          <p className="text-red-deep heading-4">{t('supportPage.needHelp')}</p>
          <p className="max-w-3xl">{t('supportPage.appointmentInfoText')}</p>
          <div className="mx-auto mt-0 w-full max-w-3xl">
            <Image
              alt="Description of the image"
              className="w-full object-contain"
              height={600}
              src={multi}
            />
          </div>
        </div>
        <section className="mx-auto mb-12 mt-4 max-w-5xl">
          <div className="mx-auto mb-10 flex max-w-full flex-col rounded-2xl bg-white p-8 text-white shadow-lg transition-transform duration-300 hover:-translate-y-1">
            <h3 className="mb-4 text-center text-2xl font-semibold text-red-600">
              Spremni smo da ti pomognemo
            </h3>
            <p className="text-center text-black">
              Bilo putem telefona, chatom ili e-poštom, spremni smo da ti
              pomognemo sa svim pitanjima i problemima o Apple proizvodima.
              Nudimo ti podršku za postavku uređaja i sve do oporavka tvog Apple
              ID-ja.
              <br />
              <br />
              Imaš problem sa plaćanjem na App Storeu? Obrisao si fotke
              slučajno? Imaš problem i trebaš pomoć? Sve 5!
            </p>
          </div>
          <div className="mb-10 flex gap-10">
            <Link
              className="flex flex-1 flex-col rounded-2xl bg-gradient-to-b from-[#e55451] to-[#cd1c18] p-8 shadow-lg transition-transform duration-300 hover:-translate-y-1"
              href={cards[0].link}
              target={cards[0].target}
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#D73A31]">
                <IconBackup className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-2xl font-semibold text-white">
                Napravi backup
              </h3>
              <p className="flex-grow text-white">
                Putem računala ili iCloud računa napravi backup osobnih
                podataka.
              </p>
            </Link>
            <Link
              className="flex flex-1 flex-col rounded-2xl bg-gradient-to-b from-[#003366] to-[#0f52ba] p-8 shadow-lg transition-transform duration-300 hover:-translate-y-1"
              href={cards[1].link}
              target={cards[1].target}
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#1D4ED8]">
                <IconLock className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-2xl font-semibold text-white">
                Isključi Find My
              </h3>
              <p className="flex-grow text-white">
                Prije dolaska je potrebno isključiti Find My za iPhone.
              </p>
            </Link>
          </div>
          <Link
            className="mx-auto block flex h-[220px] max-w-full flex-col rounded-2xl bg-gradient-to-b from-[#3C3C3B] via-[#2F2F2E] to-[#272726] p-8 shadow-lg transition-transform duration-300 hover:-translate-y-1"
            href={cards[2].link}
            target={cards[2].target}
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white text-black">
              <IconPhone className="h-8 w-8" />
            </div>
            <h3 className="mb-4 text-2xl font-semibold text-white">
              Zakaži termin
            </h3>
            <p className="flex-grow text-white">
              Provjeri slobodan termin i AT Store lokaciju koju želiš posjetiti.
            </p>
          </Link>
        </section>
        <div className="relative mb-8 md:mb-24">
          <div
            className="absolute -top-nav-height"
            id="zakazivanje-termina"
          ></div>
          <CalendlyEmbed url={calendlyUrl} />
        </div>

        <div className="mx-auto max-w-6xl px-4 py-16">
          <h3 className="mb-14 text-center heading-2 md:heading-1">
            {t('supportPage.chatWithExpert')}
          </h3>

          <div className="mt-12 grid grid-cols-3 gap-6">
            {/* Prva kartica - crvenkasta */}
            <Link
              className="flex cursor-pointer flex-col rounded-xl bg-gray-800 p-6 shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
              href="mailto:atstore@atstore.ba"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="mb-4 flex items-center justify-center">
                <IconBackup className="h-12 w-12 text-white" />
              </div>
              <h3 className="mb-2 text-center text-xl font-semibold text-white">
                {t('supportPage.emailHelpTitle')}
              </h3>
              <p className="mb-4 text-center text-white">
                {t('supportPage.phoneNumber')}
              </p>
              <div className="text-center">
                <span className="cursor-pointer text-blue-600 hover:underline">
                  Kontaktirajte nas
                </span>
              </div>
            </Link>
            {/* Druga kartica - plava */}
            <Link
              className="flex cursor-pointer flex-col rounded-xl bg-blue-600 p-6 shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
              href="#faq-section"
            >
              <div className="mb-4 flex items-center justify-center">
                <IconLock className="h-12 w-12 text-white" />
              </div>
              <h3 className="mb-2 text-center text-xl font-semibold text-white">
                {t('supportPage.haveQuestion')}
              </h3>
              <p className="mb-4 text-center text-white">
                {t('supportPage.faqHelp')}
              </p>
              <div className="mt-auto text-center">
                <span className="cursor-pointer text-white hover:underline">
                  FAQ
                </span>
              </div>
            </Link>
            {/* Treća kartica - tamnosiva */}
            <Link
              className="flex cursor-pointer flex-col rounded-xl bg-gray-800 p-6 shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
              href="/find-store"
            >
              <div className="mb-4 flex items-center justify-center">
                <IconPhone className="h-12 w-12 text-white" />
              </div>
              <h3 className="mb-2 max-w-full break-words text-center text-xl font-semibold text-white">
                {t('supportPage.findStoreTitle')}
              </h3>
              <p className="mb-4 text-center text-white">
                {t('supportPage.findStoreText')}
              </p>
              <div className="text-center">
                <span className="cursor-pointer text-blue-600 hover:underline">
                  Pronađi poslovnicu
                </span>
              </div>
            </Link>
          </div>
        </div>

        <section className="mx-auto max-w-5xl px-4 py-8" id="faq-section">
          <h2 className="mb-8 text-center text-3xl font-bold">Česta pitanja</h2>
          <div className="space-y-6">
            <details className="rounded-lg bg-white p-6 shadow-md">
              <summary className="cursor-pointer text-xl font-semibold">
                Da li vršite popravku uređaja?
              </summary>
              <p className="mt-4 text-gray-700">
                Vršimo samo softversku popravku uređaja. Za hardversku popravku
                potrebno je da se obratite ovlaštenom servisnom centru ASBIS.
              </p>
            </details>
            <details className="rounded-lg bg-white p-6 shadow-md">
              <summary className="cursor-pointer text-xl font-semibold">
                Kako mogu putem vas popraviti uređaj?
              </summary>
              <p className="mt-4 text-gray-700">
                Ukoliko ste uređaj kupili u AT Storeu, mi smo servisni drop
                point i možete uređaj dostaviti u jednu od naših poslovnica,
                nakon čega ćemo ga proslijediti ovlaštenom servisnom centru.
              </p>
            </details>
            <details className="rounded-lg bg-white p-6 shadow-md">
              <summary className="cursor-pointer text-xl font-semibold">
                Koji su rokovi za popravku uređaja?
              </summary>
              <p className="mt-4 text-gray-700">
                Rokovi za popravku zavise od vrste kvara i dostupnosti dijelova.
                Obično softverske popravke obavljamo u roku od nekoliko sati,
                dok hardverske popravke zavise od servisa ASBIS.
              </p>
            </details>
          </div>
        </section>
      </div>
    </div>
  );
}
