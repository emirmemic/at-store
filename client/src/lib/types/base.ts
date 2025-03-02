interface LinkProps {
  id: number;
  label: string;
  href: string;
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
