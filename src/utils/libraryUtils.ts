export enum LibraryFilters {
  UNREAD = ' AND chaptersUnread > 0 ',
  DOWNLOADED = ' AND chaptersDownloaded > 0 ',
  STARTED = ' AND initialized = 1 ',
  COMPLETED = ' AND chaptersUnread = 0 ',
}

export const libraryFilterLabels = {
  [LibraryFilters.UNREAD]: 'Unread',
  [LibraryFilters.COMPLETED]: 'Completed',
  [LibraryFilters.DOWNLOADED]: 'Downloaded',
  [LibraryFilters.STARTED]: 'Started',
};

export enum LibrarySortOrder {
  Alphabetically_ASC = 'novels.title ASC',
  Alphabetically_DESC = 'novels.title DESC',
  Unread_ASC = 'novels.initialized ASC',
  Unread_DESC = 'novels.initialized DESC',
  Downloaded_ASC = 'chaptersDownloaded ASC',
  Downloaded_DESC = 'chaptersDownloaded DESC',
  TotalChapters_ASC = 'chaptersUnread ASC',
  TotalChapters_DESC = 'chaptersUnread DESC',
  DateAdded_ASC = 'dateAdded ASC',
  DateAdded_DESC = 'dateAdded DESC',
}

export const librarySortOrderList = [
  {
    label: 'Alphabetically',
    ASC: LibrarySortOrder.Alphabetically_ASC,
    DESC: LibrarySortOrder.Alphabetically_DESC,
  },
  {
    label: 'Unread',
    ASC: LibrarySortOrder.Unread_ASC,
    DESC: LibrarySortOrder.Unread_DESC,
  },
  {
    label: 'Downloaded',
    ASC: LibrarySortOrder.Downloaded_ASC,
    DESC: LibrarySortOrder.Downloaded_DESC,
  },
  {
    label: 'Total chapters',
    ASC: LibrarySortOrder.TotalChapters_ASC,
    DESC: LibrarySortOrder.TotalChapters_DESC,
  },
  {
    label: 'Date added',
    ASC: LibrarySortOrder.DateAdded_ASC,
    DESC: LibrarySortOrder.DateAdded_DESC,
  },
];

export enum LibraryDisplayModes {
  Compact,
  Comfortable,
  CoverOnly,
  List,
}
