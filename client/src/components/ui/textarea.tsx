import * as React from 'react';

import { AnimateAppearance } from '@/components/transitions';
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
            'transition-border flex min-h-32 w-full rounded-2xl border border-transparent bg-grey-extra-light px-4 py-3 duration-300 paragraph-2 placeholder:text-opacity-50 focus-visible:border-grey-light focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            className,
            errorMessage && 'border-red-deep text-red-deep'
          )}
          {...props}
        />
        <AnimateAppearance isVisible={Boolean(errorMessage)}>
          <InputErrorMessage errorMessage={errorMessage} />
        </AnimateAppearance>
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
