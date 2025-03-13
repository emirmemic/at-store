'use client';

import { useState } from 'react';

import {
  IconCart,
  IconClose,
  IconSearch,
  IconUser,
} from '@/components/nav-bar/icons';
import { Button } from '@/components/ui/button';

import { IconMenu } from './icons/menu';
import Logo from './nav-bar-logo';
import NavLinks from './nav-links';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-black px-3 py-2 md:px-3.5">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Logo />
        <div className="hidden md:flex">
          <NavLinks />
        </div>
        {/* navbar-icons */}
        <div className="hidden items-center justify-center gap-2 md:flex">
          <Button>
            <IconSearch />
          </Button>
          <Button>
            <IconUser />
          </Button>
          <Button>
            <IconCart />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="size-6 md:hidden">
          <Button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <IconClose /> : <IconMenu />}
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
              <Button onClick={() => alert('hello')}>
                <IconSearch />
              </Button>
              <Button>
                <IconUser />
              </Button>
              <Button>
                <IconCart />
              </Button>
            </div>
          </div>
          <div>
            <NavLinks />
          </div>

          <div className="flex items-center justify-center gap-2 pb-8 pt-10 text-white heading-4">
            <Button>
              Prijavi se
              <IconUser />
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
