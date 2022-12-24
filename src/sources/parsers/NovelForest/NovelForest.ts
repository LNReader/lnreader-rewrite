import * as cheerio from 'cheerio';
import moment from 'moment';

import {
  Language,
  ParsedSource,
  SourceNovel,
  SourceNovelDetails,
  GetNovelDetailsParams,
  GetPopularNovelsParams,
} from 'sources/types';
import {fetchHtml} from 'utils/fetch/fetch';

export class NovelForestParser extends ParsedSource {
  constructor() {
    super();
  }

  name = 'NovelForest';
  id = 1;
  iconUrl =
    'https://github.com/LNReader/lnreader-sources/blob/main/icons/src/en/novelforest/icon.png?raw=true';

  lang = Language.English;

  baseUrl = 'https://novelforest.com';

  async getPopoularNovels({page}: GetPopularNovelsParams) {
    const totalPages = 25;
    const baseUrl = this.baseUrl;
    const sourceId = this.id;
    const url = `${this.baseUrl}/popular?page=${page}`;

    const html = await fetchHtml({url});
    const loadedCheerio = cheerio.load(html);

    const novels: SourceNovel[] = [];

    loadedCheerio('.book-item').each(function () {
      novels.push({
        sourceId,
        title: loadedCheerio(this).find('.title').text(),
        coverUrl: 'https:' + loadedCheerio(this).find('img').attr('data-src'),
        url: baseUrl + loadedCheerio(this).find('.title a').attr('href'),
      });
    });

    return {novels, totalPages};
  }

  // async getSearchNovels() {
  //   const novels: SourceNovel[] = [
  //     {
  //       title: 'dscds',
  //       url: 'dsds',
  //       coverUrl: 'dsd',
  //     },
  //   ];

  //   return {novels};
  // }

  async getNovelDetails({url}: GetNovelDetailsParams) {
    const baseUrl = this.baseUrl;
    const sourceId = this.id;

    const html = await fetchHtml({url});

    let $ = cheerio.load(html);

    const titleSelector = '.name h1';
    const descSelector =
      'body > div.layout > div.main-container.book-details > div > div.row.no-gutters > div.col-lg-8 > div.mt-1 > div.section.box.mt-1.summary > div.section-body > p.content';
    const coverSelector = '.img-cover img';
    const authorSelector =
      'body > div.layout > div.main-container.book-details > div > div.row.no-gutters > div.col-lg-8 > div.book-info > div.detail > div.meta.box.mt-1.p-10 > p:nth-child(1) > a > span';

    const novelDetails: SourceNovelDetails = {
      url,
      sourceId,
      title: $(titleSelector).text().trim(),
      coverUrl: 'https:' + $(coverSelector).attr('data-src'),
      description: $(descSelector).text(),
      author: $(authorSelector).text(),
      chapters: [],
    };

    const chaptersUrl =
      url.replace(baseUrl, 'https://novelforest.com/api/novels') +
      '/chapters?source=detail';

    const chaptersHtml = await fetchHtml({url: chaptersUrl});

    $ = cheerio.load(chaptersHtml);

    const chaptersSelector = 'li';

    $(chaptersSelector).each(function () {
      const dateUpload = moment(
        new Date($(this).find('.chapter-update').text().trim()),
      ).unix();

      const chapterUrl = baseUrl + $(this).find('a').attr('href')?.substring(1);

      novelDetails.chapters?.push({
        sourceId,
        url: chapterUrl,
        name: $(this).find('.chapter-title').text().trim(),
        dateUpload,
      });
    });

    novelDetails.chapters?.reverse();

    // console.log(novelDe)

    return novelDetails;
  }
}
