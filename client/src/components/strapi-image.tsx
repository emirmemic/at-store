import Image from 'next/image';

import { STRAPI_BASE_URL } from '@/lib/constants';

interface StrapiImageProps {
  src: string;
  alt: string | null;
  height?: number;
  width?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
}

export function getStrapiMedia(url: string | null) {
  if (!url) return null;
  if (url.startsWith('data:')) return url;
  if (url.startsWith('http') || url.startsWith('//')) return url;
  return `${STRAPI_BASE_URL}${url}`;
}

export function StrapiImage({
  src,
  alt,
  className,
  ...rest
}: Readonly<StrapiImageProps>) {
  const imageUrl = getStrapiMedia(src);
  if (!imageUrl) return null;
  return (
    <Image
      alt={alt ?? 'No alternative text provided'}
      className={className}
      src={imageUrl}
      {...rest}
    />
  );
}
