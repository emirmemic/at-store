import { IconValidationError } from '@/components/icons';
import { cn } from '@/lib/utils/utils';

interface PropType {
  errorMessage?: string;
  className?: string;
}

export default function InputErrorMessage({
  errorMessage = '',
  className,
}: Readonly<PropType>) {
  return (
    <p
      className={cn(
        'flex items-center gap-3 text-red-deep paragraph-2',
        className
      )}
    >
      <IconValidationError className="shrink-0" />
      <span>{errorMessage}</span>
    </p>
  );
}
