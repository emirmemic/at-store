import { OpeningHours } from '@/app/[locale]/(static-pages)/find-store/types';

export const formatWorkingHours = (data: OpeningHours) => {
  const dayLabels = ['Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub', 'Ned'];
  const hoursMap = new Map<number, string | null>();
  const weekdayText = data.weekday_text || [];

  // Initialize the map with null values for closed days
  weekdayText.forEach((entry, index) => {
    const [, timeRange] = entry.split(': ');
    hoursMap.set(index, timeRange === 'Zatvoreno' ? null : timeRange);
  });

  const groups = [];
  let currentGroup = null;

  // Iterate through the periods to fill in the map with open hours
  for (let i = 0; i < 7; i++) {
    const timeRange = hoursMap.get(i);
    if (!currentGroup || currentGroup.timeRange !== timeRange) {
      if (currentGroup) groups.push(currentGroup);
      currentGroup = { start: i, end: i, timeRange };
    } else {
      currentGroup.end = i;
    }
  }
  if (currentGroup) groups.push(currentGroup);

  // Format the day range for display
  // e.g. "Pon - Ned" or "Pon - Uto"
  const formatDayRange = (start: number, end: number) => {
    if (start === end) return dayLabels[start];
    return `${dayLabels[start]} - ${dayLabels[end]}`;
  };

  // Create the final result array with formatted strings
  const results = groups
    .filter((g) => g.timeRange)
    .map((g) => {
      const dayRange = formatDayRange(g.start, g.end);
      return `${dayRange}: ${g.timeRange}`;
    });

  return results.join(', ');
};
