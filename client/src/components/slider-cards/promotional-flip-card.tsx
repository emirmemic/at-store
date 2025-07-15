'use client';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

import { IconFlip } from '@/components/icons';
import { ActionLink } from '@/components/strapi/components';
import { StrapiImage } from '@/components/strapi/components/strapi-image';
import useClickOutside from '@/lib/hooks/use-onclick-outside';
import { PromotionalFlipCardResponse } from '@/lib/types';
import { cn } from '@/lib/utils/utils';

export default function PromotionalFlipCard(
  promotion: PromotionalFlipCardResponse
) {
  const t = useTranslations('common');
  const {
    tagline,
    title,
    priceLabel,
    image,
    frontTextColor,
    backTitle,
    backTagline,
    backDescription,
    actionLink,
    backBackgroundColor,
    backTextColor,
  } = promotion;
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleKeyboardEvent = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setFlipped((prev) => !prev);
    }
  };
  useClickOutside(cardRef, () => {
    if (flipped) setFlipped(false);
  });

  return (
    <div
      ref={cardRef}
      aria-label={flipped ? t('back') : t('viewMore')}
      className="perspective-distant h-[460px] cursor-pointer"
      role="button"
      tabIndex={0}
      title={flipped ? t('back') : t('viewMore')}
      onClick={() => setFlipped((prev) => !prev)}
      onKeyDown={handleKeyboardEvent}
    >
      <div
        className={cn(
          'relative h-full w-full transition-transform duration-1000 [transform-style:preserve-3d]',
          flipped && '[transform:rotateY(180deg)]'
        )}
      >
        <div className="absolute inset-0 flex [backface-visibility:hidden]">
          <div
            className="relative flex grow flex-col justify-between overflow-hidden rounded-2xl border px-4 py-3"
            style={{ color: frontTextColor ? frontTextColor : 'inherit' }}
          >
            <div>
              <p className="mb-2 paragraph-4">{tagline}</p>
              <h3 className="heading-6 mb-2 line-clamp-2">{title}</h3>
              <p className="mb-6 paragraph-2">{priceLabel}</p>
            </div>
            {image && (
              <StrapiImage
                priority
                alt={image?.alternativeText ?? 'Image'}
                className="absolute inset-0 -z-[1] h-full w-full rounded-2xl object-cover"
                height={240}
                sizes="100vw"
                src={image.url}
                width={400}
              />
            )}
            <IconFlip className="ml-auto shrink-0" />
          </div>
        </div>

        <div
          className="absolute inset-0 flex flex-col justify-between gap-6 rounded-2xl px-5 pb-3 pt-6 [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{
            backgroundColor: backBackgroundColor ? backBackgroundColor : '#000',
            color: backTextColor ? backTextColor : '#fff',
          }}
        >
          <div>
            <p className="paragraph-2">{backTagline}</p>
            <p className="heading-4">{backTitle}</p>
          </div>
          <div>
            <p className="mb-3 line-clamp-5 whitespace-pre-line paragraph-2">
              {backDescription}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {actionLink && (
              <ActionLink actionLink={actionLink} size="md" variant="filled">
                {actionLink.linkText || t('buyNow')}
              </ActionLink>
            )}
            <IconFlip className="ml-auto shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
