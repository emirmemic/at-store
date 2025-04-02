'use client';

import { useTranslations } from 'next-intl';
import * as React from 'react';

import { AnimateAppearance } from '@/components/transitions';
import { cn } from '@/lib/utils/utils';

import InputErrorMessage from './input-error-message';

interface CounterInputProps {
  errorMessage?: string;
  className?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
}

const CounterInput = React.forwardRef<HTMLDivElement, CounterInputProps>(
  (
    {
      errorMessage,
      className,
      value: propValue = 0,
      min = 0,
      max,
      step = 1,
      onChange,
    },
    ref
  ) => {
    const t = useTranslations('common');
    const [internalValue, setInternalValue] = React.useState(propValue);

    const handleChange = (newValue: number) => {
      setInternalValue(newValue);
      onChange?.(newValue);
    };

    /**
     * Increase the internal value by the step. If a maximum value is set, ensure we do not exceed it. Update the value using the handleChange function.
     */
    const handleIncrement = () => {
      let newValue = internalValue + step;
      if (max !== undefined) {
        newValue = Math.min(newValue, max);
      }
      handleChange(newValue);
    };

    /**
     * Decrease the internal value by the step. If a minimum value is set, ensure we do not go below it. Update the value using the handleChange function.
     */
    const handleDecrement = () => {
      let newValue = internalValue - step;
      if (min !== undefined) {
        newValue = Math.max(newValue, min);
      }
      handleChange(newValue);
    };

    /**
     * Update the internal value whenever the prop value changes.
     * This is useful when the component is controlled by a parent component.
     */
    React.useEffect(() => {
      setInternalValue(propValue);
    }, [propValue]);

    return (
      <div ref={ref} className="flex flex-col gap-2">
        <div
          className={cn(
            'inline-flex h-8 w-fit items-center gap-1 rounded-2xl border border-grey-light transition-colors duration-300 lg:h-11',
            errorMessage && 'border-red-deep text-red-deep',
            className
          )}
        >
          <button
            aria-label={t('decrement')}
            className="px-2 transition-all duration-100 heading-5 hover:text-grey-medium active:scale-95 disabled:opacity-50 lg:heading-4"
            disabled={min !== undefined && internalValue <= min}
            type="button"
            onClick={handleDecrement}
          >
            -
          </button>

          <input
            className="w-12 bg-transparent text-center outline-none heading-5 lg:heading-4"
            max={max}
            min={min}
            step={step}
            type="number"
            value={internalValue}
            onChange={(e) => handleChange(Number(e.target.value))}
          />

          <button
            aria-label={t('increment')}
            className="px-2 transition-all duration-100 heading-5 hover:text-grey-medium active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 lg:heading-4"
            disabled={max !== undefined && internalValue >= max}
            type="button"
            onClick={handleIncrement}
          >
            +
          </button>
        </div>
        <AnimateAppearance isVisible={Boolean(errorMessage)}>
          <InputErrorMessage errorMessage={errorMessage} />
        </AnimateAppearance>
      </div>
    );
  }
);

CounterInput.displayName = 'CounterInput';

export { CounterInput };
