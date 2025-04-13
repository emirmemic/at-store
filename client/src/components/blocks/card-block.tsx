import { Slot } from '@radix-ui/react-slot';

import { Icon } from '@/lib/types';
import { cn } from '@/lib/utils/utils';

import { Button } from '../ui/button';

interface CardBlockProps {
  title: string;
  bgColor?: string;
  className?: string;
  iconClasses?: string;
  Icon: Icon;
  onClick?: () => void;
  asChild?: boolean;
  children?: React.ReactNode;
}

export default function CardBlock(props: Readonly<CardBlockProps>) {
  const {
    title,
    bgColor = 'bg-blue-steel',
    onClick,
    className,
    Icon,
    iconClasses = 'w-24 h-24',
    asChild = false,
  } = props;
  const Component = asChild ? Slot : Button;

  return (
    <Component onClick={onClick}>
      <span
        className={cn(
          'flex flex-col items-center gap-5 rounded-2xl px-16 py-10',
          className,
          bgColor
        )}
      >
        <Icon className={iconClasses} color="white" />
        <span className="flex grow items-center whitespace-normal text-center text-white heading-4">
          {title}
        </span>
      </span>
    </Component>
  );
}
