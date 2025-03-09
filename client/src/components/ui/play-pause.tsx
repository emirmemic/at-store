import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import IconPause from '@/components/icons/pause';
import IconPlay from '@/components/icons/play';
import { cn } from '@/lib/utils/utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center p-2 transition-all',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.95] rounded-full',
  ],
  {
    variants: {
      variant: {
        light: 'w-5 h-5 md:w-10 md:h-10 bg-grey-darker',
        dark: 'w-5 h-5 md:w-14 md:h-14 bg-grey-darkest',
      },
      isDisabled: {
        true: 'opacity-20 cursor-not-allowed',
        false: 'group-hover:text-grey-medium',
      },
    },
    defaultVariants: {
      variant: 'light',
      isDisabled: false,
    },
  }
);
const iconVariants = cva('shrink-0 text-grey-mediumLight', {
  variants: {
    variant: {
      light: 'w-4 h-4 md:w-6 md:h-6',
      dark: 'w-4 h-4 md:w-8 md:h-8',
    },
  },
  defaultVariants: {
    variant: 'light',
  },
});

export interface PlayPauseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isPlaying?: boolean;
  asChild?: boolean;
}

const PlayPause = React.forwardRef<HTMLButtonElement, PlayPauseProps>(
  (
    { className, variant, isPlaying = false, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const t = useTranslations('navigation');

    return (
      <Comp
        ref={ref}
        className={cn(
          buttonVariants({
            variant,
            isDisabled: props.disabled,
          }),
          className
        )}
        title={isPlaying ? t('pause') : t('play')}
        aria-label={isPlaying ? t('pause') : t('play')}
        {...props}
      >
        {isPlaying ? (
          <IconPause className={cn(iconVariants({ variant }))} />
        ) : (
          <IconPlay className={cn(iconVariants({ variant }))} />
        )}
      </Comp>
    );
  }
);

PlayPause.displayName = 'PlayPause';

export default PlayPause;
