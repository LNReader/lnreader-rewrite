import { Update } from '@database/types';

export const groupUpdatesByDate = (dbUpdates: Update[]) => {
  const dateGroups = dbUpdates.reduce<Record<string, Update[]>>(
    (groups, item) => {
      const date = new Date(item.dateFetched).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }

      groups[date].push(item);

      return groups;
    },
    {},
  );

  const groupedUpdates = Object.keys(dateGroups).map(date => {
    return {
      date,
      data: dateGroups[date],
    };
  });

  return groupedUpdates;
};

export const sleep = (time: number): Promise<void> =>
  new Promise(resolve => setTimeout(() => resolve(), time));
