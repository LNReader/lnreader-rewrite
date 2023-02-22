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
import { parseChapterNumber } from '@sources/Utils';

export class ComradeMaoParser implements ParsedSource {
  name = 'ComradeMao';
  id = 27;
  iconUrl =
    'https://github.com/LNReader/lnreader-sources/blob/main/icons/src/en/comrademao/icon.png?raw=true';

  lang = Language.English;

  baseUrl = 'https://comrademao.com/';

  async getPopoularNovels({ page }: GetPopularNovelsParams) {
    const baseUrl = this.baseUrl;
    const sourceId = this.id;
    const url = `${baseUrl}page/${page}/?post_type=novel`;

    const html = await fetchHtml({ url, sourceId });
    const $ = cheerio.load(html);

    const novels: SourceNovel[] = [];

    $('.listupd')
      .find('div.bs')
      .each(function () {
        const title = $(this).find('.tt').text().trim();
        const coverUrl = $(this).find('img').attr('src');
        const novelUrl = $(this).find('a').attr('href');

        if (novelUrl) {
          novels.push({
            sourceId,
            title,
            coverUrl,
            url: novelUrl,
          });
        }
      });

    return { novels };
  }

  async getSearchNovels({ searchTerm, page }: GetSearchNovelsParams) {
    const baseUrl = this.baseUrl;
    const sourceId = this.id;
    const url = `${baseUrl}page/${page}/?s=${searchTerm}&post_type=novel`;

    const html = await fetchHtml({ url, sourceId });
    const $ = cheerio.load(html);

    const novels: SourceNovel[] = [];

    $('.listupd')
      .find('div.bs')
      .each(function () {
        const title = $(this).find('.tt').text().trim();
        const coverUrl = $(this).find('img').attr('src');
        const novelUrl = $(this).find('a').attr('href');

        if (novelUrl) {
          novels.push({
            sourceId,
            title,
            coverUrl,
            url: novelUrl,
          });
        }
      });

    return { novels };
  }

  async getNovelDetails({ url }: GetNovelDetailsParams) {
    const sourceId = this.id;

    const html = await fetchHtml({ url, sourceId });

    const $ = cheerio.load(html);

    const title = $('.entry-title').text().trim();

    const coverUrl = $('div.thumbook > div > img').attr('src');

    const description = $('div.infox > div:nth-child(6) > span > p')
      .text()
      .trim();

    const status =
      $('div.infox > div:nth-child(3) > span').text().trim() === 'Ongoing'
        ? NovelStatus.ONGOING
        : NovelStatus.COMPLETED;

    const author = $('div.infox > div:nth-child(2) > span').text().trim();

    const genre = $('div.infox > div:nth-child(4) > span')
      .text()
      .replace(/\s/g, '');

    const novelDetails: SourceNovelDetails = {
      url,
      sourceId,
      title,
      coverUrl,
      description,
      author,
      status,
      genre,
      chapters: [],
    };

    $('#chapterlist')
      .find('li')
      .each(function () {
        const name = $(this).find('.chapternum').text();
        const chapterNumber = parseChapterNumber(title, name);

        const chapterUrl = $(this).find('a').attr('href');

        const dateUploadString = $(this).find('.chapterdate').text();
        const dateUpload = moment(dateUploadString).unix();

        if (chapterUrl) {
          novelDetails.chapters?.push({
            sourceId,
            name,
            chapterNumber,
            dateUpload,
            url: chapterUrl,
          });
        }
      });

    novelDetails.chapters?.reverse();

    return novelDetails;
  }

  async getChapter({ url }: GetChapterParams): Promise<SourceChapter> {
    const sourceId = this.id;

    const html = await fetchHtml({ url, sourceId });
    const loadedCheerio = cheerio.load(html);

    const text = loadedCheerio('#chaptercontent').html();

    return {
      url,
      sourceId: this.id,
      text,
    };
  }
}
