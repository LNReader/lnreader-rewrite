import * as cheerio from 'cheerio';
import {NovelStatus} from 'database/types';
import {isDate} from 'lodash';
import moment from 'moment';

import {
  Language,
  ParsedSource,
  SourceNovel,
  SourceNovelDetails,
  GetNovelDetailsParams,
  GetPopularNovelsParams,
  GetSearchNovelsParams,
  SourceChapter,
  GetChapterParams,
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

  async getSearchNovels({searchTerm}: GetSearchNovelsParams) {
    const totalPages = 1;

    const baseUrl = this.baseUrl;
    const sourceId = this.id;
    const url = `${this.baseUrl}/search?q=${searchTerm}`;

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
    const statusSelector =
      'body > div.layout > div.main-container.book-details > div > div.row.no-gutters > div.col-lg-8 > div.book-info > div.detail > div.meta.box.mt-1.p-10 > p:nth-child(2) > a > span';

    const status =
      $(statusSelector).text() === 'Ongoing'
        ? NovelStatus.ONGOING
        : NovelStatus.COMPLETED;

    const novelDetails: SourceNovelDetails = {
      url,
      sourceId,
      title: $(titleSelector).text().trim(),
      coverUrl: 'https:' + $(coverSelector).attr('data-src'),
      description: $(descSelector).text().trim(),
      author: $(authorSelector).text(),
      status,
      chapters: [],
    };

    const chaptersUrl =
      url.replace(baseUrl, 'https://novelforest.com/api/novels') +
      '/chapters?source=detail';

    const chaptersHtml = await fetchHtml({url: chaptersUrl});

    $ = cheerio.load(chaptersHtml);

    const chaptersSelector = 'li';

    $(chaptersSelector).each(function () {
      const dateObj = moment(
        $(this).find('.chapter-update').text().trim(),
        'MMM DD, YYYY',
      );
      const dateUpload = moment(dateObj).unix();

      const chapterUrl =
        baseUrl + '/' + $(this).find('a').attr('href')?.substring(1);

      novelDetails.chapters?.push({
        sourceId,
        url: chapterUrl,
        name: $(this).find('.chapter-title').text().trim(),
        dateUpload,
      });
    });

    novelDetails.chapters?.reverse();

    return novelDetails;
  }

  async getChapter({url}: GetChapterParams): Promise<SourceChapter> {
    const html = await fetchHtml({url});

    let loadedCheerio = cheerio.load(html);

    loadedCheerio('#listen-chapter').remove();
    loadedCheerio('#google_translate_element').remove();

    const name = loadedCheerio('#chapter__content > h1').text();
    const text = loadedCheerio('.chapter__content').html();

    return {
      url,
      sourceId: this.id,
      name,
      text,
    };
  }
}
