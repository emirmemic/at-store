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
        true: 'w-38px h-6px md:h-4 md:w-[48px] bg-white ',
        false:
          'w-6px h-6px bg-grey-light md:w-4 md:h-4 group-hover:bg-grey-dark',
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
        className: 'w-38px h-6px md:w-[80px] md:h-4 bg-white',
      },
    ],
    defaultVariants: {
      variant: 'light',
    },
  }
);

const progressBarVariants = cva(
  'flex items-center justify-center rounded-full gap-1 px-4 py-6px md:gap-3 md:px-5',
  {
    variants: {
      variant: {
        light: 'bg-grey-darker md:py-2 h-5 md:h-10',
        dark: 'bg-grey-darkest md:py-3 h-5 md:h-14',
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
