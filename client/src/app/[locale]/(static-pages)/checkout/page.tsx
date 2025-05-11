import { useTranslations } from 'next-intl';

import PageTitle from '../components/page-title';

export default function CheckoutPage() {
  const t = useTranslations('checkoutPage');

  return (
    <main className="flex flex-col py-12 container-max-width">
      <PageTitle title={t('title')} />
    </main>
  );
}
