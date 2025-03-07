'use client';

import { NavLinkItem } from '@/components/nav-bar/nav-link-item';
import { LinkProps } from '@/lib/types';

export default function NavLinks() {
  const navLinks: Array<LinkProps> = [
    {
      id: 1,
      label: 'Home',
      href: '/',
      isExternal: false,
    },
    {
      id: 2,
      label: 'login',
      href: '/login',
      isExternal: false,
    },
    {
      id: 3,
      label: 'account',
      href: '/account',
      isExternal: false,
    },
    {
      id: 4,
      label: 'about',
      href: '/about',
      isExternal: false,
    },
    {
      id: 5,
      label: 'global-component',
      href: '/global-components',
      isExternal: false,
    },
  ];
  return (
    <nav className="flex flex-col items-center justify-center gap-4 md:flex-row">
      {navLinks.map((link, index) => (
        <NavLinkItem key={index} href={link.href}>
          {link.label}
        </NavLinkItem>
      ))}
    </nav>
  );
}
