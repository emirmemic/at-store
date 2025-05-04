'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState, useRef } from 'react';

import { IconFlip } from '@/components/icons';
import { StrapiImage } from '@/components/strapi/components/strapi-image';
import { Button } from '@/components/ui/button';
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
    productImage,
    backTitle,
    backTagline,
    backDescription,
    actionLink,
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
      className="perspective-distant h-[442px] cursor-pointer"
      role="button"
      tabIndex={0}
      title={flipped ? t('back') : t('viewMore')}
      onClick={() => setFlipped((prev) => !prev)}
      onKeyDown={handleKeyboardEvent}
    >
      <div
        className={cn(
          'relative h-full w-full text-white transition-transform duration-1000 [transform-style:preserve-3d]',
          flipped && '[transform:rotateY(180deg)]'
        )}
      >
        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl bg-black px-4 py-3 [backface-visibility:hidden]">
          <div>
            <p className="mb-2 paragraph-2">{tagline}</p>
            <h3 className="mb-2 line-clamp-2 heading-4">{title}</h3>
            <p className="mb-6 paragraph-2">{priceLabel}</p>
          </div>
          <div className="mb-8 h-56 max-h-56 w-full">
            <StrapiImage
              priority
              alt={productImage?.alternativeText ?? 'Image'}
              className="h-full w-full object-contain"
              height={240}
              sizes="100vw"
              src={productImage.url}
              width={400}
            />
          </div>
          <IconFlip className="ml-auto shrink-0" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-between gap-6 rounded-2xl bg-black px-5 pb-3 pt-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div>
            <p className="paragraph-2">{backTagline}</p>
            <p className="heading-3">{backTitle}</p>
          </div>
          <div>
            <p className="mb-3 line-clamp-5 whitespace-pre-line heading-5">
              {backDescription}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {actionLink && (
              <Button asChild size={'md'} variant="filled">
                <Link
                  href={actionLink.linkUrl}
                  rel={
                    actionLink?.isExternal ? 'noopener noreferrer' : undefined
                  }
                  target={actionLink?.openInNewTab ? '_blank' : '_self'}
                >
                  {actionLink.linkText ?? t('buyNow')}
                </Link>
              </Button>
            )}
            <IconFlip className="ml-auto shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
