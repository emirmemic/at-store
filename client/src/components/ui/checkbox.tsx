'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as React from 'react';

import { IconCheck } from '@/components/icons';
import { AnimateAppearance } from '@/components/transitions';
import { cn } from '@/lib/utils/utils';

import InputErrorMessage from './input-error-message';

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string;
  labelClassName?: string;
  errorMessage?: string;
  children?: React.ReactNode;
}
const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, errorMessage, labelClassName, children, ...props }, ref) => (
  <div className="flex flex-col gap-2">
    <label className={labelClassName}>
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          'peer h-4 w-4 shrink-0 rounded-[4px] border border-black focus-visible:border-grey-dark focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-black data-[state=checked]:text-white data-[state=checked]:shadow-sm',
          className,
          errorMessage ? 'border-red-deep' : ''
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          className={cn('flex items-center justify-center text-current')}
        >
          <IconCheck size={15} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {children}
    </label>
    <AnimateAppearance isVisible={Boolean(errorMessage)}>
      <InputErrorMessage errorMessage={errorMessage} />
    </AnimateAppearance>
  </div>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
