'use client';
import { useEffect, useRef } from 'react';

import { IconSearch } from '@/components/nav-bar/icons';
import { cn } from '@/lib/utils/utils';

const SearchInput = ({
  className,
  ...props
}: React.ComponentProps<'input'>) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        className={cn(
          'flex h-12 w-full rounded-2xl border-2 border-transparent bg-white py-3 pl-14 pr-4 text-black shadow-standard-black paragraph-2 placeholder:text-opacity-50 focus-visible:border-grey-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
      <IconSearch className="absolute left-4 top-1/2 h-8 w-8 -translate-y-1/2 text-grey-darkest" />
    </div>
  );
};

export default SearchInput;
