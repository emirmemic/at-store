import * as React from 'react';

import { cn } from '@/lib/utils/utils';

import InputErrorMessage from './input-error-message';

interface TextareaProps extends React.ComponentProps<'textarea'> {
  errorMessage?: string;
}
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, errorMessage, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <textarea
          ref={ref}
          className={cn(
            'flex min-h-32 w-full rounded-2xl border border-transparent bg-grey-extra-light px-4 py-3 paragraph-2 placeholder:text-opacity-50 focus-visible:border-grey-light focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            className,
            errorMessage && 'border-red-deep text-red-deep'
          )}
          {...props}
        />
        {errorMessage && <InputErrorMessage errorMessage={errorMessage} />}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
