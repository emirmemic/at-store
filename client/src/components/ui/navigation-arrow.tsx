import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils/utils';

const svgVariants = cva('shrink-0 transition-all [&_path]:transition-colors', {
  variants: {
    direction: {
      left: 'rotate-180',
      right: '',
      top: '-rotate-90',
      bottom: 'rotate-90',
    },
    size: {
      sm: 'h-3 w-3',
      lg: 'h-5 w-5',
    },
    variant: {
      white: 'text-white',
      black: 'text-black',
    },
    isDisabled: {
      true: 'opacity-20 pointer-events-not-allowed',
      false: 'group-hover:text-grey-medium',
    },
  },
  defaultVariants: {
    size: 'sm',
    variant: 'black',
    isDisabled: false,
  },
});

export interface SliderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof svgVariants> {
  asChild?: boolean;
}

const NavigationArrow = React.forwardRef<HTMLButtonElement, SliderButtonProps>(
  ({ className, direction, size, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          'group inline-flex items-center justify-center p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.95] transition-all',
          className
        )}
        ref={ref}
        {...props}
      >
        <span>
          <svg
            className={cn(
              svgVariants({
                direction,
                size,
                variant,
                isDisabled: props.disabled,
              })
            )}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.80406 21.4035C3.7634 20.6238 3.76162 19.3582 4.8001 18.5768L13.5566 11.9883L4.78166 5.41355C3.74099 4.63381 3.73922 3.36828 4.7777 2.58691C5.81618 1.80553 7.50167 1.8042 8.54234 2.58393L19.2015 10.5705C20.2422 11.3502 20.244 12.6158 19.2055 13.3971L8.5687 21.4005C7.53022 22.1819 5.84473 22.1832 4.80406 21.4035Z"
            />
          </svg>
        </span>
      </Comp>
    );
  }
);
NavigationArrow.displayName = 'NavigationArrow';

export default NavigationArrow;
