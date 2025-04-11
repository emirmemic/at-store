'use client';
import { useTranslations } from 'next-intl';

import { IconAtStoreLogo, IconChevron } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Link, useRouter } from '@/i18n/routing';

export default function UserTypeSelection() {
  const t = useTranslations('registrationPage');
  const router = useRouter();

  return (
    <div className="relative flex w-full max-w-[842px] flex-col items-center justify-center gap-4 rounded-2xl bg-black p-9 text-white md:p-12">
      <button
        className="absolute left-6 top-6 flex gap-6 hover:text-grey-medium"
        type="button"
        onClick={router.back}
      >
        <IconChevron className="rotate-90" />
        <span className="paragraph-2">{t('back')}</span>
      </button>
      <h1 className="mb-2.5 mt-16 heading-3">{t('title')}</h1>
      <p className="paragraph-2">
        {`${t('titleDescription')} `}
        <Link className="text-blue hover:underline" href="/login">
          {t('loginPrompt')}
        </Link>
      </p>
      <h2 className="mb-6 heading-3">{t('areYouALegalEntity')}</h2>
      <Button
        className="mb-6"
        transparentVariant={'white'}
        typography={'button1'}
        variant={'transparent'}
        onClick={() => {}}
      >
        {t('legalEntity')}
      </Button>
      <Button
        transparentVariant={'white'}
        typography={'button1'}
        variant={'transparent'}
        onClick={() => {}}
      >
        {t('individual')}
      </Button>
      <IconAtStoreLogo className="mt-20 text-center" height={60} width={266} />
    </div>
  );
}
