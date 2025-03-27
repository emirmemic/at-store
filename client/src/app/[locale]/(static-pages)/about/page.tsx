import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import {
  atBusiness,
  atSoft,
  atStoreAlta,
  atStoreDelta,
  atStoreScc,
} from '@/assets/images';
import { MonoAppleBlock } from '@/components';
import { PAGE_NAMES } from '@/i18n/page-names';

import { CardSection, ImgSection, TeamCard } from '../components';

interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData' });

  return {
    title: t('about.title'),
    description: t('about.description'),
    openGraph: {
      title: t('about.title'),
      description: t('about.description'),
    },
  };
}

export default function AboutPage() {
  const t = useTranslations();
  const info = [
    {
      title: t('about.content1.title'),
      content: [
        { text: t('about.content1.item1') },
        {
          text: t('contact.atStoreAltaTelephone'),
          path: t('contact.atStoreAltaTelephoneLink'),
        },
        { text: t('about.content1.item2') },
        {
          text: t('contact.atStoreEmail'),
          path: t('contact.atStoreEmailLink'),
        },
      ],
      name: 'At Store Alta',
      image: atStoreAlta,
      id: 1,
    },
    {
      title: t('about.content2.title'),
      content: [
        { text: t('about.content2.item1') },
        {
          text: t('contact.atStoreSccTelephone'),
          path: t('contact.atStoreSccTelephoneLink'),
        },
        { text: t('about.content2.item2') },
        {
          text: t('contact.atStoreEmail'),
          path: t('contact.atStoreEmailLink'),
        },
      ],
      name: 'At Store SCC',
      image: atStoreScc,
      id: 2,
    },
    {
      title: t('about.content3.title'),
      content: [
        { text: t('about.content3.item1') },
        {
          text: t('contact.atStoreDeltaTelephone'),
          path: t('contact.atStoreDeltaTelephoneLink'),
        },
        { text: t('about.content3.item2') },
        {
          text: t('contact.atStoreDeltaEmail'),
          path: t('contact.atStoreDeltaEmailLink'),
        },
      ],
      name: 'At Store Delta',
      image: atStoreDelta,
      id: 3,
    },
  ];
  const cardBlocks = [
    {
      title: t('about.cardBlock.title1'),
      name: 'AtSoft',
      image: atSoft,
      path: PAGE_NAMES.HOME,
      id: 1,
    },
    {
      title: t('about.cardBlock.title2'),
      name: 'AtBusiness',
      image: atBusiness,
      path: PAGE_NAMES.HOME,
      id: 2,
    },
  ];
  const teamsCard = [
    { id: 1, name: { firstName: 'Admir', surname: 'Tursum' }, role: 'Ceo' },
    {
      id: 2,
      name: { firstName: 'Emina', surname: 'Bećirbašić' },
      role: 'Deputy direction',
    },
    {
      id: 3,
      name: { firstName: 'Bojana', surname: 'Nuci' },
      role: 'Store Manager Alta',
    },
    {
      id: 4,
      name: { firstName: 'Gorana', surname: 'Miljanović' },
      role: 'Store Manager Delta',
    },
    {
      id: 5,
      name: { firstName: 'Selma', surname: 'Dorić' },
      role: 'Store Manager SCC',
    },
    {
      id: 6,
      name: { firstName: 'Emir', surname: 'Tukić' },
      role: 'Marketing manager',
    },
    {
      id: 7,
      name: { firstName: 'Haris', surname: 'Džiko' },
      role: 'B2B manager',
    },
    {
      id: 8,
      name: { firstName: 'Armin', surname: 'Kosovac' },
      role: 'account manager',
    },
  ];

  return (
    <main className="flex flex-col gap-12 py-12 container-max-width md:gap-16 md:py-16">
      <header>
        <h1 className="pb-16 text-center display">{t('about.title')}</h1>
      </header>
      <section className="flex flex-col items-center justify-center gap-12 rounded-2xl bg-blue-steel px-3 py-12 md:gap-16 md:px-16 lg:flex-row lg:gap-12 lg:px-11 lg:py-11">
        <div className="order-1 flex-1 text-pretty text-center lg:order-none lg:text-start">
          <h2 className="text-white bullet-heading-2 md:heading-4">
            {t('about.paragraphHeading')}
          </h2>
          <p className="text-white bullet-1 md:paragraph-1">
            {t('about.paragraph')}
          </p>
        </div>
        <Image
          priority
          alt="logo"
          height={80}
          sizes="(max-width: 768px) 50vw, 354px"
          src={'/assets/images/logo.png'}
          width={354}
        />
      </section>
      <section className="flex flex-col gap-12 rounded-2xl bg-blue-steel px-3 py-12 md:gap-20 md:px-8 md:py-14 lg:px-11 lg:py-11">
        {info.map((imageSection, index) => (
          <ImgSection key={imageSection.id} {...imageSection} index={index} />
        ))}
      </section>

      <section className="flex flex-col gap-12 py-12 md:gap-16 md:py-16 lg:gap-16">
        <h3 className="text-center heading-1">{t('about.cardBlockTitle')}</h3>
        <div className="flex flex-col gap-12 md:flex-row md:gap-12 lg:gap-[70px]">
          {cardBlocks.map((cardSection) => (
            <CardSection key={cardSection.id} {...cardSection}></CardSection>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-16">
        <h4 className="text-center heading-2 md:heading-1">
          {t('about.teamCardTitle')}
        </h4>
        <div className="grid grid-cols-2 justify-items-center gap-x-6 gap-y-12 md:grid-cols-3 md:gap-y-16 lg:grid-cols-4 lg:gap-x-12 lg:gap-y-16">
          {teamsCard.map((teamSection) => (
            <TeamCard key={teamSection.id} {...teamSection}></TeamCard>
          ))}
        </div>
      </section>
      <MonoAppleBlock />
    </main>
  );
}
