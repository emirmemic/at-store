import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { PAGE_NAMES } from '@/i18n/page-names';
import { cn } from '@/lib/utils/utils';
import { useTranslations } from 'next-intl';

interface TradeInBannerProps {
  className?: string;
}

export default function TradeInBanner({ className }: TradeInBannerProps) {
  const t = useTranslations('homepage.tradeInBanner');

  return (
    <section className={cn('w-full bg-[#3577E5] text-slate-900', className)}>
      <div className="px-3 py-2.5 container-max-width-xl md:px-6 md:py-3">
        <div className="flex flex-row items-center justify-center gap-3 text-center text-xs md:flex-row md:text-sm">
          <div className="flex items-center gap-3">
            <p className="text-sm font-medium text-white md:text-[16px]">
              {t('description')}
            </p>
          </div>
          <Link
            className="inline-flex items-center gap-2 text-white transition"
            href={{ pathname: PAGE_NAMES.TRADE_IN }}
          >
            {t('primaryCta')}
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
