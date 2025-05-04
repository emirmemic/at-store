export function extendItemsToMinLength<T extends { id: string }>(
  items: T[],
  minLength = 9
): T[] {
  const result: T[] = [...items];
  let cloneRound = 1;

  while (result.length < minLength) {
    const clones = items.map((item) => ({
      ...item,
      id: `${item.id}-clone-${cloneRound}`,
    }));
    result.push(...clones);
    cloneRound++;
  }

  return result;
}
