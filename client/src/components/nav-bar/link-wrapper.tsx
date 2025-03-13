import React, { useState } from 'react';

import { LinkProps } from '@/lib/types';

import { PopupContentItem } from './popup-content-item';

interface LinkWrapperProps {
  children: React.ReactNode;
  subLinks?: Array<LinkProps>;
}
export default function LinkWrapper({
  children,
  subLinks = [],
}: Readonly<LinkWrapperProps>) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(true)}
      className="relative"
    >
      {children}

      {isHovered && (
        <>
          <div className="absolute flex gap-10 rounded-2xl bg-white p-5 pt-7">
            {subLinks.map((link) => (
              <PopupContentItem key={link.id} {...link} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
