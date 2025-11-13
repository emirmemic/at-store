'use client';

import { useRef, useState } from 'react';

import { ActionLink } from '@/components/strapi/components';
import { IconFlip } from '@/components/icons';
import { PromotionalFlipCardResponse } from '@/lib/types';
import { StrapiImage } from '@/components/strapi/components/strapi-image';
import { cn } from '@/lib/utils/utils';
import useClickOutside from '@/lib/hooks/use-onclick-outside';
import { useTranslations } from 'next-intl';

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
      className="perspective-distant relative mx-3 my-4 ml-0 h-[550px] min-w-[350px] shrink-0 cursor-pointer"
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
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <div
            className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border px-4 py-5"
            style={{ color: frontTextColor ? frontTextColor : 'inherit' }}
          >
            <div>
              {/* <p className="mb-2 !font-light paragraph-3">{tagline}</p>
              <h3 className="mb-2 line-clamp-2 heading-4">{title}</h3> */}
              {/* <p className="mb-6 heading-4">{priceLabel}</p> */}
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
            <IconFlip className="ml-auto shrink-0 rounded-md bg-white/30 p-1" />
          </div>
        </div>

        <div
          className="absolute inset-0 flex h-full w-full flex-col justify-between gap-6 rounded-2xl px-5 pb-5 pt-6 [backface-visibility:hidden] [transform:rotateY(180deg)]"
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
            <IconFlip className="ml-auto shrink-0 rounded-md bg-white/30 p-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
