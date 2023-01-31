import * as cheerio from 'cheerio';
import { NovelStatus } from '@database/types';
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
} from '@sources/types';
import { fetchHtml } from '@utils/fetch/fetch';
import { sleep } from '@utils/Sleep';

export class LightNovelPubParser implements ParsedSource {
  name = 'LightNovelPub';
  id = 15;
  iconUrl =
    'https://github.com/LNReader/lnreader-sources/blob/main/icons/src/en/lightnovelpub/icon.png?raw=true';

  lang = Language.English;

  baseUrl = 'https://www.lightnovelpub.com/';

  async getPopoularNovels({ page }: GetPopularNovelsParams) {
    const totalPages = 33;
    const baseUrl = this.baseUrl;
    const url = this.baseUrl + 'browse/all/popular/all/' + page;

    const sourceId = this.id;

    const html = await fetchHtml({ url, sourceId });
    const loadedCheerio = cheerio.load(html);

    const novels: SourceNovel[] = [];

    loadedCheerio('.novel-item').each(function () {
      const title = loadedCheerio(this).find('.novel-title').text().trim();
      const coverUrl = loadedCheerio(this)
        .find('.novel-cover > img')
        .attr('data-src');
      const novelUrl =
        baseUrl +
        loadedCheerio(this).find('.novel-title > a').attr('href')?.substring(1);

      const novel = {
        sourceId,
        title,
        coverUrl,
        url: novelUrl,
      };

      novels.push(novel);
    });

    return { novels, totalPages };
  }

  async getSearchNovels({ searchTerm }: GetSearchNovelsParams) {
    const totalPages = 1;

    const baseUrl = this.baseUrl;
    const sourceId = this.id;
    const url = `${this.baseUrl}lnsearchlive`;

    const formData = new FormData();
    formData.append('inputContent', searchTerm);

    const headers = new Headers();
    headers.append('site-domain', 'www.lightnovelpub.com');
    headers.append('Sec-Fetch-Site', 'same-origin');
    headers.append('Sec-Fetch-Mode', 'cors');
    headers.append('Sec-Fetch-Dest', 'empty');
    headers.append('X-Requested-With', 'XMLHttpRequest');
    headers.append('accept', '*/*');

    const html = await fetchHtml({
      url,
      sourceId,
      init: {
        method: 'POST',
        body: formData,
        headers,
      },
    });

    const loadedCheerio = cheerio.load(html);

    const novels: SourceNovel[] = [];

    loadedCheerio('.novel-item').each(function () {
      novels.push({
        sourceId,
        title: loadedCheerio(this).find('.title').text(),
        coverUrl: 'https:' + loadedCheerio(this).find('img').attr('data-src'),
        url: baseUrl + loadedCheerio(this).find('.title a').attr('href'),
      });
    });

    return { novels, totalPages };
  }

  async getNovelDetails({ url }: GetNovelDetailsParams) {
    const baseUrl = this.baseUrl;
    const sourceId = this.id;

    const html = await fetchHtml({ url, sourceId });

    let $ = cheerio.load(html);

    const titleSelector = 'h1.novel-title';
    const descSelector = '.summary > .content';
    const coverSelector = 'figure.cover > img';
    const authorSelector = '.author > a > span';

    const genreSelector = 'div.categories > ul > li';
    const genreArr: string[] = [];

    $(genreSelector).each(function () {
      genreArr.push($(this).text().trim());
    });

    const genre = genreArr.toString();

    let status;
    const statusSelector = 'div.header-stats > span';

    $(statusSelector).each(function () {
      if ($(this).find('small').text() === 'Status') {
        const statusStr = $(this).find('strong').text();

        if (statusStr === 'Ongoinh') {
          status = NovelStatus.ONGOING;
        }
      }
    });

    const novelDetails: SourceNovelDetails = {
      url,
      sourceId,
      title: $(titleSelector).text().trim(),
      coverUrl: $(coverSelector).attr('data-src'),
      description: $(descSelector).text().trim(),
      author: $(authorSelector).text(),
      status,
      genre,
      chapters: [],
    };

    const totalPagesSelector =
      '#novel > header > div.header-body.container > div.novel-info > div.header-stats > span:nth-child(1) > strong';

    let totalPages = 1;
    totalPages = Number($(totalPagesSelector).text()?.trim());
    totalPages = Math.ceil(totalPages / 100);

    for (let i = 1; i <= totalPages; i++) {
      const chaptersUrl = url + `/chapters/page-${i}`;
      const chaptersHtml = await fetchHtml({ url: chaptersUrl, sourceId });

      $ = cheerio.load(chaptersHtml);

      $('.chapter-list li').each(function () {
        const chapterName = $(this).find('.chapter-title').text().trim();

        const dateObj = moment(
          $(this).find('.chapter-update').text().trim(),
          'MMM DD, YYYY',
        );
        const dateUpload = moment(dateObj).unix();

        const chapterUrl =
          baseUrl + $(this).find('a').attr('href')?.substring(1);

        novelDetails.chapters?.push({
          sourceId,
          name: chapterName,
          dateUpload,
          url: chapterUrl,
        });
      });

      await sleep(1000);
    }

    return novelDetails;
  }

  async getChapter({ url }: GetChapterParams): Promise<SourceChapter> {
    const sourceId = this.id;

    const html = await fetchHtml({ url, sourceId });

    const $ = cheerio.load(html);
    const text = $('#chapter-container').html();

    return {
      url,
      sourceId,
      text,
    };
  }
}
