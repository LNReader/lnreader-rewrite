import {NovelStatus} from 'database/types';

export enum Language {
  English = 'English',
  Japanese = 'Japanese',
}

export abstract class Source {
  abstract id: number;
  abstract name: string;
  abstract baseUrl: string;
  abstract iconUrl: string;
  abstract lang: Language;
  description?: string;
  isNsfw?: string;
}

export interface SourceNovel {
  sourceId: number;
  title: string;
  url: string;
  coverUrl?: string;
}

export interface SourceNovelDetails {
  sourceId: number;
  url: string;
  title: string;
  coverUrl?: string;
  status?: NovelStatus;
  genre?: string;
  artist?: string;
  author?: string;
  description?: string;
  chapters?: SourceNovelChapter[];
}

export interface SourceNovelChapter {
  sourceId: number;
  url: string;
  name: string;
  dateUpload?: number;
  scanlator?: string;
}

export interface SourceChapter {
  sourceId: number;
  url: string;
  name: string;
  text: string | null;
}

export interface GetPopularNovelsParams {
  page?: number;
}

export interface GetSearchNovelsParams {
  searchTerm: string;
  page?: number;
}

export interface GetNovelDetailsParams {
  url: string;
}

export interface GetChapterParams {
  url: string;
}

export interface SourceNovelsResponse {
  novels: SourceNovel[];
  totalPages?: number;
}

export abstract class ParsedSource extends Source {
  abstract getPopoularNovels({
    page,
  }: GetPopularNovelsParams): Promise<SourceNovelsResponse>;

  abstract getSearchNovels({
    searchTerm,
  }: GetSearchNovelsParams): Promise<SourceNovelsResponse>;

  abstract getNovelDetails({
    url,
  }: GetNovelDetailsParams): Promise<SourceNovelDetails>;

  abstract getChapter({url}: GetChapterParams): Promise<SourceChapter>;
}
