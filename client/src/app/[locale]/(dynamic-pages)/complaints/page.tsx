import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { CardBlock, InfoBlock } from '@/components';
import { IconCondition, IconDamage, IconPurchased } from '@/components/icons';

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
    <main className="py-12 container-max-width md:py-16 lg:py-16">
      <header className="pb-12 text-center md:pb-16 lg:pb-16">
        <h1 className="pb-5 heading-1 md:pb-8 md:heading-2 lg:pb-12 lg:heading-1">
          {t('complaintsPage.title')}
        </h1>
        <h2 className="heading-4 md:bullet-heading-1 lg:heading-3">
          {t('complaintsPage.formTitle')}
        </h2>
      </header>
      <ComplaintsForm />
      <section className="md:py-16y py-12">
        <h2 className="pb-3 pt-12 text-center bullet-heading-1 md:pb-8 md:pt-16 md:heading-2 lg:pb-12 lg:heading-1">
          {t('complaintsPage.subTitle')}
        </h2>
        <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:flex-wrap md:items-stretch">
          {cards.map((card) => (
            <div key={card.id} className="flex w-full max-w-80 md:w-1/3">
              <CardBlock asChild iconClasses="h-20 w-24" {...card} />
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="pb-8 text-center bullet-heading-1 md:pb-12 md:heading-2 lg:heading-1">
          {t('complaintsPage.contactUs')}
        </h2>
        <InfoBlock
          description={t('complaintsPage.contactInfo')}
          title={t('complaintsPage.infoBlockTitle')}
        />
      </section>
    </main>
  );
}
