import { Button } from '@/components/ui/button';

export default function DeliveryMethodButton({
  title,
  isActive,
  onClick,
}: {
  title: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      isSelected={isActive}
      size={'default'}
      transparentVariant={'black'}
      typography={'button1'}
      variant={'transparent'}
      onClick={onClick}
    >
      {title}
    </Button>
  );
}
