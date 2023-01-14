import { Update } from '@database/types';
import { Setting } from 'types/Settings';

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

export const skipUpdatingEntriesLabels = {
  [Setting.SKIP_UPDATING_COMPLETED_NOVELS]: 'With "Completed" status',
  [Setting.SKIP_UPDATING_NOVELS_NOT_STARTED]: "That haven't been started",
  [Setting.SKIP_UPDATING_NOVELS_WITH_UNREAD_CHAPTERS]: 'With unread chapter(s)',
};
