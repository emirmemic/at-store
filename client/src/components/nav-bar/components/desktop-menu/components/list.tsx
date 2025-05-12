'use client';

import { PopupType, NavMenuItem } from '@/components/nav-bar/types';

import ListItem from './list-item';

interface DesktopListProps {
  menuItems: NavMenuItem[];
  className?: string;
  activePopup: PopupType;
  setActivePopup: (popup: PopupType) => void;
}

export default function DesktopList({
  menuItems,
  activePopup,
  setActivePopup,
}: DesktopListProps) {
  return (
    <ul className="flex h-full items-center gap-1 lg:gap-4">
      {menuItems.map((menuItem) => (
        <ListItem
          key={menuItem.id}
          activePopup={activePopup}
          menuItem={menuItem}
          setActivePopup={setActivePopup}
        ></ListItem>
      ))}
    </ul>
  );
}
