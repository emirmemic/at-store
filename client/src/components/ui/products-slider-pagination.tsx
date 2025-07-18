import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { cn } from '@/lib/utils/utils';

const dotVariants = cva(
  ['block', 'flex-shrink-0', 'transition-all', 'rounded-full', 'bg-grey-light'],
  {
    variants: {
      active: {
        true: 'w-10px h-10px bg-grey-dark',
        false: 'w-10px h-10px bg-grey-light hover:bg-grey-medium',
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

interface DotProps
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
          className={cn(dotVariants({ active, className }))}
          style={{ transitionDuration: `${duration}ms` }}
        ></span>
      </Comp>
    );
  }
);
DotSliderPagination.displayName = 'DotSliderPagination';

interface SliderPaginationProps {
  total: number;
  current: number;
  onDotClick?: (index: number) => void;
  className?: string;
  disabled?: boolean;
  duration?: number;
  dotProps?: DotProps;
}

const ProductsSliderPagination = ({
  total,
  current,
  onDotClick = () => {},
  className,
  disabled = false,
  duration = 700,
  dotProps = {},
}: SliderPaginationProps) => {
  const t = useTranslations('navigation');
  const listItems = Array.from({ length: total }, (_, i) => i);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      onDotClick(current > 0 ? current - 1 : 0);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      onDotClick(current < total - 1 ? current + 1 : total - 1);
    }
  };

  return (
    <ul
      className={cn('flex items-center gap-2', className)}
      onKeyDown={handleKeyDown}
    >
      {listItems.map((i) => (
        <li key={i} className="flex items-center">
          <DotSliderPagination
            active={i === current}
            aria-current={i === current ? 'true' : undefined}
            aria-label={t('goToSlide', { slideNumber: i + 1 })}
            disabled={disabled}
            duration={duration}
            tabIndex={0}
            title={t('goToSlide', { slideNumber: i + 1 })}
            onClick={() => onDotClick?.(i)}
            {...dotProps}
          />
        </li>
      ))}
    </ul>
  );
};

export default ProductsSliderPagination;
