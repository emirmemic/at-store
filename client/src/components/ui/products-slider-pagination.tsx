import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { cn } from '@/lib/utils/utils';

const dotVariants = cva(
  [
    'block',
    'flex-shrink-0',
    'transition-all',
    'rounded-full',
    'bg-grey-mediumLight',
  ],
  {
    variants: {
      active: {
        true: ['w-10px h-10px bg-grey-dark'],
        false: 'w-10px h-10px bg-grey-light hover:bg-grey-medium',
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

export interface DotProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof dotVariants> {
  asChild?: boolean;
  duration?: number;
}

const DotSliderPagination = React.forwardRef<HTMLButtonElement, DotProps>(
  (
    { className, active, asChild = false, disabled, duration = 700, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        {...props}
        className={cn(
          'p-1',
          disabled ? 'pointer-events-none opacity-30' : 'cursor-pointer',
          className
        )}
      >
        <span
          style={{ transitionDuration: `${duration}ms` }}
          className={cn(dotVariants({ active, className }))}
        ></span>
      </Comp>
    );
  }
);
DotSliderPagination.displayName = 'DotSliderPagination';

interface SliderPaginationProps {
  total: number;
  currentPage: number;
  onDotClick?: (index: number) => void;
  className?: string;
  disabled?: boolean;
  duration?: number;
  dotProps?: DotProps;
}

const ProductsSliderPagination = ({
  total,
  currentPage,
  onDotClick = () => {},
  className,
  disabled = false,
  duration = 700,
  dotProps = {},
}: SliderPaginationProps) => {
  const t = useTranslations('navigation');
  const listItems = React.useMemo(
    () => Array.from({ length: total }, (_, i) => i + 1),
    [total]
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLUListElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onDotClick(currentPage > 1 ? currentPage : 1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        onDotClick(currentPage < total - 1 ? currentPage + 1 : total - 1);
      }
    },
    [currentPage, total, onDotClick]
  );

  return (
    <ul
      className={cn('flex items-center gap-2', className)}
      onKeyDown={handleKeyDown}
    >
      {listItems.map((i) => (
        <li key={i} className="flex items-center">
          <DotSliderPagination
            disabled={disabled}
            active={i + 1 === currentPage}
            duration={duration}
            onClick={() => onDotClick?.(i + 1)}
            aria-label={t('goToSlide', { slideNumber: i + 1 })}
            title={t('goToSlide', { slideNumber: i + 1 })}
            aria-current={i === currentPage ? 'true' : undefined}
            tabIndex={0}
            {...dotProps}
          />
        </li>
      ))}
    </ul>
  );
};

export default ProductsSliderPagination;
