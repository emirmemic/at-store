'use client';

import Image from 'next/image';

import { Link } from '@/i18n/routing';
import { LinkProps } from '@/lib/types/base';

export function PopupContentItem(linkItem: Readonly<LinkProps>) {
  const { isExternal, href } = linkItem;

  return (
    <Link
      href={href}
      className="curser-pointer text-black paragraph-4"
      prefetch
      target={isExternal ? '_blank' : '_self'}
      rel={isExternal ? 'noopener noreferrer' : ''}
    >
      <div>
        <Image
          src={'/assets/images/macbook-air.png'}
          width={37}
          height={30}
          alt="macbook-air"
        />
        {linkItem.label}
      </div>
    </Link>
  );
}
