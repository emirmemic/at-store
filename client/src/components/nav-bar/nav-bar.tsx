'use client';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';

import {
  IconCart,
  IconLogout,
  IconSearch,
  IconUser,
} from '@/components/nav-bar/icons';
import { Button } from '@/components/ui/button';

import Logo from './components/nav-bar-logo';
import NavLinks from './components/nav-links';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="md:paragraph-3 heading-4 fixed w-full bg-black px-2 py-1">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Logo />
        {/* Desktop Menu */}
        <div className="hidden md:flex">
          <NavLinks />
        </div>
        {/* navbar-icons */}
        <div className="hidden items-center justify-center gap-2 md:flex">
          <IconSearch />
          <IconUser />
          <IconCart />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-inherit text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col bg-black md:hidden">
          <div className="flex items-center justify-between px-6 pt-4">
            <div className="flex size-14 rounded-full bg-blue-500 text-white" />
            {/* nav-bar-icon */}
            <div className="flex gap-7">
              <IconSearch />
              <IconUser />
              <IconCart />
            </div>
          </div>
          <div>
            <NavLinks />
          </div>

          <div className="flex items-center justify-center gap-2 pb-8 pt-10 text-white">
            Odjavi se <IconLogout />
          </div>
        </div>
      )}
    </nav>
  );
}
