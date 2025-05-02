import type { ComponentProps } from 'react';

import { Link } from '@/i18n/routing';

type LinkHref = ComponentProps<typeof Link>['href'];

interface FooterSectionType {
  id: string;
  title: string;
  items: { id: string; name: string; path: LinkHref; target?: string }[];
}

export type { FooterSectionType, LinkHref };
