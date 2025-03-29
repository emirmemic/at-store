import React from 'react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import { IconAvatar } from '../icons';

interface teamCardProps {
  name: { firstName: string; surname: string };
  role: string;
  id: number;
}
export default function TeamCard(props: teamCardProps) {
  const { name, role } = props;
  return (
    <div className="flex w-56 flex-col items-center gap-4 text-center">
      <Avatar className="h-fit w-fit">
        <AvatarFallback>
          <IconAvatar></IconAvatar>
        </AvatarFallback>
      </Avatar>
      <p className="heading-4 md:heading-3">
        {name.firstName}
        <span className="block">{name.surname}</span>
      </p>
      <p className="paragraph-2 md:paragraph-1">{role}</p>
    </div>
  );
}
