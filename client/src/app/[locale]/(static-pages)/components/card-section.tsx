import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Link, Pathname } from '@/i18n/routing';
import { Icon } from '@/lib/types';
import { cn } from '@/lib/utils/utils';

interface CardSectionProps {
  name: string;
  title: string;
  path: Pathname;
  className?: string;
  Icon: Icon;
}

export default function CardSection(props: Readonly<CardSectionProps>) {
  const { title, path, name, Icon, className } = props;
  const t = useTranslations('common');
  return (
    <div className="flex w-full max-w-[362px] flex-col items-center justify-center gap-6 rounded-2xl bg-blue-steel px-9 py-8 md:max-w-full md:gap-8 md:px-4 md:py-9 lg:gap-10 lg:px-8 lg:py-12">
      <Icon
        aria-label={name}
        className={cn(
          'h-16 w-full max-w-72 text-white md:h-20 md:max-w-72 lg:h-24 lg:max-w-md',
          className
        )}
      ></Icon>

      <p className="flex-1 text-white heading-3 md:heading-2 lg:heading-1">
        {title}
      </p>
      <Button asChild size={'lg'} typography={'button1'} variant={'filled'}>
        <Link href={path}>{t('view')}</Link>
      </Button>
    </div>
  );
}
