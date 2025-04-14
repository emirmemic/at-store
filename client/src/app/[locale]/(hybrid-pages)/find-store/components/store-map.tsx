import { cn } from '@/lib/utils/utils';

interface StoreMapProps {
  src: string;
  width?: string;
  height?: string;
  allowFullScreen?: boolean;
  loading?: 'lazy' | 'eager';
  className?: string;
}
export default function StoreMap({
  src,
  width = '100%',
  height = '100%',
  allowFullScreen = true,
  loading = 'lazy',
  className,
}: StoreMapProps) {
  return (
    <iframe
      allowFullScreen={allowFullScreen}
      aria-hidden="false"
      className={cn('min-h-[520px]', className)}
      height={height}
      loading={loading}
      referrerPolicy="no-referrer-when-downgrade"
      src={src}
      style={{ border: 0 }}
      tabIndex={0}
      title="Google Maps Embed"
      width={width}
    ></iframe>
  );
}
