interface ImageProps {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
}

interface ProductProps {
  id: number;
  productId: string;
  name: string;
  description?: string;
  image: ImageProps;
}

interface IconProps extends React.SVGAttributes<SVGElement> {
  children?: React.ReactNode;
  size?: number;
  className?: string;
  filled?: boolean;
}

type Icon = React.ComponentType<IconProps>;

export type { Icon, IconProps, ImageProps, ProductProps };
