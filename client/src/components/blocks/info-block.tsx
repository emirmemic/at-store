import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';

import { IconHeart } from '@/components/icons';
import { ActionLink } from '@/components/strapi/components';
import { Button } from '@/components/ui/button';
import { InfoBlockResponse } from '@/lib/types';
import { cn } from '@/lib/utils/utils';

interface InfoBlockProps extends Omit<InfoBlockResponse, 'id'> {
  descriptionComponent?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function InfoBlock(props: Readonly<InfoBlockProps>) {
  const {
    title,
    descriptionComponent,
    description,
    isFavorites = false,
    actionLink,
    onClick,
    className,
  } = props;
  const t = useTranslations('common');
  const hasAction = onClick || actionLink;

  return (
    <div
      className={cn(
        'flex flex-col rounded-2xl bg-blue-steel p-6 md:px-8 lg:px-14',
        className,
        { 'pb-12': !hasAction }
      )}
    >
      {title && (
        <div className="mb-3 flex items-center gap-6 lg:mb-6">
          <h2 className="text-white heading-3">{title}</h2>
          {isFavorites && (
            <IconHeart className="text-red-deep" filled={true} size={32} />
          )}
        </div>
      )}
      <div className="flex flex-col gap-6 md:gap-3 lg:flex-row lg:gap-16">
        {descriptionComponent ?? (
          <div className="flex flex-1 items-center">
            <p className="text-white paragraph-1">{description}</p>
          </div>
        )}

        {onClick && (
          <Button
            className="self-end"
            size="lg"
            typography="button1"
            variant="filled"
            onClick={onClick}
          >
            {t('view')}
          </Button>
        )}
        {actionLink && (
          <ActionLink
            actionLink={actionLink}
            className="self-end"
            size="lg"
            typography="button1"
            variant="filled"
          >
            {actionLink.linkText ?? t('view')}
          </ActionLink>
        )}
      </div>
    </div>
  );
}
