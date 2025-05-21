import { CURRENCY } from '@/lib/constants';
import { formatPrice } from '@/lib/formatters';

interface PriceProps {
  value: number;
  className?: string;
}

export default function Price({ value, className }: PriceProps) {
  return (
    <span className={className}>
      {formatPrice(value)} {CURRENCY}
    </span>
  );
}
