import {SourceNovelDetails} from 'sources/types';

export enum NovelStatus {
  ONGOING = 'Ongoing',
  COMPLETED = 'Completed',
  LICENSED = 'Licensed',
  PUBLISHING_FINISHED = 'Publishing finished',
  CANCELLED = 'Cancelled',
  ON_HIATUS = 'On hiatus',
  UNKNOWN = 'Unknown',
}

export interface DatabaseNovel extends SourceNovelDetails {
  id: number;
  favorite: number;
  lastUpdate?: number;
  nextUpdate?: number;
  initialized?: number;
  dateAdded?: number;
  categoryIds: string;
}

export interface LibraryNovel extends DatabaseNovel {
  chaptersDownloaded: number | null;
  chaptersUnread: number | null;
}

export interface DatabaseChapter {
  id: number;
  url: string;
  novelId: number;
  name: string;
  dateUpload?: number;
  dateFetched: number;
  scanlator?: string;
  bookmark?: number;
  read?: number;
  downloaded?: number;
}

export interface Category {
  id: number;
  name: string;
  sort?: number | null;
  flags: number;
}
