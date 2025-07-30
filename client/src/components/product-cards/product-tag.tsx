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
        'flex min-w-20 justify-center rounded-xl bg-red-deep px-1.5 py-0.5 sm:min-w-28 sm:rounded-2xl sm:px-2 sm:py-1.5',
        className
      )}
      {...props}
    >
      <p className="text-xs font-medium capitalize text-white sm:text-sm">
        {tag}
      </p>
    </div>
  );
}
