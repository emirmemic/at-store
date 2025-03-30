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
  pathClassName?: string;
  filled?: boolean;
}

type Icon = React.ComponentType<IconProps>;
type LocalizationKey = (key: string) => string;

export type { Icon, LocalizationKey, IconProps, ImageProps };
