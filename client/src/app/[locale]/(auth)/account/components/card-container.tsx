import React from 'react';

export default function CardContainer({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border-grey-extra-light bg-grey-almost-white shadow-standard-black ${className}`}
    >
      {children}
    </div>
  );
}
