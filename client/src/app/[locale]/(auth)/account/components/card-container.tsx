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
        'border-gray/20 rounded-2xl border bg-white/10 shadow-md backdrop-blur-md',
        bgColor,
        className
      )}
    >
      {children}
    </div>
  );
}
