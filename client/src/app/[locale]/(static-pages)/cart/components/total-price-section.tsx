'use client';
import { useTranslations } from 'next-intl';

import { useCartProvider } from '@/app/providers';
import { useUserProvider } from '@/app/providers/user-provider';
import { Button } from '@/components/ui/button';
import { CURRENCY } from '@/lib/constants';

export default function TotalPriceSection() {
  const t = useTranslations();
  const { cart } = useCartProvider();
  const { user } = useUserProvider();
  const isOrganization = user?.accountDetails.role?.type === 'organization';

  const totalPrice = cart.reduce(
    (total, { product: { discountedPrice, originalPrice }, quantity }) =>
      total + (discountedPrice || originalPrice) * quantity,
    0
  );
  const topBorder = 'border-t border-grey-silver';

  // For organization users, show invoice button
  function onInvoice() {
    // TODO: Implement invoice logic
  }

  function onContinue() {
    // TODO: Implement continue logic
  }

  return (
    <div
      className={`mt-3 flex flex-col items-center justify-center gap-3 pt-2 heading-5 ${topBorder}`}
    >
      {isOrganization && (
        <p className="p-4 text-center">{t('cartPage.invoiceDescription')}</p>
      )}
      <p>{t('cartPage.totalPrice')}</p>
      <p>{`${totalPrice} ${CURRENCY}`}</p>
      <Button
        size={'lg'}
        typography={'button1'}
        variant={'filled'}
        onClick={isOrganization ? onInvoice : onContinue}
      >
        {isOrganization ? t('cartPage.invoice') : t('cartPage.continue')}
      </Button>
      <div className={`w-full md:hidden ${topBorder}`} />
    </div>
  );
}
