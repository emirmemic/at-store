import { Pathname } from '@/i18n/routing';

interface LinkProps {
  id: number;
  label: string;
  href: Pathname;
  isExternal: boolean;
}

interface ImageProps {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
}

interface IconProps extends React.SVGAttributes<SVGElement> {
  children?: React.ReactNode;
  size?: number;
  className?: string;
}

export type { ImageProps, LinkProps, IconProps };
