import { DesktopMenu, MobileMenu } from '@/components/nav-bar/components';
import { navMenu, placeholderCart } from '@/data/dummy-data';

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 flex h-nav-height w-full bg-black">
      <MobileMenu
        cartCount={placeholderCart.length}
        className="md:hidden"
        menuItems={navMenu}
      />
      <DesktopMenu
        cart={placeholderCart}
        className="hidden md:flex"
        menuItems={navMenu}
      />
    </nav>
  );
}
