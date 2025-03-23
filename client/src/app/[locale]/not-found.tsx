import { useTranslations } from 'next-intl';

import IconSadFace from '@/assets/icons/sad-face';
import { MonoAppleBlock } from '@/components';
import { Button } from '@/components/ui/button';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Link } from '@/i18n/routing';

export default function NotFoundPage() {
  const t = useTranslations('notFound');
  return (
    <div className="flex w-full flex-col py-10 pt-12 container-max-width md:py-16">
      <h1 className="mb-16 w-full px-5 pb-4 heading-3">{t('title')}</h1>
      <div className="flex max-w-3xl flex-col items-center justify-center self-center">
        <p className="text-red-deep display">404</p>
        <IconSadFace className="my-16 flex justify-center" />
        <p className="heading-1">{t('description')}</p>

        <Link href={PAGE_NAMES.HOME}>
          <Button className="my-16" size={'lg'} variant={'filled'}>
            Pocetna
          </Button>
        </Link>
      </div>
      <MonoAppleBlock />
      <p></p>
    </div>
  );
}
