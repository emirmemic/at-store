import { Button } from '@/components/ui/button';
import { IconShoppingCart } from '@/components/icons';
import Link from 'next/link';
import { PAGE_NAMES } from '@/i18n/page-names';
import { useTranslations } from 'next-intl';

export default function EmptyCart() {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center justify-evenly rounded-xl bg-gray-100 py-16 md:flex-row">
      <IconShoppingCart size={256} className="rounded-xl bg-gray-50 p-8" />
      <div className="mt-8 flex flex-col gap-4 md:mt-0">
        <h2 className="text-center heading-2">{t('cartPage.emptyCart')}</h2>
        <Button
          asChild
          size={'default'}
          typography={'button1'}
          variant={'filled'}
          className="mt-4"
        >
          <Link href={PAGE_NAMES.HOME}>{t('cartPage.returnToShopping')}</Link>
        </Button>
        <Button
          asChild
          size={'default'}
          typography={'button1'}
          variant={'transparent'}
          className="border border-black text-black hover:bg-white"
        >
          <Link href={PAGE_NAMES.PROMO}>Naša preporuka</Link>
        </Button>
      </div>
    </div>
  );
}
