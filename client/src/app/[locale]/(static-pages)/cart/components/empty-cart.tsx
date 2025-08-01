import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { IconShoppingCart } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { PAGE_NAMES } from '@/i18n/page-names';

export default function EmptyCart() {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center justify-center gap-20 py-20">
      <h2 className="text-center heading-2">{t('cartPage.emptyCart')}</h2>
      <IconShoppingCart size={150} />
      <Button
        asChild
        size={'default'}
        typography={'button1'}
        variant={'filled'}
      >
        <Link href={PAGE_NAMES.PROMO}>{t('cartPage.returnToShopping')}</Link>
      </Button>
    </div>
  );
}
