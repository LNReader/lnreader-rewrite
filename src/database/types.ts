export enum NovelStatus {
  ONGOING = 'Ongoing',
  COMPLETED = 'Completed',
  LICENSED = 'Licensed',
  PUBLISHING_FINISHED = 'Publishing finished',
  CANCELLED = 'Cancelled',
  ON_HIATUS = 'On hiatus',
  UNKNOWN = 'Unknown',
}

export interface Novel {
  id: number;
  url: string;
  title: string;
  status: NovelStatus;
  thumbnailUrl: string;
  favorite: number;
  lastUpdate: number;
  nextUpdate: number;
  initialized: number;
  dateAdded: number;
  categoryIds: string;
}
