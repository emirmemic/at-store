import { useTranslations } from 'next-intl';

import { IconAtStoreLogo } from '@/components/icons';
import { Link } from '@/i18n/routing';

export default function Logo() {
  const t = useTranslations('navbar');
  return (
    <Link
      className="flex h-full w-36 shrink-0 items-center gap-2 md:w-40"
      href="/"
    >
      <span className="sr-only">{t('visitHomePage')}</span>
      <IconAtStoreLogo className="h-full w-full object-contain text-white md:w-44" />
    </Link>
  );
}
