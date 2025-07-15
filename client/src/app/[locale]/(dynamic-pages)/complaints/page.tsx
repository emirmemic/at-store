//TODO ADD CONSTANTS FOR ALL PAGES THAT USE CONSTANTS
//TODO ADD sr-only for  form inputs
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { CardBlock, InfoBlock } from '@/components';
import { IconCondition, IconDamage, IconPurchased } from '@/components/icons';
import { CONTACT_EMAILS, CONTACT_NUMBERS } from '@/lib/constants';

import ComplaintsForm from './components/form';

interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData' });

  return {
    title: t('complaints.title'),
    description: t('complaints.description'),
    openGraph: {
      title: t('complaints.title'),
      description: t('complaints.description'),
    },
  };
}
function Description() {
  const t = useTranslations('complaintsPage');
  return (
    <div className="text-gray-700 bullet-1 md:paragraph-2">
      <p>
        {t('contactsInfo.text1')}
        <span className="transition-colors hover:text-grey-medium">
          <Link
            href={`tel:${CONTACT_NUMBERS.complaintsNumber}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="sr-only">{t('srCallForHelp')}</span>
            {CONTACT_NUMBERS.complaintsNumber}{' '}
          </Link>
        </span>
        {t('contactsInfo.text2')}
      </p>
      <span className="transition-colors hover:text-grey-medium">
        <Link
          href={`mailto:${CONTACT_EMAILS.complaintsEmail}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="sr-only">{t('srComplaintMail')}</span>
          {CONTACT_EMAILS.complaintsEmail}
        </Link>
      </span>
    </div>
  );
}
export default function Page() {
  const t = useTranslations();
  const cards = [
    {
      id: 1,
      title: t('complaintsPage.IconDamageDescription'),
      Icon: IconDamage,
    },
    {
      id: 2,
      title: t('complaintsPage.IconConditionDescription'),
      Icon: IconCondition,
    },
    {
      id: 3,
      title: t('complaintsPage.IconPurchaseDescription'),
      Icon: IconPurchased,
    },
  ];
  return (
    <main className="pb-16 pt-12 container-max-width">
      <header className="mb-16 text-center">
        <h1 className="pb-5 heading-1 md:pb-8 md:heading-2 lg:pb-12 lg:heading-1">
          {t('complaintsPage.title')}
        </h1>
        <h2 className="heading-4 md:bullet-heading-1 lg:heading-3">
          {t('complaintsPage.formTitle')}
        </h2>
      </header>

      <section className="mb-16">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">
          {t('complaintsPage.subTitle')}
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-[#f0f4ff] p-4 text-center text-[#1d4ed8] shadow-md transition-shadow hover:shadow-lg">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#c7d2fe]">
              <IconDamage className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">
              {t('complaintsPage.IconDamageDescription')}
            </h3>
          </div>
          <div className="rounded-2xl bg-[#f0fdf4] p-4 text-center text-[#047857] shadow-md transition-shadow hover:shadow-lg">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#6ee7b7]">
              <IconCondition className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">
              {t('complaintsPage.IconConditionDescription')}
            </h3>
          </div>
          <div className="rounded-2xl bg-[#fefce8] p-4 text-center text-[#92400e] shadow-md transition-shadow hover:shadow-lg">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#fde68a]">
              <IconPurchased className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">
              {t('complaintsPage.IconPurchaseDescription')}
            </h3>
          </div>
        </div>
      </section>
      <div className="mb-16 rounded-3xl bg-white p-8 shadow-lg">
        <h3 className="mb-4 text-2xl font-bold text-gray-800">
          Uslovi povrata i reklamacije
        </h3>
        <p className="mb-4 text-gray-700">
          Reklamacije proizvoda se priznaju uz predočeni fiskalni račun i
          ispravno popunjeni garancijski list kao dokazu kupovine. U slučaju
          reklamacije proizvoda informacije o načinu prijave kvara ili slanju
          ovlaštenom servisu informacije potražite na garantnom listu
          isporučenom uz proizvod.
        </p>
        <p className="mb-2 font-semibold text-gray-700">
          Zamjena uređaja za nove se vrši isključivo unutar garantnog roka, u
          slučaju kada su ispunjeni slijedeći uvjeti:
        </p>
        <ul className="list-inside list-disc space-y-2 text-gray-700">
          <li>uređaj je reklamiran unutar 7 dana od datuma na računu</li>
          <li>
            uređaj je predan u Apple ovlašteni servis te je servis odobrio
            zamjenu
          </li>
          <li>
            ispunjeni su zakonski uslovi prema Zakonu o obveznim odnosima i
            Zakonu o zaštiti potrošača
          </li>
        </ul>
      </div>
      <div className="mt-16 flex justify-center px-4">
        <div className="w-full max-w-3xl">
          <ComplaintsForm />
        </div>
      </div>
      <section className="rounded-3xl bg-white p-8 shadow-lg">
        <h3 className="mb-4 text-2xl font-bold text-gray-800">
          {t('complaintsPage.infoBlockTitle')}
        </h3>
        <div className="text-gray-700">
          <Description />
        </div>
        <div className="mt-6">
          <Link
            className="inline-block rounded-full bg-blue-steel px-6 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700"
            href={`mailto:${CONTACT_EMAILS.complaintsEmail}`}
          >
            Pošaljite upit
          </Link>
        </div>
      </section>
    </main>
  );
}
