import { Button } from '@/components/ui/button';
import { Icon } from '@/lib/types';

import CardContainer from './card-container';

interface EmptyContentProps {
  emptyText: string;
  Icon: Icon;
  buttonText: string;
  buttonAction: () => void;
}

export default function EmptyContent({
  emptyText,
  Icon,
  buttonText,
  buttonAction,
}: EmptyContentProps) {
  return (
    <CardContainer className="flex h-full w-full flex-col items-center gap-14 bg-white py-8 md:py-12">
      <h2 className="bullet-heading-2">{emptyText}</h2>
      <Icon className="size-[160px] md:size-[180px] lg:size-[200px]" />
      <Button
        size={'lg'}
        typography={'button1'}
        variant={'filled'}
        onClick={buttonAction}
      >
        {buttonText}
      </Button>
    </CardContainer>
  );
}
