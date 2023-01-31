import * as cheerio from 'cheerio';

import {
  GetChapterParams,
  GetNovelDetailsParams,
  GetPopularNovelsParams,
  GetSearchNovelsParams,
  Language,
  ParsedSource,
  SourceChapter,
  SourceNovel,
  SourceNovelDetails,
  SourceNovelsResponse,
} from '@sources/types';
import { fetchHtml } from '@utils/fetch/fetch';

export class SakuraNovelParser implements ParsedSource {
  id = 103;
  name = 'SakuraNovel';
  baseUrl = 'https://sakuranovel.id/';
  iconUrl =
    'https://github.com/LNReader/lnreader-sources/blob/main/icons/src/id/sakuranovel/icon.png?raw=true';
  lang = Language.Indonesian;

  getChapter({ url }: GetChapterParams): Promise<SourceChapter> {}

  getSearchNovels({
    searchTerm,
  }: GetSearchNovelsParams): Promise<SourceNovelsResponse> {}

  getNovelDetails({
    url,
  }: GetNovelDetailsParams): Promise<SourceNovelDetails> {}

  async getPopoularNovels({
    page,
  }: GetPopularNovelsParams): Promise<SourceNovelsResponse> {
    const sourceId = this.id;
    const url = `${this.baseUrl}advanced-search/page/${page}/?title&author&yearx&status&type&order=rating&country%5B0%5D=china&country%5B1%5D=jepang&country%5B2%5D=unknown`;

    const html = await fetchHtml({
      url,
      sourceId: this.id,
    });
    const loadedCheerio = cheerio.load(html);

    const novels: SourceNovel[] = [];

    loadedCheerio('.flexbox2-item').each(function () {
      const title = loadedCheerio(this)
        .find('.flexbox2-title span')
        .first()
        .text();
      const coverUrl = loadedCheerio(this).find('img').attr('data-src');
      const novelUrl = loadedCheerio(this)
        .find('.flexbox2-content > a')
        .attr('href') as string;

      novels.push({
        sourceId,
        title,
        coverUrl,
        url: novelUrl,
      });
    });

    return { novels };
  }
}
