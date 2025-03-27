import { useTranslations } from 'next-intl';

import { IconSadFace } from '@/app/[locale]/(static-pages)/icons';
import { MonoAppleBlock } from '@/components';
import { Button } from '@/components/ui/button';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Link } from '@/i18n/routing';

export default function NotFoundPage() {
  const t = useTranslations('notFound');
  return (
    <div className="flex w-full flex-col py-12 container-max-width md:py-16">
      <h1 className="w-full pb-4 heading-3">{t('title')}</h1>
      <div className="h-px w-full bg-grey-darker"></div>
      <div className="flex max-w-3xl flex-col items-center justify-center self-center">
        <p className="mt-10 text-red-deep display md:mt-16">404</p>
        <IconSadFace className="my-10 flex justify-center md:my-16" />
        <p className="text-center heading-3 md:heading-2 lg:heading-1">
          {t('description')}
        </p>
        <Button
          asChild
          className="my-10 md:my-16"
          size={'lg'}
          variant={'filled'}
        >
          <Link href={PAGE_NAMES.HOME}> {t('buttonText')} </Link>
        </Button>
      </div>
      <MonoAppleBlock />
    </div>
  );
}
