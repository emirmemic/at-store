import { Icon } from '@/lib/types';
import Link from 'next/link';
import { Pathname } from '@/i18n/routing';
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

  return (
    <Link className="w-full max-w-[362px]" href={path}>
      <div
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center gap-6 rounded-2xl border border-gray-200 bg-white px-8 py-8 text-center shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl',
          className
        )}
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}
      >
        <Icon
          aria-label={name}
          className="h-6 w-full max-w-40 text-gray-900 md:h-12 md:max-w-40 lg:h-16 lg:max-w-60"
        />
        <p className="flex-1 font-semibold text-gray-900 paragraph-3 md:paragraph-2 lg:paragraph-1">
          {title}
        </p>
      </div>
    </Link>
  );
}
