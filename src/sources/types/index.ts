import { NovelStatus } from '@database/types';

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
  coverUrl?: string | null;
  status?: NovelStatus | null;
  genre?: string | null;
  artist?: string | null;
  author?: string | null;
  description?: string | null;
  chapters?: SourceNovelChapter[] | null;
}

export interface SourceNovelChapter {
  sourceId: number;
  url: string;
  name: string;
  chapterNumber?: number;
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

  abstract getChapter({ url }: GetChapterParams): Promise<SourceChapter>;
}
