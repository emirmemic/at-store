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
        <p key={index} className="paragraph-5">
          {t(key)}
        </p>
      ))}
    </div>
  );
}
