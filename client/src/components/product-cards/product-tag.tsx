import { cn } from '@/lib/utils/utils';

interface ProductTagProps {
  tag: string;
  className?: string;
}

export default function ProductTag({
  tag,
  className,
  ...props
}: ProductTagProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex min-w-28 justify-center rounded-2xl bg-red-deep px-2',
        className
      )}
      {...props}
    >
      <p className="capitalize text-white heading-5">{tag}</p>
    </div>
  );
}
