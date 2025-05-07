import { NavMenuItem } from '@/lib/types';

export const matchesCategory = (
  item: NavMenuItem,
  categoryName: string
): boolean => {
  const check = (str?: string) =>
    str?.toLowerCase().includes(categoryName.toLowerCase()) ?? false;
  return check(item.name) || check(item.displayName);
};

/**
 * Ensures the array has at least `minLength` items by cloning and appending items.
 * Each clone gets a unique `id`.
 *
 * @param items - Array of items to extend.
 * @param minLength - Minimum desired length (default: 8).
 * @param maxIterations - Max cloning iterations (default: 10).
 * @returns A new array with at least `minLength` items.
 *
 * @example
 * extendItemsToMinLength([{ id: '1' }], 3);
 * // Output: [{ id: '1' }, { id: '1-clone-1' }, { id: '1-clone-2' }]
 */
export const extendItemsToMinLength = <T extends { id: string }>(
  items: T[],
  minLength = 10,
  maxIterations = 10
): T[] => {
  // Handle empty array or invalid input
  if (!items || items.length === 0 || !Array.isArray(items) || minLength <= 0) {
    return [];
  }

  // If already long enough, just return a shallow copy
  if (items.length >= minLength) {
    return [...items];
  }

  const result = [...items];
  let cloneRound = 1;

  // Loop until we hit at least minLength and give each clone a unique id
  while (result.length < minLength) {
    if (cloneRound > maxIterations) {
      console.warn(`Max iterations (${maxIterations}) reached.`);
      break; // Exit to avoid infinite loop
    }
    console.log(`Cloning items for round ${cloneRound}`);

    const clones = items.map((item) => ({
      ...item,
      id: `${item.id}-clone-${cloneRound}`,
    }));
    result.push(...clones);
    cloneRound++;
  }

  return result;
};
