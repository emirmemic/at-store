import { useTranslations } from 'next-intl';

import {
  IconKeyboard,
  IconMouse,
  IconOnlineBusiness,
  IconPowerPlug,
} from '@/components/icons';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Link, Pathname } from '@/i18n/routing';
import { Icon } from '@/lib/types';

interface MacDodaciBarItem {
  id: number;
  Icon: Icon;
  label: string;
  href: Pathname;
}

interface MacDodaciBarProps {
  title?: string;
  subtitle?: string;
  items?: MacDodaciBarItem[];
}

export default function MacDodaciBar({
  title,
  subtitle,
  items = [],
}: MacDodaciBarProps) {
  const t = useTranslations('common');
  const defaultIcons: MacDodaciBarItem[] = [
    {
      id: 1,
      Icon: IconPowerPlug,
      label: t('adapters'),
      href: PAGE_NAMES.ACCESSORIES,
    },
    {
      id: 2,
      Icon: IconOnlineBusiness,
      label: t('protection'),
      href: PAGE_NAMES.ACCESSORIES,
    },
    {
      id: 3,
      Icon: IconMouse,
      label: t('mice'),
      href: PAGE_NAMES.ACCESSORIES,
    },
    {
      id: 4,
      Icon: IconKeyboard,
      label: t('keyboards'),
      href: PAGE_NAMES.ACCESSORIES,
    },
  ];

  const icons = items.length > 0 ? items : defaultIcons;
  const finalTitle = title ?? t('macAccessories');
  const finalSubtitle = subtitle ?? t('seeAllMacAccessories');

  return (
    <div className="rounded-2xl bg-blue-steel px-14 py-10 text-white md:px-24 md:py-8 lg:px-32 lg:py-12">
      <div className="mb-8 text-center">
        <p className="mb-4 heading-4 md:bullet-heading-1 lg:heading-3">
          {finalTitle}
        </p>
        <p className="bullet-2">{finalSubtitle}</p>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 md:gap-x-6 xl:gap-x-24">
        {icons.map(({ id, Icon, label, href }) => {
          return (
            <Link
              key={id}
              className="group flex flex-col items-center gap-8 rounded-lg border border-transparent p-2 px-6 transition-all duration-300 hover:border-grey-medium hover:text-grey-medium md:gap-3"
              href={href}
            >
              <Icon className="size-16 transition-colors duration-300 group-hover:text-grey-medium md:size-20" />
              <p className="flex grow items-center text-center bullet-1 md:paragraph-1">
                {label}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
