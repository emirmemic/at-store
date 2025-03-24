import { DesktopMenu, MobileMenu } from '@/components/nav-bar/components';
import { navMenu, placeholderCart } from '@/data/dummy-data';
import { getUser } from '@/lib/services';

export default async function Navbar() {
  const user = await getUser();
  return (
    <nav className="fixed top-0 z-50 flex h-nav-height w-full bg-black">
      <MobileMenu
        cartCount={placeholderCart.length}
        className="md:hidden"
        menuItems={navMenu}
        user={user}
      />
      <DesktopMenu
        cart={placeholderCart}
        className="hidden md:flex"
        menuItems={navMenu}
        user={user}
      />
    </nav>
  );
}
