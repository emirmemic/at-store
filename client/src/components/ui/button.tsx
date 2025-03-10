import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils/utils';

const buttonVariants = cva(
  [
    // Layout
    'inline-flex',
    'items-center',
    'justify-center',
    'gap-2',
    'whitespace-nowrap',
    'rounded-full',

    // Transitions and Effects
    'ring-offset-background',
    'transition-colors',
    'transition-all',
    'duration-200',
    'active:scale-[0.95]',

    // Focus and Disabled States
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-ring',
    'focus-visible:ring-offset-2',
    'disabled:pointer-events-none',
    'disabled:opacity-50',

    // SVG Styles
    '[&_svg]:pointer-events-none',
    '[&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        filled: [
          'bg-blue',
          'text-primary-foreground',
          'hover:bg-blue-dark',
          'hover:shadow-inset-black',
        ],
        transparent: [
          'bg-transparent',
          'border',
          'border-blue',
          'text-white',
          'hover:bg-blue',
        ],
        /// Add to favorites button
        addToFavorites: [
          'border',
          'bg-white',
          'text-black',
          'border-black',
          'hover:border-grey',
          'data-[active=true]:hover:border-black',
          'data-[active=true]:border-grey',
        ],
        productVariant: [
          'border',
          'border-black',
          'bg-white',
          'text-black',
          'hover:border-blue',
          'hover:shadow-inset-blue',
          'data-[active=true]:border-blue',
          'data-[active=true]:shadow-inset-blue',
        ],
        color: [
          'border',
          'border-black',
          'hover:border-blue',
          'hover:shadow-inset-blue',
          'data-[active=true]:border-blue',
          'data-[active=true]:shadow-inset-blue',
        ],
      },
      size: {
        sm: ['py-2', 'px-4'],
        md: ['px-[38px]', 'py-4'],
        lg: ['py-4', 'px-14'],
        xlg: ['py-4', 'px-24'],
        textWithIcon: ['pl-14', 'pr-10', 'py-4'],
        color: ['size-9'],
      },
      typography: {
        button1: ['button-1'],
        button2: ['button-2'],
      },
      transparentVariant: {
        blue_blue: ['text-blue hover:text-white'],
        blue_black: ['text-black'],
        white: ['border-white hover:text-black hover:bg-white'],
        white_blueBg: ['border-white hover:border-blue'],
        black: ['text-black border-black hover:border-blue hover:text-white'],
      },
    },
  }
);

type TransparentVariant =
  | 'blue_blue' // blue border, blue text
  | 'blue_black' // blue border, black text
  | 'white' // white border, white text
  | 'white_blueBg' // white border, blue background on hover
  | 'black'; // black border, black text

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isSelected?: boolean;
  transparentVariant?: TransparentVariant;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      typography,
      transparentVariant,
      isSelected,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(
          buttonVariants({
            className,
            size,
            transparentVariant,
            typography,
            variant,
          })
        )}
        data-active={isSelected}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
