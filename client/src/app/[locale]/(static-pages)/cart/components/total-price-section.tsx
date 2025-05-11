'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { useCartProvider } from '@/app/providers';
import { useUserProvider } from '@/app/providers/user-provider';
import { Button } from '@/components/ui/button';
import { PAGE_NAMES } from '@/i18n/page-names';
import { CURRENCY } from '@/lib/constants';

export default function TotalPriceSection() {
  const t = useTranslations();
  const { cart } = useCartProvider();
  const { user } = useUserProvider();

  const isLoggedIn = user !== null;
  const isOrganization = user?.accountDetails.role?.type === 'organization';

  const totalPrice = cart.reduce(
    (total, { product: { discountedPrice, originalPrice }, quantity }) =>
      total + (discountedPrice || originalPrice) * quantity,
    0
  );
  const topBorder = 'border-t border-grey-silver';

  return (
    <div
      className={`mt-3 flex flex-col items-center justify-center gap-3 pt-2 heading-5 ${topBorder}`}
    >
      {isOrganization && (
        <p className="p-4 text-center">{t('cartPage.invoiceDescription')}</p>
      )}
      <p>{t('cartPage.totalPrice')}</p>
      <p>{`${totalPrice} ${CURRENCY}`}</p>
      <Button asChild size={'lg'} typography={'button1'} variant={'filled'}>
        <Link
          href={
            isLoggedIn
              ? isOrganization
                ? PAGE_NAMES.B2B
                : PAGE_NAMES.CHECKOUT
              : PAGE_NAMES.LOGIN_OR_GUEST
          }
        >
          {isOrganization ? t('cartPage.invoice') : t('cartPage.continue')}
        </Link>
      </Button>
      <div className={`w-full md:hidden ${topBorder}`} />
    </div>
  );
}
