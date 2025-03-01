'use client';

import { NavLinkItem } from '@/components/nav-bar/components/nav-link-item';
import { LinkProps } from '@/lib/types';

export default function NavLinks() {
  const navLinks: Array<LinkProps> = [
    {
      id: 1,
      label: 'Mac',
      href: '/',
      isExternal: false,
    },
    {
      id: 1,
      label: 'Ipad',
      href: '/Ipad',
      isExternal: false,
    },
    {
      id: 1,
      label: 'Iphone',
      href: '/Iphone',
      isExternal: false,
    },
    {
      id: 1,
      label: 'Watch',
      href: '/Watch',
      isExternal: false,
    },
    {
      id: 1,
      label: 'AirPods',
      href: '/AirPods',
      isExternal: false,
    },
    {
      id: 1,
      label: 'Dodaci',
      href: '/Dodaci',
      isExternal: false,
    },
    {
      id: 1,
      label: 'Promo',
      href: '/Promo',
      isExternal: false,
    },
    {
      id: 1,
      label: 'Podrska',
      href: '/contact',
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
