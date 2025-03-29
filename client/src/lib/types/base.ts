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
  filled?: boolean;
}

type Icon = React.ComponentType<IconProps>;

export type { Icon, IconProps, ImageProps };
