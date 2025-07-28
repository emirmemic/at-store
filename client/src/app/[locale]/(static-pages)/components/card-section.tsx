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
    <Link
      className={cn(
        'group block w-full max-w-full overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:ring-1 hover:ring-gray-300',
        className
      )}
      href={path}
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 transition group-hover:bg-gray-200">
          <Icon
            className="h-12 w-12 text-gray-700 group-hover:text-black"
            aria-label={name}
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-base font-semibold">{title}</p>
          <span className="text-sm text-gray-500">{name}</span>
        </div>
      </div>
    </Link>
  );
}
