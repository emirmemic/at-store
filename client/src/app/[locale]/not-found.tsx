import { Button } from '@/components/ui/button';
import { IconSadFace } from '@/app/[locale]/(static-pages)/icons';
import { Link } from '@/i18n/routing';
import { MonoAppleBlock } from '@/components';
import { PAGE_NAMES } from '@/i18n/page-names';
import { useTranslations } from 'next-intl';

export default function NotFoundPage() {
  const t = useTranslations('notFound');
  return (
    <div className="flex w-full flex-col gap-16 py-4 container-max-width">
      <div className="flex min-h-screen-h-cutoff flex-col items-center justify-center gap-16 self-center">
        <p className="text-red-deep display">404</p>
        <IconSadFace />
        <p className="text-center heading-3 md:heading-2 lg:heading-1">
          {t('description')}
        </p>
        <Button asChild size={'lg'} variant={'filled'}>
          <Link href={PAGE_NAMES.HOME}> {t('buttonText')} </Link>
        </Button>
      </div>
    </div>
  );
}
