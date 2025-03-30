import { Pathname } from '@/i18n/routing';
import { Icon } from '@/lib/types';

interface AccountMenu {
  id: number;
  label: string;
  href: Pathname;
  Icon: Icon;
}

export type { AccountMenu };
