import { CURRENCY } from '@/lib/constants';

interface PriceProps {
  value: number;
  className?: string;
}

export default function Price({ value, className }: PriceProps) {
  const formatter = new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <span className={className}>
      {formatter.format(value)} {CURRENCY}
    </span>
  );
}
