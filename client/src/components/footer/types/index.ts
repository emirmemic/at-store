import { Pathname } from '@/i18n/routing';

interface FooterSectionType {
  id: string;
  title: string;
  items: { name: string; path: Pathname; target?: string }[];
}
export type { FooterSectionType };
