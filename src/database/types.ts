import { SourceChapter, SourceNovelDetails } from '@sources/types';

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
  lastRead: number | null;
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
  chapterNumber: number;
}

export interface DatabaseChapterWithSourceId extends DatabaseChapter {
  sourceId: number;
}

export type DatabaseChapterWithNovelDetails = DatabaseChapter & {
  novelName: string;
  novelUrl: string;
};
export interface Category {
  id: number;
  name: string;
  sort?: number | null;
  flags: number;
}

export interface History {
  id: number;
  lastRead: number;
  timeRead: number | null;
  chapterId: number;
  chapterName: string;
  chapterUrl: string;
  coverUrl?: string;
  novelId: number;
  sourceId: number;
  novelName: string;
}

export interface Update {
  id: number;
  dateFetched: number;
  chapterId: number;
  chapterName: string;
  chapterUrl: string;
  coverUrl?: string;
  novelId: number;
  sourceId: number;
  novelName: string;
  downloaded?: number;
  read: number;
}

export interface DownloadedChapter extends SourceChapter {
  id: number;
  chapterId: number;
}
