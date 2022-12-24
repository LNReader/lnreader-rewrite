import * as cheerio from 'cheerio';

import {
  Language,
  ParsedSource,
  SourceNovel,
  SourceNovelDetails,
  GetNovelDetailsParams,
} from 'sources/types';
import {fetchHtml} from 'utils/fetch/fetch';

export class ReadLightNovelParser extends ParsedSource {
  constructor() {
    super();
  }

  name = 'ReadLightNovel';
  id = 2;
  iconUrl =
    'https://github.com/LNReader/lnreader-sources/blob/main/icons/src/en/readlightnovel/icon.png?raw=true';

  lang = Language.English;

  async getPopoularNovels() {
    const novels: SourceNovel[] = [
      {
        name: 'dscds',
        url: 'dsds',
        coverUrl: 'dsd',
      },
    ];

    return novels;
  }

  async getSearchNovels() {
    const novels: SourceNovel[] = [
      {
        name: 'dscds',
        url: 'dsds',
        coverUrl: 'dsd',
      },
    ];

    return novels;
  }

  async getNovelDetails({url}: GetNovelDetailsParams) {
    const html = await fetchHtml({url});

    const $ = cheerio.load(html);

    const titleSelector = '.name h1';
    const descSelector =
      'body > div.layout > div.main-container.book-details > div > div.row.no-gutters > div.col-lg-8 > div.mt-1 > div.section.box.mt-1.summary > div.section-body > p.content';
    const coverSelector = '.img-cover img';
    const authorSelector =
      'body > div.layout > div.main-container.book-details > div > div.row.no-gutters > div.col-lg-8 > div.book-info > div.detail > div.meta.box.mt-1.p-10 > p:nth-child(1) > a > span';

    const novelDetails: SourceNovelDetails = {
      url,
      title: $(titleSelector).text().trim(),
      coverUrl: 'https:' + $(coverSelector).attr('data-src'),
      description: $(descSelector).text(),
      author: $(authorSelector).text(),
      chapters: [],
    };

    return novelDetails;
  }
}
