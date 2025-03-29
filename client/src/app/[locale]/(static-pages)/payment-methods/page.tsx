import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import FaqSection from '@/app/[locale]/(static-pages)/components/faq-section';
import Section from '@/app/[locale]/(static-pages)/components/section';
import { InfoBlock } from '@/components';

import { getFaqSection, getInfoBlock, getSections } from './data';

interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData' });
  return {
    title: t('paymentMethods.title'),
    description: t('paymentMethods.description'),
    openGraph: {
      title: t('paymentMethods.title'),
      description: t('paymentMethods.description'),
    },
  };
}

export default function PaymentMethods() {
  const t = useTranslations();
  const sections = getSections(t);

  const faqSection = getFaqSection(t);
  const infoBlock = getInfoBlock(t);

  return (
    <div className="w-full py-12 pt-12 container-max-width md:py-[60px]">
      <h1 className="mb-9 text-center heading-2 md:mb-16 md:heading-1">
        {t('paymentMethodsPage.title')}
      </h1>
      <div className="flex flex-col gap-5">
        {sections.map((section) => (
          <Section key={section.sectionNumber} {...section} />
        ))}
      </div>
      <div className="w-full justify-self-center py-12 md:max-w-2xl md:justify-self-start md:px-3 md:py-[60px]">
        <p className="mb-6 heading-4 md:mb-9 md:heading-2">
          {t('paymentMethodsPage.faqTitle')}
        </p>
        {faqSection.map((faqSection) => (
          <FaqSection key={faqSection.question} {...faqSection} />
        ))}
      </div>

      <div className="flex flex-col items-center justify-center gap-8">
        {infoBlock.map((infoBlock) => (
          <InfoBlock
            key={infoBlock.id}
            className="w-full md:max-w-[688px] lg:max-w-[1058px]"
            description={infoBlock.description}
            path={infoBlock.path}
            title={infoBlock.title}
          />
        ))}
      </div>
    </div>
  );
}
