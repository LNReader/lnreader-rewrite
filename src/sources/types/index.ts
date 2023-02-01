import { NovelStatus } from '@database/types';

export enum Language {
  Arabic = 'Arabic',
  English = 'English',
  Indonesian = 'Indonesian',
  Japanese = 'Japanese',
  Turkish = 'Turkish',
  PortugueseBr = 'Portuguese (Brazil)',
}

export abstract class Source {
  id!: number;
  name!: string;
  baseUrl!: string;
  iconUrl!: string;
  lang!: Language;
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
