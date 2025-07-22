import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import { AvatarImage } from '@radix-ui/react-avatar';
import { IconAvatar } from '../icons';
import React from 'react';
import { TeamMember } from '../about/types';
import { getStrapiMedia } from '@/components/strapi/components/strapi-image';

export default function TeamCard(member: TeamMember) {
  const { firstName, surname, image, position } = member;
  const imageUrl = getStrapiMedia(image?.url || '') || '';
  return (
    <div className="flex w-56 flex-col items-center text-center">
      <Avatar className="mb-3 h-32 w-32 md:h-36 md:w-36">
        <AvatarImage alt={image?.alternativeText || ''} src={imageUrl} />
        <AvatarFallback>
          <IconAvatar className="h-32 w-32 md:h-36 md:w-36" />
        </AvatarFallback>
      </Avatar>
      <p className="mb-2 heading-4 md:heading-3">
        <span>{firstName}</span>
        <br />
        <span>{surname}</span>
      </p>
      <p className="paragraph-2 md:paragraph-2">{position}</p>
    </div>
  );
}
