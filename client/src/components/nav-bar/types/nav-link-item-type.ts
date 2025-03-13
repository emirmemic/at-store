import { Pathname } from '@/i18n/routing';

interface LinkProps {
  id: number;
  label: string;
  href: Pathname;
  isExternal: boolean;
  subLinks?: Array<LinkProps>;
}

export type { LinkProps };
