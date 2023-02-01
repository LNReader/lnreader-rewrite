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

import { parseChapterNumber, parseRelativeDate } from '../../Utils';

interface MadaraOptions {
  popularNovelsPath?: string;
  reverseChapters?: boolean;

  /**
   * @default true
   */
  useNewChapterEndpoint?: boolean;
}

interface MadaraSource {
  id: number;
  name: string;
  baseUrl: string;
  iconUrl: string;
  lang?: Language;
  options?: MadaraOptions;
}

const defaultPath = 'novel';

const defaultOptions: MadaraOptions = {
  popularNovelsPath: defaultPath,
  useNewChapterEndpoint: true,
  reverseChapters: true,
};

export class MadaraParser extends ParsedSource {
  options: MadaraOptions;

  constructor({
    name,
    baseUrl,
    id,
    iconUrl,
    lang = Language.English,
    options,
  }: MadaraSource) {
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
      this.baseUrl +
      this.options.popularNovelsPath +
      '/page/' +
      page +
      '/?m_orderby=rating';

    const res = await fetchHtml({ url, sourceId });
    const $ = cheerio.load(res);

    const novels: SourceNovel[] = [];

    $('.manga-title-badges').remove();

    $('.page-item-detail').each(function () {
      const title = $(this).find('.post-title').text().trim();
      const cover = $(this).find('img');
      const coverUrl = cover.attr('data-src') || cover.attr('src');

      const novelUrl = $(this).find('.post-title').find('a').attr('href');

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
    let $ = cheerio.load(res);

    $('.manga-title-badges').remove();

    const title =
      $('.post-title').text().trim() || $('#manga-title').text().trim();

    const cover = $('.summary_image > a > img');
    const coverUrl = cover.attr('data-src') || cover.attr('src');

    let description =
      $('div.summary__content')
        .text()
        .trim()
        .replace(/Description(:?)(\s|\n)+/g, '') ||
      $('.manga-excerpt').text().trim();

    let genre, author, status;

    $('.post-content_item').each(function () {
      const detailKey =
        $(this).find('.summary-heading > h5').text().trim() ||
        $(this).find('h5').text().trim();

      const detailValue =
        $(this).find('.summary-content').text().trim() ||
        $(this).find('div').text().trim();

      switch (detailKey) {
        case 'Genre(s)':
        case 'التصنيفات':
        case 'Tarz(lar)':
          genre = detailValue.replace(/[\t\n]/g, ',');
          break;
        case 'Author(s)':
        case 'المؤلف':
        case 'Yazar(lar)':
          author = detailValue;
          break;
        case 'Status':
        case 'الحالة':
        case 'Durum':
          status = ['OnGoing', 'مستمرة', 'Devam Eden'].includes(detailValue)
            ? NovelStatus.ONGOING
            : NovelStatus.COMPLETED;
          break;
        case 'Summary':
          description ??= detailValue;
          break;
      }
    });

    const chapters: SourceNovelChapter[] = [];

    let chaptersHtml;

    if (this.options.useNewChapterEndpoint) {
      const chaptersUrl = url + 'ajax/chapters/';

      chaptersHtml = await fetchHtml({
        url: chaptersUrl,
        init: {
          method: 'POST',
        },
        sourceId,
      });
    } else {
      const chaptersUrl = this.baseUrl + 'wp-admin/admin-ajax.php';

      const novelId =
        $('.rating-post-id').attr('value') ||
        $('#manga-chapters-holder').attr('data-id');

      const formData = new FormData();

      formData.append('action', 'manga_get_chapters');
      formData.append('manga', novelId);

      chaptersHtml = await fetchHtml({
        url: chaptersUrl,
        init: {
          method: 'POST',
          body: formData,
        },
        sourceId,
      });
    }

    if (chaptersHtml !== '0') {
      $ = cheerio.load(chaptersHtml);
    }

    $('.wp-manga-chapter').each(function () {
      const name = $(this).find('a').text().trim();
      const chapterUrl = $(this).find('a').attr('href');

      const dateUploadString = $(this)
        .find('span.chapter-release-date')
        .text()
        .trim();
      const dateUpload = parseRelativeDate(dateUploadString);
      const chapterNumber = parseChapterNumber(title, name);

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

    if (this.options.reverseChapters) {
      chapters.reverse();
    }

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

    const text = $('.text-left').html() || $('.text-right').html();

    return {
      sourceId,
      url,
      text,
    };
  }

  async getSearchNovels({
    searchTerm,
    page,
  }: GetSearchNovelsParams): Promise<SourceNovelsResponse> {
    const sourceId = this.id;
    const url = `${this.baseUrl}/page/${page}/?s=${searchTerm}&post_type=wp-manga`;

    const res = await fetchHtml({ url, sourceId });
    const $ = cheerio.load(res);

    $('.manga-title-badges').remove();

    const novels: SourceNovel[] = [];

    $('.c-tabs-item__content').each(function () {
      const title = $(this).find('.post-title').text().trim();

      const cover = $(this).find('img');
      const coverUrl = cover.attr('data-src') || cover.attr('src');

      const novelUrl = $(this).find('.post-title').find('a').attr('href');

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
