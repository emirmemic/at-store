import React, { ReactNode } from 'react';

import { usePreventScroll } from '@/lib/hooks';

interface BlurProps {
  children: ReactNode;
  isActive?: boolean;
}

export default function Blur({ children, isActive = true }: BlurProps) {
  usePreventScroll();

  return (
    <div className="relative">
      {isActive && (
        <div
          className="fixed inset-0 z-10 bg-black/20 backdrop-blur-[1px]"
          onClick={(e) => e.stopPropagation()}
        />
      )}
      <div className="relative z-20">{children}</div>
    </div>
  );
}
