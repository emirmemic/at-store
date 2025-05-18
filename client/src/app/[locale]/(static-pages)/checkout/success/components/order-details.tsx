import { useTranslations } from 'next-intl';

export default function OrderDetails({ orderNumber }: { orderNumber: string }) {
  const t = useTranslations('checkoutPage.paymentPage');

  const styles = 'flex flex-col gap-1';

  return (
    <div className="flex justify-center gap-x-8 gap-y-4">
      <div className={styles}>
        <h3>{t('orderDate')}</h3>
        <p className="heading-5">{new Date().toLocaleDateString('de-DE')}</p>
      </div>
      <div className={styles}>
        <h3>{t('orderNumber')}</h3>
        <p className="heading-5">{orderNumber}</p>
      </div>
      <div className={styles}>
        <h3>{t('orderStatus')}</h3>
        <p className="text-green heading-5">{t('success')}</p>
      </div>
    </div>
  );
}
