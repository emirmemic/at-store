import { STRAPI_BASE_URL } from '@/lib/constants';

interface StrapiVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string;
  className?: string;
  captionsUrl?: string;
}

export function getStrapiMedia(url: string | null) {
  if (!url) return null;
  if (url.startsWith('data:')) return url;
  if (url.startsWith('http') || url.startsWith('//')) return url;
  return `${STRAPI_BASE_URL}${url}`;
}

export function StrapiVideo({
  src,
  poster,
  className,
  ...props
}: Readonly<StrapiVideoProps>) {
  const videoUrl = getStrapiMedia(src);
  const posterUrl = poster ? getStrapiMedia(poster) : undefined;
  if (!videoUrl) return null;

  return (
    <video
      className={className}
      poster={posterUrl ?? undefined}
      preload="metadata"
      src={videoUrl}
      {...props}
    >
      Your browser does not support the video tag.
    </video>
  );
}
