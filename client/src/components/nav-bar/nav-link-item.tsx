'use client';

import { Link, usePathname } from '@/i18n/routing';
import { LinkProps } from '@/lib/types/base';
import { cn } from '@/lib/utils/utils';

import LinkWrapper from './link-wrapper';

function activeClassName({ isActive }: { isActive: boolean }) {
  return isActive ? 'text-grey' : 'text-white';
}

const linkStyle =
  'heading-4 flex cursor-pointer items-center transition-colors hover:text-grey md:navigation';

interface NavLinkItemProps {
  children: React.ReactNode;
  linkItem: LinkProps;
}
export function NavLinkItem(props: Readonly<NavLinkItemProps>) {
  const pathname = usePathname();
  const { children, linkItem } = props;
  const { isExternal, href, subLinks } = linkItem;

  const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
  return (
    <LinkWrapper subLinks={subLinks}>
      <Link
        prefetch
        className={cn(linkStyle, activeClassName({ isActive }))}
        href={href}
        rel={isExternal ? 'noopener noreferrer' : ''}
        target={isExternal ? '_blank' : '_self'}
      >
        {children}
      </Link>
    </LinkWrapper>
  );
}
