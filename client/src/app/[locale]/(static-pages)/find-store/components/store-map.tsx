'use client';

import { cn } from '@/lib/utils/utils';
import { useState } from 'react';

interface StoreMapProps {
  src: string;
  width?: string;
  height?: string;
  allowFullScreen?: boolean;
  loading?: 'lazy' | 'eager';
  className?: string;
}

export default function StoreMap({
  src,
  width = '100%',
  height = '100%',
  allowFullScreen = true,
  loading = 'lazy',
  className,
}: StoreMapProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative h-full w-full">
      {/* Skeleton Loader */}
      {isLoading && (
        <div className="absolute inset-0 z-10 animate-pulse bg-neutral-100">
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              {/* Map Icon */}
              <svg
                className="h-16 w-16 text-neutral-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {/* Loading Text */}
              <div className="h-4 w-32 rounded bg-neutral-200"></div>
            </div>
          </div>
        </div>
      )}

      {/* Map iframe */}
      <iframe
        allowFullScreen={allowFullScreen}
        aria-hidden="false"
        className={cn('h-full w-full rounded-none', className)}
        height={height}
        loading={loading}
        onLoad={() => setIsLoading(false)}
        referrerPolicy="no-referrer-when-downgrade"
        src={src}
        style={{ border: 0 }}
        tabIndex={0}
        title="Google Maps Embed"
        width={width}
      ></iframe>
    </div>
  );
}
