'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import { useState } from 'react';

import { AnimateAppearance } from '@/components/transitions';
import { cn } from '@/lib/utils/utils';

import InputErrorMessage from './input-error-message';

interface InputProps extends React.ComponentProps<'input'> {
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, errorMessage, ...props }, ref) => {
    const t = useTranslations('input');
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';

    return (
      <div className="flex flex-col gap-2">
        <div className="relative w-full">
          <input
            ref={ref}
            className={cn(
              'transition-border flex h-12 w-full rounded-2xl border border-transparent bg-grey-extra-light px-4 py-3 text-black duration-300 paragraph-2 file:items-center file:border-0 file:bg-transparent file:paragraph-2 placeholder:text-opacity-50 focus-visible:border-grey-light focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
              isPassword ? 'pr-10' : '',
              errorMessage && 'border-red-deep text-red-deep',
              className
            )}
            type={isPassword && showPassword ? 'text' : type}
            {...props}
          />
          {isPassword && (
            <button
              aria-label={showPassword ? t('hidePassword') : t('showPassword')}
              className="absolute inset-y-0 right-1 flex items-center justify-center px-2"
              title={showPassword ? t('hidePassword') : t('showPassword')}
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-grey-dark" />
              ) : (
                <Eye className="h-5 w-5 text-grey-dark" />
              )}
            </button>
          )}
        </div>
        <AnimateAppearance isVisible={Boolean(errorMessage)}>
          <InputErrorMessage errorMessage={errorMessage} />
        </AnimateAppearance>
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
