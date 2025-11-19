import { AvailableOption, SelectedOptionKey } from '../types';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/utils';
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

  const shouldSortByStorage = ['memory', 'ram'].includes(itemKey);
  const sortedOptions = shouldSortByStorage
    ? [...options].sort((a, b) => storageValue(a.name) - storageValue(b.name))
    : options;
  const hasColorSwatches = sortedOptions.some((option) => !!option.hex);

  const getSubtitle = (title: string) => {
    if (!title) return '';
    const formattedTitle = title.toLocaleLowerCase().trim();

    if (formattedTitle === 'boja') return `Odaberi svoju omiljenu.`;
    if (formattedTitle === 'ram') return 'Koliko radne memorije trebaš?';
    if (formattedTitle === 'memorija')
      return 'Koliko prostora za pohranu trebaš?';
    return '';
  };

  return (
    <section className="rounded-[26px] bg-white/90 p-5 shadow-[0_24px_45px_rgba(15,15,15,0.05)] backdrop-blur">
      <div className="flex flex-row items-center gap-1">
        <span className="text-md text-black md:text-lg">
          {title}
          {getSubtitle(title) !== '' ? '.' : ''}
        </span>
        <span className="text-md text-gray-500 md:text-lg">
          {getSubtitle(title)}
        </span>
      </div>
      <div
        className={cn(
          'mt-8',
          hasColorSwatches
            ? 'flex flex-wrap items-center gap-6'
            : 'grid gap-3 sm:grid-cols-2'
        )}
      >
        {sortedOptions.map((option) => {
          const disabled =
            !isAvailable(option) && latestClicked?.key !== itemKey;
          const isSelected = selectedOptions[itemKey] === option.value;

          if (option.hex) {
            return (
              <div
                key={option.value}
                className="flex w-16 flex-col items-center justify-between gap-1 text-center md:w-24"
              >
                <Button
                  aria-label={option.name}
                  disabled={disabled}
                  isSelected={isSelected}
                  size="color"
                  style={{ backgroundColor: option.hex }}
                  title={option.name}
                  typography="button2"
                  variant="color"
                  className={cn(
                    'size-12 rounded-full border border-gray-200 transition-all duration-200',
                    isSelected && 'ring-2 ring-black ring-offset-2',
                    !disabled &&
                      !isSelected &&
                      'hover:ring-2 hover:ring-gray-400 hover:ring-offset-2',
                    disabled && 'opacity-40'
                  )}
                  onClick={() => selectOption(itemKey, option.value)}
                />
                <span className="mt-2 line-clamp-2 min-h-[2.5rem] text-xs font-medium leading-tight text-gray-600">
                  {option.name}
                </span>
              </div>
            );
          }

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isSelected}
              disabled={disabled}
              onClick={() =>
                isAvailable(option) || latestClicked?.key === itemKey
                  ? selectOption(itemKey, option.value)
                  : null
              }
              className={cn(
                'w-full rounded-2xl border border-gray-200 bg-white/90 px-5 py-4 text-left text-sm font-medium text-gray-900 transition-all duration-200',
                isSelected &&
                  'border-black shadow-[0_18px_35px_rgba(15,15,15,0.12)] ring-1 ring-black',
                !isSelected &&
                  !disabled &&
                  'hover:border-black/70 hover:shadow-[0_18px_35px_rgba(15,15,15,0.06)]',
                disabled &&
                  'cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400 line-through opacity-70'
              )}
            >
              <span className="block text-base font-semibold">
                {option.name}
              </span>
              {disabled && (
                <span className="mt-1 block text-xs text-gray-500">
                  Trenutno nedostupno
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
