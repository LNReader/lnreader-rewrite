import { History } from '@database/types';

export const groupHistoryByDate = (dbHistory: History[]) => {
  const dateGroups = dbHistory.reduce<Record<string, History[]>>(
    (groups, item) => {
      const date = new Date(item.lastRead).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }

      groups[date].push(item);

      return groups;
    },
    {},
  );

  const groupedHistory = Object.keys(dateGroups).map(date => {
    return {
      date,
      data: dateGroups[date],
    };
  });

  return groupedHistory;
};
