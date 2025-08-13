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

  const storageValue = (str: string) => {
    const match = str.match(/(\d+)(GB|TB)/i);
    if (!match) return 0;
    const value = parseInt(match[1], 10);
    const unit = match[2].toUpperCase();
    return unit === 'TB' ? value * 1024 : value;
  };

  const sortedOptions = [...options].sort(
    (a, b) => storageValue(a.name) - storageValue(b.name)
  );

  return (
    <div>
      <p className="mb-4 paragraph-2">{title}</p>
      <div className="flex flex-wrap items-center gap-2">
        {sortedOptions.map((option) =>
          option.hex ? (
            <Button
              key={option.value}
              aria-label={option.name}
              disabled={!isAvailable(option) && latestClicked?.key !== itemKey}
              isSelected={selectedOptions[itemKey] === option.value}
              size="color"
              style={{ backgroundColor: option.hex }}
              title={option.name}
              typography="button2"
              variant="color"
              onClick={() => selectOption(itemKey, option.value)}
            />
          ) : (
            <button
              key={option.value}
              disabled={!isAvailable(option) && latestClicked?.key !== itemKey}
              onClick={() =>
                isAvailable(option) || latestClicked?.key === itemKey
                  ? selectOption(itemKey, option.value)
                  : null
              }
              className={`w-full max-w-xs rounded-md border px-4 py-3 text-left text-sm ${
                selectedOptions[itemKey] === option.value
                  ? 'border-blue-500 text-black'
                  : !isAvailable(option) && latestClicked?.key !== itemKey
                    ? 'cursor-not-allowed border border-gray-300 text-gray-400 opacity-50'
                    : 'border border-gray-300 text-black hover:border-gray-400'
              }`}
            >
              {option.name}
            </button>
          )
        )}
      </div>
    </div>
  );
}
