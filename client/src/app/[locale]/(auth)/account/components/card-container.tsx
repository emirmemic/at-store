import React from 'react';

import { cn } from '@/lib/utils/utils';

export default function CardContainer({
  children,
  className = '',
  bgColor = 'bg-white/10',
}: {
  children: React.ReactNode;
  className?: string;
  bgColor?: string;
}) {
  return (
    <div
      className={cn(
        'border-gray/20 rounded-xl border bg-white/10 p-3 text-xs shadow-md backdrop-blur-md sm:p-4 sm:text-sm md:p-5',
        bgColor,
        className
      )}
    >
      {children}
    </div>
  );
}
