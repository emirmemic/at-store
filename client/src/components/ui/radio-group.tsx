'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as React from 'react';

import { AnimateAppearance } from '@/components/transitions';
import { cn } from '@/lib/utils/utils';

import { IconCheck } from '../icons';

import InputErrorMessage from './input-error-message';

interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  errorMessage?: string;
}

const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, errorMessage, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-2">
      <RadioGroupPrimitive.Root
        className={cn('grid gap-2', className)}
        {...props}
        ref={ref}
      />
      <AnimateAppearance isVisible={Boolean(errorMessage)}>
        <InputErrorMessage errorMessage={errorMessage} />
      </AnimateAppearance>
    </div>
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label?: string;
  labelClassName?: string;
  errorMessage?: string;
  children?: React.ReactNode;
}

const RadioGroupItem = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, labelClassName, children, ...props }, ref) => {
  return (
    <label
      className={cn(
        'inline-flex cursor-pointer items-center gap-2',
        labelClassName
      )}
    >
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(
          'peer flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border border-black focus-visible:border-grey-dark focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-black data-[state=checked]:text-white data-[state=checked]:shadow-sm',
          className
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center text-current">
          <IconCheck className="h-4 w-4" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      {children}
    </label>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
