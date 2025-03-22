import { useTranslations } from 'next-intl';

import { IconHeart } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Link, Pathname } from '@/i18n/routing';
import { cn } from '@/lib/utils/utils';

interface InfoBlockProps {
  title: string;
  description: string;
  isFavorites?: boolean;
  className?: string;
  path?: Pathname;
  onClick?: () => void;
}

export default function InfoBlock(props: Readonly<InfoBlockProps>) {
  const {
    title,
    description,
    isFavorites = false,
    path,
    onClick,
    className,
  } = props;
  const t = useTranslations('common');
  const hasAction = onClick || path;
  const buttonClasses = 'mt-20 self-end md:mt-6';
  return (
    <div
      className={cn(
        'flex flex-col rounded-2xl bg-blue-steel p-5 md:pl-10 lg:pl-14',
        className,
        { 'pb-12': !hasAction }
      )}
    >
      <div className="mb-8 flex items-center gap-6 md:mb-4">
        <h2 className="text-white heading-3">{title}</h2>
        {isFavorites && (
          <IconHeart className="text-red-deep" filled={true} size={36} />
        )}
      </div>
      <p className="flex-1 text-white paragraph-1">{description}</p>
      {onClick && (
        <Button
          className={buttonClasses}
          size={'lg'}
          typography={'button1'}
          variant={'filled'}
          onClick={onClick}
        >
          {t('view')}
        </Button>
      )}
      {path && (
        <Button
          asChild
          className={buttonClasses}
          size={'lg'}
          typography={'button1'}
          variant={'filled'}
        >
          <Link href={path}>{t('view')}</Link>
        </Button>
      )}
    </div>
  );
}
