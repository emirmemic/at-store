import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { CardBlock } from '@/components';
import IconInterest from '@/components/icons/interest';
import IconRepayments from '@/components/icons/repayments';
import IconRequest from '@/components/icons/request';
import { Button } from '@/components/ui/button';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Link } from '@/i18n/routing';

import MikrofinForm from './components/form';

interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData' });

  return {
    title: t('mikrofinInvoice.title'),
    description: t('mikrofinInvoice.description'),
    openGraph: {
      title: t('mikrofinInvoice.title'),
      description: t('mikrofinInvoice.description'),
    },
  };
}
export default function Page() {
  const t = useTranslations();
  const cards = [
    {
      id: 1,
      title: t('mikrofinInvoicePage.IconRepayments'),
      Icon: IconRepayments,
    },
    {
      id: 2,
      title: t('mikrofinInvoicePage.IconRequest'),
      Icon: IconRequest,
    },
    {
      id: 3,
      title: t('mikrofinInvoicePage.IconInterest'),
      Icon: IconInterest,
    },
  ];
  return (
    <main className="py-12 container-max-width md:py-16">
      <h1 className="pb-5 text-center bullet-heading-1 md:pb-12 md:heading-2 lg:heading-1">
        {t('mikrofinInvoicePage.title')}
      </h1>
      <h2 className="pb-12 text-center heading-4 md:pb-20 md:bullet-heading-1 lg:heading-3">
        {t('mikrofinInvoicePage.formTitle')}
      </h2>
      <MikrofinForm />
      <section className="py-12 md:py-16">
        <h2 className="pb-12 text-center bullet-heading-1 md:heading-2 lg:heading-1">
          {t('mikrofinInvoicePage.whyMikrofin')}
        </h2>
        <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:flex-wrap md:items-stretch md:justify-evenly md:gap-y-16">
          {cards.map((card) => (
            <div key={card.id} className="flex w-full max-w-80 md:w-1/3">
              <CardBlock
                asChild
                className="w-full shadow-popup-black"
                iconClasses="h-20 w-24"
                {...card}
              />
            </div>
          ))}
        </div>
      </section>
      <h2 className="pb-12 text-center bullet-heading-1 md:heading-2 lg:heading-1">
        {t('mikrofinInvoicePage.paymentMethods')}
      </h2>
      <div className="flex flex-col justify-between gap-y-5 rounded-2xl bg-blue-steel px-9 py-12 shadow-popup-black md:flex-row md:items-center md:px-12 md:py-6">
        <div>
          <h3 className="bullets-heading-1 pb-3 text-center text-white md:text-start md:heading-3">
            {t('mikrofinInvoicePage.paymentMethods')}
          </h3>
          <p className="text-center text-white bullet-1 md:text-start md:paragraph-1">
            {t('mikrofinInvoicePage.browseMore')}
          </p>
        </div>
        <div className="self-center">
          <Button asChild size={'lg'} typography={'button1'} variant={'filled'}>
            <Link href={PAGE_NAMES.PAYMENT_METHODS}>{t('common.view')}</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
