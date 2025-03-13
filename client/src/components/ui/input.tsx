import { Eye, EyeOff } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';

import { cn } from '@/lib/utils/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          className={cn(
            'flex h-12 w-full rounded-2xl border-2 border-transparent bg-grey-light px-4 py-3 paragraph-2 file:items-center file:border-0 file:bg-transparent file:paragraph-2 placeholder:text-opacity-50 focus-visible:border-grey-dark focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            isPassword ? 'pr-10' : '',
            className
          )}
          type={isPassword && showPassword ? 'text' : type}
          {...props}
        />
        {isPassword && (
          <button
            className="absolute inset-y-0 right-1 flex items-center justify-center px-2"
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
    );
  }
);

Input.displayName = 'Input';

export { Input };
