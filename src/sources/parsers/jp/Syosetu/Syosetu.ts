import * as cheerio from 'cheerio';
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

const getSearchUrl = (pageNo?: number, order?: string) => {
  return `https://yomou.syosetu.com/search.php?order=${order || 'hyoka'}${
    !isNaN((pageNo = parseInt(String(pageNo), 10))) // check if pageNo is a number
      ? `&p=${pageNo <= 1 || pageNo > 100 ? '1' : pageNo}` // check if pageNo is between 1 and 100
      : '' // if isn't don't set ?p
  }`;
};

export class SyosetuParser implements ParsedSource {
  name = 'Syosetu';
  id = 36;
  iconUrl =
    'https://github.com/LNReader/lnreader-sources/blob/main/icons/src/jp/syosetu/icon.png?raw=true';
  lang = Language.Japanese;

  baseUrl = 'https://syosetu.com';

  async getPopoularNovels({ page }: GetPopularNovelsParams) {
    const sourceId = this.id;
    const url = getSearchUrl(page);

    const html = await fetchHtml({ url, sourceId });
    const $ = cheerio.load(html, { decodeEntities: false });

    const novels: SourceNovel[] = [];

    $('.searchkekka_box').each(function () {
      // get div with link and name
      const novelDIV = $(this).find('.novel_h');
      // get link element
      const novelA = novelDIV.children()[0];
      // add new novel to array
      novels.push({
        title: novelDIV.text(), // get the name
        url: novelA.attribs.href,
        sourceId,
      });
    });

    return { novels };
  }

  async getSearchNovels({ searchTerm, page }: GetSearchNovelsParams) {
    const sourceId = this.id;
    const url = getSearchUrl(page) + `&word=${searchTerm}`;

    const html = await fetchHtml({ url, sourceId });
    const $ = cheerio.load(html, { decodeEntities: false });

    const novels: SourceNovel[] = [];

    $('.searchkekka_box').each(function (i, e) {
      // get div with link and name
      const novelDIV = $(this).find('.novel_h');
      // get link element
      const novelA = novelDIV.children()[0];
      // add new novel to array
      novels.push({
        title: novelDIV.text(), // get the name
        url: novelA.attribs.href,
        sourceId,
      });
    });

    return { novels };
  }

  async getNovelDetails({ url }: GetNovelDetailsParams) {
    const sourceId = this.id;

    const html = await fetchHtml({ url, sourceId });
    const $ = cheerio.load(html, { decodeEntities: false });

    const title = $('.novel_title').text();
    const author = $('.novel_writername').text().replace('作者：', '');

    const novelDetails: SourceNovelDetails = {
      url,
      sourceId,
      title,
      author,
      chapters: [],
    };

    const cqGetChapters = $('.novel_sublist2');
    if (cqGetChapters.length !== 0) {
      // has more than 1 chapter
      novelDetails.description = $('#novel_ex')
        .text()
        .replace(/<\s*br.*?>/g, '\n');
      cqGetChapters.each(function () {
        const chapterA = $(this).find('a');
        const [chapterName, dateUploadString, chapterUrl] = [
          // set the variables
          chapterA.text(),
          $(this)
            .find('dt') // get title
            .text() // get text
            .replace(/（.）/g, '') // remove "(edited)" mark
            .trim(), // trim spaces
          chapterA.attr('href'),
        ];

        const dateUpload = moment(dateUploadString).unix();
        const chapterNo = parseChapterNumber(title, chapterName);

        if (chapterUrl) {
          novelDetails.chapters?.push({
            sourceId,
            name: chapterName,
            chapterNumber: dateUpload,
            url: chapterUrl,
          });
        }
      });
    } else {
      /**
       * Because there are oneshots on the site, they have to be treated with special care
       * that's what pisses me off in Shosetsu app. They have this extension,
       * but every oneshot is set as "there are no chapters" and all contents are thrown into the description!!
       */
      // get summary for oneshot chapter

      const nameBody = await fetchHtml({
        url: getSearchUrl() + `&word=${novelDetails.title}`,
        sourceId,
      });
      const summaryQuery = cheerio.load(nameBody, { decodeEntities: false });
      const foundText = summaryQuery('.searchkekka_box')
        .first()
        .find('.ex')
        .text()
        .replace(/\s{2,}/g, '\n');
      novelDetails.description = foundText;

      // add single chapter
      novelDetails.chapters?.push({
        sourceId,
        name: 'Oneshot',
        dateUpload: moment(
          $('head').find("meta[name='WWWC']").attr('content'),
        ).unix(), // get date from metadata
        url: url + 'oneshot', // set chapterUrl to oneshot so that chapterScraper knows it's a one-shot
      });
    }

    return novelDetails;
  }

  async getChapter({ url }: GetChapterParams): Promise<SourceChapter> {
    const sourceId = this.id;

    const html = await fetchHtml({ url, sourceId });
    const $ = cheerio.load(html, { decodeEntities: false });

    const text = $('#novel_honbun').html();

    return {
      url,
      sourceId: this.id,
      text,
    };
  }
}
