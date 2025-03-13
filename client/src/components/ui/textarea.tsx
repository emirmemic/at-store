import * as React from 'react';

import { cn } from '@/lib/utils/utils';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-32 w-full rounded-2xl border-2 border-transparent bg-grey-light px-4 py-3 paragraph-2  placeholder:text-opacity-50 focus-visible:outline-none focus-visible:border-grey-dark disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
