import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { NavSubLinkItem } from '@/components/nav-bar/types';
import NavigationArrow from '@/components/ui/navigation-arrow';
import { cn } from '@/lib/utils/utils';

interface MobileMenuProps {
  subMenuItems: NavSubLinkItem[];
  className?: string;
  closeMenu?: () => void;
  onBack: () => void;
}

export default function MobileSubList({
  subMenuItems,
  className,
  closeMenu,
  onBack,
}: MobileMenuProps) {
  const t = useTranslations();
  return (
    <div className={cn('flex flex-col items-center gap-1', className)}>
      <div className="flex w-full">
        <NavigationArrow
          aria-label={t('common.back')}
          className="text-white"
          direction={'left'}
          size={'lg'}
          title={t('common.back')}
          type="button"
          variant={'white'}
          onClick={onBack}
        />
      </div>
      {subMenuItems.map((item) => (
        <Link
          key={item.id}
          className="py-1 transition-all paragraph-1 hover:text-grey-medium active:scale-95"
          href={item.href}
          onClick={closeMenu}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
