'use client';

import { useEffect, useState } from 'react';

import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { PAGE_NAMES } from '@/i18n/page-names';
import { cn } from '@/lib/utils/utils';
import { useTranslations } from 'next-intl';

interface TradeInBannerProps {
  className?: string;
}

interface BannerItem {
  text: string;
  ctaText: string;
  href: (typeof PAGE_NAMES)[keyof typeof PAGE_NAMES];
}

export default function TradeInBanner({ className }: TradeInBannerProps) {
  const t = useTranslations('homepage.tradeInBanner');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  // Define multiple banner items
  const items: BannerItem[] = [
    {
      text: t('items.tradeIn.text'),
      ctaText: t('items.tradeIn.cta'),
      href: PAGE_NAMES.TRADE_IN,
    },
    {
      text: t('items.education.text'),
      ctaText: t('items.education.cta'),
      href: PAGE_NAMES.EDUCATIONAL_DISCOUNT,
    },
    {
      text: t('items.business.text'),
      ctaText: t('items.business.cta'),
      href: PAGE_NAMES.REGISTER,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipping(true);

      // Wait for fade out before changing content
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }, 300);

      // Fade back in
      setTimeout(() => {
        setIsFlipping(false);
      }, 600);
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length]);

  const currentItem = items[currentIndex];

  return (
    <section
      className={cn(
        'relative w-full overflow-hidden text-slate-900',
        className
      )}
    >
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-[#3577E5] backdrop-blur-xl" />

      {/* Subtle animated gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-60" />

      <div className="relative px-3 py-2.5 container-max-width-xl md:px-6 md:py-3">
        <div className="flex flex-row items-center justify-center gap-3 text-center text-[11px] md:flex-row md:text-sm">
          <div className="flex items-center gap-3">
            <p
              className={cn(
                'text-[11px] font-medium text-white drop-shadow-sm transition-opacity duration-300 ease-in-out md:text-[16px]',
                isFlipping ? 'opacity-0' : 'opacity-100'
              )}
            >
              {currentItem.text}
            </p>
          </div>

          <Link
            className={cn(
              'inline-flex items-center gap-2 text-white drop-shadow-sm transition-all duration-300 ease-in-out hover:gap-3',
              isFlipping ? 'opacity-0' : 'opacity-100'
            )}
            href={currentItem.href as any}
          >
            {currentItem.ctaText}
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
