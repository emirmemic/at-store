import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { monri } from '@/assets/images';
import { IconMaestro, IconMasterCard, IconVisa } from '@/components/icons';

import { Button } from '@/components/ui/button';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Pathname } from '@/i18n/routing';

import { MostSoldSection } from '../../(static-pages)/components';

export default function Page() {
  const t = useTranslations();

  return (
    <main className="flex flex-col items-center justify-center pt-0 container-max-width">
      <div className="mt-0 w-screen bg-gray-100">
        <div className="flex items-center justify-center py-6 pb-10 pt-10 container-max-width">
          <h1 className="mb-50 text-center text-xl font-semibold md:text-5xl">
            Odaberite način nastavka
          </h1>
        </div>
      </div>
      <div className="text-m md:text-m"></div>
      <div className="mb-14 flex flex-col gap-9 pt-20 heading-4 md:mb-32 md:flex-row md:gap-20">
        <div className="flex w-full flex-col items-center gap-4 md:w-auto">
          <h2 className="mb-3">{t('login.login')}</h2>
          <ButtonPlaceholder
            className="w-full"
            link={PAGE_NAMES.LOGIN}
            title={t('login.login')}
          />
          <ButtonPlaceholder
            className="w-full"
            link={PAGE_NAMES.REGISTER}
            title={t('registrationPage.title')}
          />
        </div>
        <div className="w-[1px] border-r border-black" />
        <div className="flex w-full flex-col items-center gap-4 md:w-auto">
          <h2 className="mb-3">{t('loginOrGuestPage.continueAsGuest')}</h2>
          <ButtonPlaceholder
            className="w-full"
            link={PAGE_NAMES.CHECKOUT}
            title={t('common.continue')}
          />
        </div>
      </div>
      <MostSoldSection />
    </main>
  );
}

function ButtonPlaceholder({
  title,
  link,
  className,
}: {
  title: string;
  link: Pathname;
  className?: string;
}) {
  return (
    <Button
      asChild
      size={'lg'}
      transparentVariant={'black'}
      typography={'button1'}
      variant={'transparent'}
      className={className}
    >
      <Link href={link}>{title}</Link>
    </Button>
  );
}
