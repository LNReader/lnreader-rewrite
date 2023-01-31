import * as cheerio from 'cheerio';
import { NovelStatus } from '@database/types';

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
import { fetchApi, fetchHtml } from '@utils/fetch/fetch';

function getAbsoluteUrls(href: string) {
  var match = href.match(
    /^(https?:)\/\/(([^:/?#]*)(?::([0-9]+))?)([/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/,
  );
  return match && `${match[1]}//${match[3]}`;
}

export class NovelUpdatesParser implements ParsedSource {
  name = 'Novel Updates';
  id = 50;
  iconUrl =
    'https://github.com/LNReader/lnreader-sources/blob/main/icons/src/en/novelupdates/icon.png?raw=true';
  lang = Language.English;

  baseUrl = 'https://www.novelupdates.com/';

  async getPopoularNovels({}: GetPopularNovelsParams) {
    const totalPages = 100;
    const baseUrl = this.baseUrl;
    const sourceId = this.id;
    const url = `${baseUrl}series-ranking/`;

    const html = await fetchHtml({ url, sourceId });
    const $ = cheerio.load(html);

    const novels: SourceNovel[] = [];

    $('div.search_main_box_nu').each(function () {
      const novelUrl = $(this).find('.search_title > a').attr('href');

      if (novelUrl) {
        novels.push({
          sourceId,
          title: $(this).find('.search_title > a').text(),
          coverUrl: $(this).find('img').attr('src'),
          url: novelUrl,
        });
      }
    });

    return { novels, totalPages };
  }

  async getSearchNovels({ searchTerm }: GetSearchNovelsParams) {
    const totalPages = 1;

    const baseUrl = this.baseUrl;
    const sourceId = this.id;
    const url = `${baseUrl}?s=${searchTerm}&post_type=seriesplans`;

    const html = await fetchHtml({ url, sourceId });
    const $ = cheerio.load(html);

    const novels: SourceNovel[] = [];

    $('div.search_main_box_nu').each(function () {
      const novelUrl = $(this).find('.search_title > a').attr('href');

      if (novelUrl) {
        novels.push({
          sourceId,
          title: $(this).find('.search_title > a').text(),
          coverUrl: $(this).find('img').attr('src'),
          url: novelUrl,
        });
      }
    });

    return { novels, totalPages };
  }

  async getNovelDetails({ url }: GetNovelDetailsParams) {
    const sourceId = this.id;

    const html = await fetchHtml({ url, sourceId });

    let $ = cheerio.load(html);

    const title = $('.seriestitlenu').text();

    const type = $('#showtype').text().trim();
    const description =
      $('#editdescription').text().trim() + `\n\nType: ${type}`;

    const coverUrl = $('.seriesimg > img').attr('src');

    const author = $('#showauthors').text().trim();

    const status = $('#editstatus').text().includes('Ongoing')
      ? NovelStatus.ONGOING
      : NovelStatus.COMPLETED;

    const genre = $('#seriesgenre')
      .children('a')
      .map((_, element) => $(element).text())
      .toArray()
      .join(',');

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

    const novelId = Number($('input#mypostid').attr('value'));

    const formData = new FormData();
    formData.append('action', 'nd_getchapters');
    formData.append('mygrr', 0);
    formData.append('mypostid', novelId);

    const chaptersUrl = 'https://www.novelupdates.com/wp-admin/admin-ajax.php';
    const chaptersHtml = await fetchHtml({
      url: chaptersUrl,
      init: {
        method: 'POST',
        body: formData,
      },
      sourceId,
    });

    $ = cheerio.load(chaptersHtml);

    $('li.sp_li_chp').each(function () {
      const name = $(this).text().trim();
      const dateUpload = undefined;

      const chapterUrl =
        'https:' + $(this).find('a').first().next().attr('href');

      novelDetails.chapters?.push({
        sourceId,
        name,
        dateUpload,
        url: chapterUrl,
      });
    });

    novelDetails.chapters?.reverse();

    return novelDetails;
  }

  async getChapter({ url }: GetChapterParams): Promise<SourceChapter> {
    const res = await fetchApi({ url, sourceId: this.id });
    const html = await res.text();

    const $ = cheerio.load(html);

    const sourceUrl = res.url.toLowerCase();

    let text = null;
    let sourceName;

    let footerText =
      $('meta[name="generator"]').attr('content') || $('footer').text();
    footerText = footerText.toLowerCase();

    const isWordPress =
      footerText.toLowerCase().includes('wordpress') ||
      footerText.includes('Site Kit by Google') ||
      $('.powered-by').text().toLowerCase().includes('wordpress');

    if (sourceUrl.includes('wuxiaworld')) {
      sourceName = SourceName.WuxiaWorld;
    } else if (sourceUrl.includes('blogspot')) {
      sourceName = SourceName.Blogspot;
    } else if (sourceUrl.includes('webnovel')) {
      sourceName = SourceName.WebNovel;
    } else if (sourceUrl.includes('tumblr')) {
      sourceName = SourceName.Tumblr;
    } else if (sourceUrl.includes('wattpad')) {
      sourceName = SourceName.Wattpad;
    } else if (sourceUrl.includes('travistranslations')) {
      sourceName = SourceName.TravisTranslation;
    } else if (sourceUrl.includes('divinedaolibrary')) {
      sourceName = SourceName.DivineDaoLibrary;
    } else if (isWordPress) {
      sourceName = SourceName.WordPress;
    }

    switch (sourceName) {
      case SourceName.WuxiaWorld:
        text = $('#chapter-content').html();
        break;
      case SourceName.Blogspot:
        $('.post-share-buttons').remove();

        text = $('.entry-content').html();
        break;
      case SourceName.Tumblr:
        text = $('.post').html();
        break;
      case SourceName.Wattpad:
        text = $('.container  pre').html();
        break;
      case SourceName.TravisTranslation:
        text = $('.reader-content').html();
        break;
      case SourceName.WebNovel:
        text = $('.cha-words').html() || $('._content').html();
        break;
      case SourceName.DivineDaoLibrary:
        text = $('.entry-content').html();
        break;
      case SourceName.WordPress:
        const bloatElements = [
          '.c-ads',
          '#madara-comments',
          '#comments',
          '.content-comments',
          '.sharedaddy',
          '.wp-dark-mode-switcher',
          '.wp-next-post-navi',
          '.wp-block-buttons',
          '.wp-block-columns',
          '.post-cats',
          '.sidebar',
          '.author-avatar',
          '.ezoic-ad',
          '.wordads-ad-wrapper',
        ];

        bloatElements.forEach(tag => $(tag).remove());
        text =
          $('.entry-content').html() ||
          $('.single_post').html() ||
          $('.post-entry').html() ||
          $('.main-content').html() ||
          $('article.post').html() ||
          $('.content').html() ||
          $('#content').html() ||
          $('.page-body').html() ||
          $('.td-page-content').html();
        break;
      default:
        text = $('body').html();
    }

    if (text) {
      text = text.replace(/href="\//g, `href="${getAbsoluteUrls(res.url)}/`);
    }

    return {
      url,
      sourceId: this.id,
      text,
    };
  }
}

enum SourceName {
  WuxiaWorld,
  Blogspot,
  Tumblr,
  Wattpad,
  TravisTranslation,
  WordPress,
  RainOfSnow,
  WebNovel,
  HostedNovel,
  ScribbleHub,
  DivineDaoLibrary,
}
