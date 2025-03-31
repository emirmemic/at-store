import { NavMenuItem } from '@/components/nav-bar/types';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils/utils';

interface MobileMenuProps {
  menuItems: NavMenuItem[];
  className?: string;
  closeMenu: () => void;
}
export default function MobileList({
  menuItems,
  className,
  closeMenu,
}: MobileMenuProps) {
  return (
    <div className={cn('flex flex-col items-center gap-1', className)}>
      {menuItems.map((item) => (
        <Link
          key={item.id}
          className="py-1 transition-all paragraph-1 hover:text-grey-medium active:scale-95"
          href={item.href}
          onClick={closeMenu}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
