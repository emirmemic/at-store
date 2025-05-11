import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Pathname } from '@/i18n/routing';

import { MostSoldSection } from '../../(static-pages)/components';
import PageTitle from '../../(static-pages)/components/page-title';

export default function Page() {
  const t = useTranslations();

  return (
    <main className="flex flex-col items-center justify-center py-12 container-max-width">
      <PageTitle title={t('loginOrGuestPage.title')} />
      <div className="mb-14 flex flex-col gap-9 heading-4 md:mb-32 md:flex-row md:gap-20">
        <div className="flex flex-col items-center gap-4">
          <h2 className="mb-3">{t('login.login')}</h2>
          <ButtonPlaceholder link={PAGE_NAMES.LOGIN} title={t('login.login')} />
          <ButtonPlaceholder
            link={PAGE_NAMES.REGISTER}
            title={t('registrationPage.title')}
          />
        </div>
        <div className="w-[1px] border-r border-black" />
        <div className="flex flex-col items-center gap-4">
          <h2 className="mb-3">{t('loginOrGuestPage.continueAsGuest')}</h2>
          <ButtonPlaceholder
            link={PAGE_NAMES.CHECKOUT}
            title={t('common.continue')}
          />
        </div>
      </div>
      <MostSoldSection />
    </main>
  );
}

function ButtonPlaceholder({ title, link }: { title: string; link: Pathname }) {
  return (
    <Button
      asChild
      size={'lg'}
      transparentVariant={'black'}
      typography={'button1'}
      variant={'transparent'}
    >
      <Link href={link}>{title}</Link>
    </Button>
  );
}
