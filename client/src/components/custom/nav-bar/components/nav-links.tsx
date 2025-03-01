'use client';
import { LinkProps } from '@/lib/types';

import { NavLinkItem } from '../../header/nav-link-item';

export default function NavMenu() {
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
    <nav className="flex flex-col justify-center gap-4 md:flex-row">
      {navLinks.map((link, index) => (
        <NavLinkItem key={index} href={link.href}>
          {link.label}
        </NavLinkItem>
      ))}
    </nav>
  );
}
