import { Icon } from '@/lib/types/base';
import { cn } from '@/lib/utils/utils';

import { Button } from '../ui/button';

interface CardBlockProps {
  title: string;
  bgColor?: string;
  className?: string;
  Icon: Icon;
  onClick?: () => void;
}

export default function CardBlock(props: Readonly<CardBlockProps>) {
  const { title, bgColor = 'bg-blue-steel', onClick, className, Icon } = props;
  return (
    <Button className={cn(!onClick && 'cursor-default')} onClick={onClick}>
      <span
        className={cn(
          'flex w-full flex-col items-center gap-5 rounded-2xl px-3 py-10',
          className,
          bgColor
        )}
      >
        <Icon color="white" height={160} width={180} />
        <span className="whitespace-normal text-center text-white heading-3">
          {title}
        </span>
      </span>
    </Button>
  );
}
