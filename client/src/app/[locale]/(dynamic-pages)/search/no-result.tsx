import { useTranslations } from 'next-intl';
import React from 'react';

import { IconSadFace } from '@/app/[locale]/(static-pages)/icons';
import { MonoAppleBlock } from '@/components';
import { Button } from '@/components/ui/button';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Link } from '@/i18n/routing';

export default function NoResult() {
  const t = useTranslations();
  return (
    <div className="flex flex-col items-center justify-center gap-16 container-max-width">
      <IconSadFace className="h-60 w-60" />
      <p className="text-red-deep paragraph-1">{t('navbar.noResults')}</p>
      <Button asChild size={'lg'} variant={'filled'}>
        <Link href={PAGE_NAMES.HOME}> {t('notFound.buttonText')} </Link>
      </Button>
      <MonoAppleBlock />
    </div>
  );
}
