import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';

import { IconHeart } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Pathname, Link as RoutingLink } from '@/i18n/routing';
import { cn } from '@/lib/utils/utils';

interface InfoBlockProps {
  title: string;
  description?: string;
  descriptionComponent?: ReactNode;
  isFavorites?: boolean;
  className?: string;
  path?: Pathname;
  onClick?: () => void;
}

export default function InfoBlock(props: Readonly<InfoBlockProps>) {
  const {
    title,
    descriptionComponent,
    description,
    isFavorites = false,
    path,
    onClick,
    className,
  } = props;
  const t = useTranslations('common');
  const hasAction = onClick || path;

  return (
    <div
      className={cn(
        'flex flex-col rounded-2xl bg-blue-steel p-6 md:px-8 lg:px-14',
        className,
        { 'pb-12': !hasAction }
      )}
    >
      <div className="mb-3 flex items-center gap-6 lg:mb-6">
        <h2 className="text-white heading-3">{title}</h2>
        {isFavorites && (
          <IconHeart className="text-red-deep" filled={true} size={36} />
        )}
      </div>
      <div className="flex flex-col gap-6 md:gap-3 lg:flex-row lg:gap-16">
        {descriptionComponent ?? (
          <p className="flex-1 text-white paragraph-1">{description}</p>
        )}

        {onClick && (
          <Button
            className="self-end"
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
            className="self-end"
            size={'lg'}
            typography={'button1'}
            variant={'filled'}
          >
            <RoutingLink href={path}>{t('view')}</RoutingLink>
          </Button>
        )}
      </div>
    </div>
  );
}
