export enum NovelFilters {
  UNREAD = ' AND `read` > 0 ',
  BOOKMARKED = ' AND bookmark > 0 ',
  DOWNLOADED = ' AND downloaded = 1 ',
}

export const NovelFilterLabels = {
  [NovelFilters.UNREAD]: 'Unread',
  [NovelFilters.DOWNLOADED]: 'Downloaded',
  [NovelFilters.BOOKMARKED]: 'Bookmarked',
};

export enum NovelSortOrder {
  BY_SOURCE_ASC = 'id ASC',
  BY_SOURCE_DESC = 'id DESC',
  BY_CHAPTER_NUMBER_ASC = 'chapterNumber ASC',
  BY_CHAPTER_NUMBER_DESC = 'chapterNumber DESC',
  BY_DATE_UPLOAD_ASC = 'dateUpload ASC, id ASC',
  BY_DATE_UPLOAD_DESC = 'dateUpload DESC, id DESC',
}

export const novelSortOrderList = [
  {
    label: 'By source',
    ASC: NovelSortOrder.BY_SOURCE_ASC,
    DESC: NovelSortOrder.BY_SOURCE_DESC,
  },
  {
    label: 'By chapter number',
    ASC: NovelSortOrder.BY_CHAPTER_NUMBER_ASC,
    DESC: NovelSortOrder.BY_CHAPTER_NUMBER_DESC,
  },
  {
    label: 'By upload date',
    ASC: NovelSortOrder.BY_DATE_UPLOAD_ASC,
    DESC: NovelSortOrder.BY_DATE_UPLOAD_DESC,
  },
];
