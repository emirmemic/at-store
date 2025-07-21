import { AvailableOption, SelectedOptionKey } from '../types';

import { Button } from '@/components/ui/button';
import { useProductVariants } from '@/app/providers';

interface OptionsItemProps {
  options: AvailableOption[];
  title: string;
  itemKey: SelectedOptionKey;
  availableOnes: AvailableOption[];
}
export default function OptionsItem({
  options,
  title,
  itemKey,
  availableOnes,
}: OptionsItemProps) {
  const { selectOption, latestClicked, selectedOptions } = useProductVariants();
  const isAvailable = (option: AvailableOption) =>
    availableOnes.some(
      (availableOption) => availableOption.value === option.value
    );

  return (
    <div>
      <p className="mb-4 paragraph-2">{title}</p>
      <div className="flex flex-wrap items-center gap-2">
        {options?.map((option) => (
          <div key={option.value}>
            <Button
              aria-label={option.name}
              disabled={!isAvailable(option) && latestClicked?.key !== itemKey}
              isSelected={selectedOptions[itemKey] === option.value}
              size={option.hex ? 'color' : 'md'}
              style={option.hex ? { backgroundColor: option.hex } : {}}
              title={option.name}
              typography={'button2'}
              variant={option.hex ? 'color' : 'productVariant'}
              onClick={() => selectOption(itemKey, option.value)}
            >
              {!option.hex && <span>{option.name}</span>}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
