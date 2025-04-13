import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { supportLaptop } from '@/assets/images';
import { CardBlock } from '@/components/blocks';
import { IconBackup, IconLock, IconPhone } from '@/components/icons';

import CalendlyEmbed from './components/calendly';

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
    { id: 1, title: t('supportPage.makeBackup'), Icon: IconBackup },
    { id: 2, title: t('supportPage.turnOffFindMyDevice'), Icon: IconLock },
    { id: 3, title: t('supportPage.appointmentActionLabel'), Icon: IconPhone },
  ];
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || '';
  return (
    <div className="py-16 container-max-width lg:py-24">
      <div className="mb-8 flex flex-col items-center justify-center gap-10 md:mb-24 md:flex-row-reverse md:gap-24">
        <div className="max-w-80 lg:max-w-[436px]">
          <Image
            alt="Description of the image"
            className="h-full w-full object-contain"
            height={300}
            src={supportLaptop}
            width={500}
          />
        </div>
        <div className="flex flex-col items-center justify-center md:items-start">
          <h1 className="mb-8 heading-2 md:heading-1">
            {t('supportPage.title')}
          </h1>
          <p className="mb-4 text-red-deep heading-4">
            {t('supportPage.needHelp')}
          </p>
          <p>{t('supportPage.appointmentInfoText')}</p>
        </div>
      </div>
      <div className="mb-8 md:mb-24">
        <CalendlyEmbed url={calendlyUrl} />
      </div>
      <div className="mb-8 flex flex-col gap-14 md:mb-32 md:gap-20 lg:gap-24">
        <h2 className="text-center heading-2 md:heading-1">
          {t('supportPage.requestHelp')}
        </h2>
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:flex-wrap md:items-stretch md:gap-8">
          {cards.map(({ id, title, Icon }) => (
            <CardBlock
              key={id}
              asChild
              Icon={Icon}
              bgColor="bg-blue"
              className="w-full max-w-80 md:w-1/3"
              iconClasses="w-20 h-20"
              title={title}
            >
              <div />
            </CardBlock>
          ))}
        </div>
      </div>
      <div className="mx-auto flex max-w-[1024px] flex-col gap-14 md:gap-20 lg:gap-24">
        <h3 className="text-center heading-2 md:heading-1">
          {t('supportPage.chatWithExpert')}
        </h3>
        <div className="flex flex-col items-center rounded-2xl bg-blue-steel px-16 py-8 text-white shadow-popup-black">
          <p className="mb-3 text-center heading-4 lg:heading-3">
            {t('supportPage.callForHelp')}
          </p>
          <Link
            className="mb-7 transition-colors heading-4 hover:text-grey-medium md:heading-3"
            href={t('contact.telephoneLink')}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="sr-only">{t('supportPage.callForHelp')}</span>
            {t('contact.telephoneNumber')}
          </Link>
          <p className="text-center paragraph-2">
            {t('supportPage.phoneSupportHours')}
          </p>
        </div>
      </div>
    </div>
  );
}
