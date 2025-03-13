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
      subLinks: [
        {
          id: 7,
          label: 'Hello',
          href: '/login',
          isExternal: false,
        },
      ],
    },
    {
      id: 2,
      label: 'login',
      href: '/login',
      isExternal: false,
      subLinks: [
        {
          id: 7,
          label: 'Macbook Air',
          href: '/login',
          isExternal: false,
        },
        {
          id: 77,
          label: 'MacBook Pro',
          href: '/login',
          isExternal: false,
        },
        {
          id: 9,
          label: 'Mac Mini',
          href: '/login',
          isExternal: false,
        },
        {
          id: 321,
          label: 'IMac',
          href: '/login',
          isExternal: false,
        },
        {
          id: 42,
          label: 'Studio Display',
          href: '/login',
          isExternal: false,
        },
        {
          id: 421,
          label: 'Mac Studio',
          href: '/login',
          isExternal: false,
        },
        {
          id: 22,
          label: 'Mac Zasto Mac?',
          href: '/login',
          isExternal: false,
        },
      ],
    },
    {
      id: 3,
      label: 'account',
      href: '/account',
      isExternal: false,
      subLinks: [],
    },
    {
      id: 4,
      label: 'about',
      href: '/about',
      isExternal: false,
      subLinks: [],
    },
    {
      id: 5,
      label: 'global-component',
      href: '/global-components',
      isExternal: false,
      subLinks: [],
    },
  ];
  return (
    <nav className="flex flex-col items-center justify-center gap-4 md:flex-row">
      {navLinks.map((link) => (
        <NavLinkItem key={link.id} linkItem={link}>
          {link.label}
        </NavLinkItem>
      ))}
    </nav>
  );
}
