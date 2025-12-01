import * as React from 'react';

import { MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils/utils';
import { useTranslations } from 'next-intl';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    role="navigation"
    {...props}
  />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationButtonProps = {
  isActive?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const PaginationButton = ({
  className,
  isActive,
  ...props
}: PaginationButtonProps) => (
  <button
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      'flex h-8 w-8 items-center justify-center rounded-full border border-transparent p-2 text-sm transition-all paragraph-1 hover:text-grey-medium',
      { 'border-black transition-all': isActive },
      className
    )}
    {...props}
  />
);
PaginationButton.displayName = 'PaginationButton';

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => {
  const t = useTranslations('navigation');

  return (
    <span
      aria-hidden
      className={cn('flex h-6 w-6 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontal className="h-2 w-2" />
      <span className="sr-only">{t('morePages')} </span>
    </span>
  );
};
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationButton,
};
