import React from 'react';

import { cn } from '@/lib/utils/utils';

export default function CardContainer({
  children,
  className = '',
  bgColor = 'bg-grey-almost-white',
}: {
  children: React.ReactNode;
  className?: string;
  bgColor?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-grey-extra-light shadow-standard-black',
        bgColor,
        className
      )}
    >
      {children}
    </div>
  );
}
