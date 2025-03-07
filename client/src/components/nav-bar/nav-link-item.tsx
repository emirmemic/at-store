'use client';

import { Link, Pathname, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils/utils';

function activeClassName({ isActive }: { isActive: boolean }) {
  return isActive ? 'text-grey' : 'text-white';
}

const linkStyle =
  'heading-4 flex cursor-pointer items-center transition-colors hover:text-grey md:navigation';

interface NavLinkItemProps {
  href: Pathname;
  children: React.ReactNode;
  isExternal?: boolean;
}
export function NavLinkItem(props: Readonly<NavLinkItemProps>) {
  const pathname = usePathname();
  const { href, children, isExternal = false } = props;
  const isActive = pathname.includes(href);
  return (
    <Link
      prefetch
      className={cn(linkStyle, activeClassName({ isActive }))}
      href={href}
      rel={isExternal ? 'noopener noreferrer' : ''}
      target={isExternal ? '_blank' : '_self'}
    >
      {children}
    </Link>
  );
}
