import { CardContainer } from '../../../components';

interface CardProps {
  className?: string;
  title: string;
  count: number;
  subtitle: string;
}

function TextItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return <p className={`text-white ${className}`}>{children}</p>;
}

export default function Card({
  className = '',
  title,
  count,
  subtitle,
}: CardProps) {
  return (
    <CardContainer
      className={`flex h-full w-full flex-col items-center justify-between gap-2 border border-blue-light bg-blue px-2.5 py-6 text-center md:py-8 ${className}`}
    >
      <TextItem className="paragraph-2">{title}</TextItem>
      <TextItem className="heading-2 lg:display">{count}</TextItem>
      <TextItem className="paragraph-2">{subtitle}</TextItem>
    </CardContainer>
  );
}
