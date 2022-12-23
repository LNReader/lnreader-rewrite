export enum Language {
  English = 'English',
  Japanese = 'Japanese',
}

export abstract class Source {
  abstract id: number;
  abstract name: string;
  abstract iconUrl: string;
  abstract lang: Language;
  description?: string;
  isNsfw?: string;
}

export interface SourceNovel {
  name: string;
  url: string;
  coverUrl?: string;
}

export interface SourceNovelDetails {
  url: string;
  title: string;
  coverUrl?: string;
  genre?: string;
  artist?: string;
  author?: string;
  description?: string;
  chapters?: SourceNovelChapter[];
}

export interface SourceNovelChapter {
  url: string;
  name: string;
  dateUpload?: string;
  scanlator?: string;
}

export interface GetSearchNovelsParams {
  searchTerm: string;
}

export interface GetNovelDetailsParams {
  url: string;
}

export abstract class ParsedSource extends Source {
  abstract getPopoularNovels(): Promise<SourceNovel[]>;

  abstract getSearchNovels({
    searchTerm,
  }: GetSearchNovelsParams): Promise<SourceNovel[]>;

  abstract getNovelDetails({
    url,
  }: GetNovelDetailsParams): Promise<SourceNovelDetails>;
}
