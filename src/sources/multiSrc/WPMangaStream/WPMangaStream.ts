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
  SourceNovelChapter,
  SourceNovelDetails,
  SourceNovelsResponse,
} from '@sources/types';
import { fetchHtml } from '@utils/fetch/fetch';
import { NovelStatus } from '@database/types';
import { parseChapterNumber, parseRelativeDate } from '@sources/Utils';

interface WPMangaStreamOptions {}

const defaultOptions: WPMangaStreamOptions = {};
interface WPMangaStreamSource {
  id: number;
  name: string;
  baseUrl: string;
  iconUrl: string;
  lang?: Language;
  options?: WPMangaStreamOptions;
}

export class WPMangaStreamParser extends ParsedSource {
  options: WPMangaStreamOptions;

  constructor({
    name,
    baseUrl,
    id,
    iconUrl,
    lang = Language.English,
    options,
  }: WPMangaStreamSource) {
    super();
    this.id = id;
    this.name = name;
    this.baseUrl = baseUrl;
    this.iconUrl = iconUrl;
    this.lang = lang;
    this.options = { ...defaultOptions, ...options };
  }

  async getPopoularNovels({
    page,
  }: GetPopularNovelsParams): Promise<SourceNovelsResponse> {
    const sourceId = this.id;
    const url =
      this.baseUrl + 'series/?page=' + page + '&status=&order=popular';

    const res = await fetchHtml({ url, sourceId });
    const $ = cheerio.load(res);

    const novels: SourceNovel[] = [];

    $('article.bs').each(function () {
      const title = $(this).find('.ntitle').text().trim();
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

    return {
      novels,
    };
  }

  async getNovelDetails({
    url,
  }: GetNovelDetailsParams): Promise<SourceNovelDetails> {
    const sourceId = this.id;

    const res = await fetchHtml({ url, sourceId });
    const $ = cheerio.load(res);

    $('.manga-title-badges').remove();

    const title = $('.entry-title').text();
    const coverUrl = $('img.wp-post-image').attr('src');
    const description = $('div[itemprop="description"]').text().trim();

    let genre, author, status;

    $('div.spe > span').each(function () {
      const detailKey = $(this).find('b').text().trim();
      const detailValue = $(this).find('b').next().text().trim();

      switch (detailKey) {
        case 'المؤلف:':
        case 'Yazar:':
        case 'Autor:':
          author = detailValue;
          break;
        case 'Status:':
        case 'Seviye:':
          status = ['OnGoing', 'مستمرة', 'Devam Eden'].includes(detailValue)
            ? NovelStatus.ONGOING
            : NovelStatus.COMPLETED;
          break;
        case 'Tipo:':
        case 'Tür:':
          genre = detailValue?.replace(/\s/g, ',');
          break;
      }
    });

    const chapters: SourceNovelChapter[] = [];

    $('.eplister')
      .find('li')
      .each(function () {
        const chapterNumberString = $(this).find('.epl-num').text();
        const chapterNumber = parseChapterNumber(title, chapterNumberString);

        const name =
          chapterNumberString + ' - ' + $(this).find('.epl-title').text();

        const chapterUrl = $(this).find('a').attr('href');

        const dateUploadString = $(this).find('.epl-date').text().trim();
        const dateUpload = parseRelativeDate(dateUploadString);

        if (chapterUrl) {
          chapters.push({
            sourceId,
            name,
            dateUpload,
            chapterNumber,
            url: chapterUrl,
          });
        }
      });

    return {
      sourceId,
      url,
      title,
      coverUrl,
      description,
      genre,
      author,
      status,
      chapters,
    };
  }

  async getChapter({ url }: GetChapterParams): Promise<SourceChapter> {
    const sourceId = this.id;

    const res = await fetchHtml({ url, sourceId });
    const $ = cheerio.load(res);

    const text = $('div.epcontent').html();

    return {
      sourceId,
      url,
      text,
    };
  }

  async getSearchNovels({
    searchTerm,
  }: GetSearchNovelsParams): Promise<SourceNovelsResponse> {
    const sourceId = this.id;
    const url = `${this.baseUrl}?s=${searchTerm}`;

    const res = await fetchHtml({ url, sourceId });
    const $ = cheerio.load(res);

    const novels: SourceNovel[] = [];

    $('article.bs').each(function () {
      const title = $(this).find('.ntitle').text().trim();
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
    return {
      novels,
    };
  }
}
