import { ActionLink } from '@/components/strapi/components';
import { Button } from '@/components/ui/button';
import { IconHeart } from '@/components/icons';
import { InfoBlockResponse } from '@/lib/types';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils/utils';
import { useTranslations } from 'next-intl';

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
        'flex flex-col rounded-3xl border border-gray-100 bg-white p-6 shadow-md md:px-8 lg:px-14',
        className,
        { 'pb-12': !hasAction }
      )}
    >
      {title && (
        <div className="mb-3 flex items-center gap-6 lg:mb-6">
          <h2 className="text-[28px] font-semibold leading-tight text-neutral-900">
            {title}
          </h2>
          {isFavorites && (
            <IconHeart className="text-red-500" filled={true} size={28} />
          )}
        </div>
      )}
      <div className="flex flex-col gap-6 md:gap-3 lg:flex-row lg:gap-16">
        {descriptionComponent ?? (
          <div className="flex flex-1 items-center">
            <p className="text-[16px] leading-relaxed text-neutral-700">
              {description}
            </p>
          </div>
        )}

        {onClick && (
          <Button
            className="self-end rounded-xl bg-black text-white transition-colors hover:bg-neutral-900"
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
            className="self-end rounded-xl bg-black text-white transition-colors hover:bg-neutral-900"
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
