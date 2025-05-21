'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { useCartProvider } from '@/app/providers';
import { useUserProvider } from '@/app/providers/user-provider';
import { IconLoader } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Price from '@/components/ui/price';
import { PAGE_NAMES } from '@/i18n/page-names';
import { CreateInvoiceResponse } from '@/lib/types';

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
    <div className="flex flex-col justify-between gap-8 py-8 heading-5 md:flex-row md:gap-16">
      {isOrganization && <p>{t('cartPage.invoiceDescription')}</p>}
      <div className="ml-auto flex flex-col items-start gap-3">
        <div className="font-bold">
          <p>{`${t('cartPage.totalPrice')}:`}</p>
          <Price value={totalPrice} />
        </div>
        {!isLoggedIn ? (
          // Not logged in -> login/guest
          <Button asChild size={'lg'} typography={'button1'} variant={'filled'}>
            <Link href={PAGE_NAMES.LOGIN_OR_GUEST}>
              {t('cartPage.continue')}
            </Link>
          </Button>
        ) : isOrganization ? (
          // Logged in AND is an organization: generate invoice
          <Button
            className="relative"
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
          <Button asChild size={'lg'} typography={'button1'} variant={'filled'}>
            <Link href={PAGE_NAMES.CHECKOUT}>{t('cartPage.continue')}</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
