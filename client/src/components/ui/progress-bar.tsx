import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { cn } from '@/lib/utils/utils';

const dotVariants = cva(
  'block flex-shrink-0 transition-all cursor-pointer rounded-full',
  {
    variants: {
      variant: {
        light: '',
        dark: '',
      },
      active: {
        true: 'w-5 h-2 md:w-6 md:h-2 bg-white',
        false: 'w-2 h-2 md:w-3 md:h-3 bg-grey-light group-hover:bg-grey-dark',
      },
      disabled: {
        true: 'pointer-events-none',
        false: 'cursor-pointer',
      },
    },
    compoundVariants: [
      {
        variant: 'dark',
        active: true,
        className: 'w-5 h-2 md:w-6 md:h-2 bg-white',
      },
    ],
    defaultVariants: {
      variant: 'light',
    },
  }
);

const progressBarVariants = cva(
  'flex items-center justify-center rounded-full gap-0.5 px-2 py-1 md:gap-1 md:px-3',
  {
    variants: {
      variant: {
        light: 'bg-grey-darker md:py-1 h-3 md:h-6',
        dark: 'bg-grey-darkest md:py-1.5 h-3 md:h-6',
      },
      disabled: {
        true: 'opacity-30 pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'light',
    },
  }
);

interface DotProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof dotVariants> {
  asChild?: boolean;
  duration?: number;
  disabled?: boolean;
}

const DotProgressBar = React.forwardRef<HTMLButtonElement, DotProps>(
  (
    {
      className,
      variant,
      active,
      disabled,
      asChild = false,
      duration = 700,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        {...props}
        className="group p-1 md:p-2"
        disabled={disabled}
      >
        <span
          className={cn(dotVariants({ variant, active, className, disabled }))}
          style={{ transitionDuration: `${duration}ms` }}
        ></span>
      </Comp>
    );
  }
);
DotProgressBar.displayName = 'DotProgressBar';

interface SliderProgressProps
  extends React.HTMLAttributes<HTMLUListElement>,
    VariantProps<typeof progressBarVariants> {
  total: number;
  currentPage: number;
  onDotClick?: (index: number) => void;
  className?: string;
  disabled?: boolean;
  duration?: number;
  dotProps?: DotProps;
}

const ProgressBar = ({
  total,
  currentPage,
  onDotClick = () => {},
  className,
  disabled = false,
  variant,
  duration = 700,
  dotProps = {},
  ...props
}: SliderProgressProps) => {
  const t = useTranslations('navigation');
  const listItems = Array.from({ length: total }, (_, i) => i);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (disabled) return;

    let newIndex = currentPage;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      newIndex = currentPage === 0 ? total - 1 : currentPage - 1;
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      newIndex = currentPage === total - 1 ? 0 : currentPage + 1;
    }

    onDotClick(newIndex);
  };
  return (
    <ul
      className={cn(progressBarVariants({ className, variant, disabled }))}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {listItems.map((i) => (
        <li key={i} className="flex items-center">
          <DotProgressBar
            active={i + 1 === currentPage}
            aria-current={i === currentPage ? 'true' : undefined}
            aria-label={t('goToSlide', { slideNumber: i + 1 })}
            disabled={disabled}
            duration={duration}
            tabIndex={0}
            title={t('goToSlide', { slideNumber: i + 1 })}
            variant={variant}
            onClick={() => onDotClick?.(i + 1)}
            {...dotProps}
          />
        </li>
      ))}
    </ul>
  );
};

export default ProgressBar;
