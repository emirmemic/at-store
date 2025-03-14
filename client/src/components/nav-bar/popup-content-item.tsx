'use client';

import Image from 'next/image';

import { Link } from '@/i18n/routing';
import { LinkProps } from '@/lib/types/base';

export function PopupContentItem(linkItem: Readonly<LinkProps>) {
  const { isExternal, href } = linkItem;

  return (
    <Link
      prefetch
      className="curser-pointer text-black paragraph-4"
      href={href}
      rel={isExternal ? 'noopener noreferrer' : ''}
      target={isExternal ? '_blank' : '_self'}
    >
      <div>
        <Image
          alt="macbook-air"
          height={30}
          src={'/assets/images/macbook-air.png'}
          width={37}
        />
        {linkItem.label}
      </div>
    </Link>
  );
}
