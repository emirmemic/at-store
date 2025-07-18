'use client';

import { Button } from '@/components/ui/button';
import { CreateInvoiceResponse } from '@/lib/types';
import { IconLoader } from '@/components/icons';
import Link from 'next/link';
import { PAGE_NAMES } from '@/i18n/page-names';
import Price from '@/components/ui/price';
import { useCartProvider } from '@/app/providers';
import { useTranslations } from 'next-intl';
import { useUserProvider } from '@/app/providers/user-provider';

interface PropTypes {
  isLoading: boolean;
  handleInvoice: (params?: unknown) => Promise<CreateInvoiceResponse | null>;
}

export default function TotalPriceSection({
  isLoading,
  handleInvoice,
}: PropTypes) {
  // Hooks and Providers
  const t = useTranslations();
  const { cart } = useCartProvider();
  const { user } = useUserProvider();

  // States and Variables
  const isLoggedIn = user !== null;
  const isOrganization = user?.accountDetails.role?.type === 'organization';
  const totalPrice = cart.reduce(
    (total, { product: { discountedPrice, originalPrice }, quantity }) =>
      total + (discountedPrice || originalPrice) * quantity,
    0
  );

  return (
    <div className="flex flex-col gap-6 border-t border-grey-light py-6 text-black md:flex-row md:items-center md:justify-between md:gap-10">
      {isOrganization && (
        <p className="text-sm text-grey-dark">
          {t('cartPage.invoiceDescription')}
        </p>
      )}
      <div className="ml-auto flex flex-col items-start gap-1 md:items-end md:text-right">
        <p className="text-base font-medium uppercase">{`${t('cartPage.totalPrice')}:`}</p>
        <Price className="text-2xl font-bold" value={totalPrice} />
      </div>
      {!isLoggedIn ? (
        // Not logged in -> login/guest
        <Button
          asChild
          className="w-full md:w-auto"
          disabled={isLoading}
          size={'lg'}
          typography={'button1'}
          variant={'filled'}
          onClick={undefined}
        >
          <Link href={PAGE_NAMES.LOGIN_OR_GUEST}>{t('cartPage.continue')}</Link>
        </Button>
      ) : isOrganization ? (
        // Logged in AND is an organization: generate invoice
        <Button
          className="relative w-full md:w-auto"
          disabled={isLoading}
          size={'lg'}
          typography={'button1'}
          variant={'filled'}
          onClick={handleInvoice}
        >
          {isLoading && (
            <IconLoader className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 text-white" />
          )}
          {t('cartPage.invoice')}
        </Button>
      ) : (
        // Logged in, NOT an organization: continue to checkout
        <Button
          asChild
          className="w-full md:w-auto"
          disabled={isLoading}
          size={'lg'}
          typography={'button1'}
          variant={'filled'}
          onClick={undefined}
        >
          <Link href={PAGE_NAMES.CHECKOUT}>{t('cartPage.continue')}</Link>
        </Button>
      )}
    </div>
  );
}
