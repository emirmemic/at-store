import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { NavSubMenuItem } from '@/components/nav-bar/types';
import NavigationArrow from '@/components/ui/navigation-arrow';
import { cn } from '@/lib/utils/utils';

interface MobileMenuProps {
  subMenuItems: NavSubMenuItem[];
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
    <div className={cn('flex flex-col items-start gap-1', className)}>
      <div className="flex w-full">
        <NavigationArrow
          aria-label={t('common.back')}
          className="text-black"
          direction={'left'}
          size={'lg'}
          title={t('common.back')}
          type="button"
          variant={'black'}
          onClick={onBack}
        />
      </div>
      {subMenuItems.map((item, index) => (
        <Link
          key={item.id}
          className={cn(
            'py-1 text-black transition-all paragraph-1 hover:text-grey-medium active:scale-95',
            index === subMenuItems.length - 1 && 'text-blue-500'
          )}
          href={item.link}
          onClick={closeMenu}
        >
          {item.displayName}
        </Link>
      ))}
    </div>
  );
}
