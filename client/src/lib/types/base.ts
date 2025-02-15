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

export type { ImageProps, LinkProps };
