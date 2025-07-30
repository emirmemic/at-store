import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils/utils';

interface DescriptionProps {
  className?: string;
  items: string[];
}

export default function Description({ className, items }: DescriptionProps) {
  const t = useTranslations('footer');
  return (
    <div className={cn('py-4', className)}>
      {items.map((key, index) => (
        <p
          key={index}
          className={cn(
            'footer-text',
            index === 0 || index === 4
              ? 'mb-2 border-b border-gray-300 pb-2'
              : ''
          )}
        >
          {t(key)}
        </p>
      ))}
    </div>
  );
}
