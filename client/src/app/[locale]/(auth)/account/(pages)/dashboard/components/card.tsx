import { CardContainer } from '../../../components';

interface CardProps {
  className?: string;
  title: string;
  count: number;
  subtitle: string;
}

export default function Card({
  className = '',
  title,
  count,
  subtitle,
}: CardProps) {
  return (
    <CardContainer
      className={`flex h-full w-full flex-col items-center justify-between gap-2 border border-blue-light bg-blue px-2.5 py-6 text-center text-white md:py-8 ${className}`}
    >
      <p className="paragraph-2">{title}</p>
      <p className="heading-2 lg:display">{count}</p>
      <p className="paragraph-2">{subtitle}</p>
    </CardContainer>
  );
}
