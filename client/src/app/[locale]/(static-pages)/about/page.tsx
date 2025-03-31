import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { MonoAppleBlock } from '@/components';
import { IconAtStoreLogo } from '@/components/icons';

import { CardSection, ImgSection, TeamCard } from '../components';

import { getCardBlocks, getInfo, getTeamCard } from './data';

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
  const info = getInfo(t);
  const cardBlocks = getCardBlocks(t);
  const teamsCard = getTeamCard();
  const styles = {
    mainContainer:
      'flex flex-col gap-12 py-12 container-max-width md:gap-16 md:py-16',
    sectionBase: 'shadow-popup-black rounded-2xl bg-blue-steel ',
  };
  return (
    <main className={styles.mainContainer}>
      <header>
        <h1 className="pb-16 text-center heading-2 md:heading-1">
          {t('about.title')}
        </h1>
      </header>
      <section
        className={`${styles.sectionBase} flex flex-col items-center justify-center gap-12 px-3 py-12 md:gap-16 md:px-16 lg:flex-row lg:gap-12 lg:px-11 lg:py-11`}
      >
        <div className="order-1 flex-1 text-pretty text-center text-white lg:order-none lg:text-start">
          <h2 className="bullet-heading-2 md:heading-4">
            {t('about.paragraphHeading')}
          </h2>
          <p className="bullet-1 md:paragraph-1">{t('about.paragraph')}</p>
        </div>
        <IconAtStoreLogo className="h-16 max-w-72 text-white md:h-20 md:max-w-[354px]"></IconAtStoreLogo>
      </section>
      <section
        className={`${styles.sectionBase} flex flex-col gap-12 px-3 py-12 md:gap-20 md:px-8 md:py-14 lg:px-11 lg:py-11`}
      >
        {info.map((imageSection, index) => (
          <ImgSection key={imageSection.id} {...imageSection} index={index} />
        ))}
      </section>
      <section className="flex flex-col gap-12 py-12 md:gap-16 md:py-16 lg:gap-16">
        <h3 className="text-center heading-2 md:heading-1">
          {t('about.cardBlockTitle')}
        </h3>
        <div className="flex flex-col items-center gap-12 md:flex-row md:gap-12 lg:gap-[70px]">
          {cardBlocks.map((cardSection) => (
            <CardSection key={cardSection.id} {...cardSection}></CardSection>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-16">
        <h3 className="text-center heading-2 md:heading-1">
          {t('about.teamCardTitle')}
        </h3>
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
