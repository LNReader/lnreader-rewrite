import { AbstractSourceFactory } from './AbstractSourceFactory/AbstractSourceFactory';

import { NovelForestParser } from './parsers/en/NovelForest/NovelForest';
import { MadaraParser } from './multiSrc/Madara/Madara';

const SourceFactory = new AbstractSourceFactory();

SourceFactory.registerSource(new NovelForestParser());

/**
 * Multi Sources
 */

/**
 * Madara
 */
SourceFactory.registerSource(
  new MadaraParser({
    id: 1,
    baseUrl: 'https://boxnovel.com/',
    name: 'BoxNovel',
    iconUrl:
      'https://github.com/LNReader/lnreader-sources/blob/main/icons/src/en/boxnovel/icon.png?raw=true',
  }),
);

SourceFactory.registerSource(
  new MadaraParser({
    id: 39,
    baseUrl: 'https://novelcake.com/',
    name: 'NovelCake',
    path: { novels: 'series', novel: 'series', chapter: 'series' },
    iconUrl:
      'https://github.com/LNReader/lnreader-sources/blob/main/icons/multisrc/madara/icons/novelcake.png?raw=true',
  }),
);

SourceFactory.registerSource(
  new MadaraParser({
    id: 40,
    baseUrl: 'https://novelsrock.com/',
    name: 'NovelsRock',
    path: { novels: 'novels', novel: 'novel', chapter: 'novel' },
    iconUrl:
      'https://github.com/LNReader/lnreader-sources/blob/main/icons/multisrc/madara/icons/novelsrock.png?raw=true',
  }),
);

SourceFactory.registerSource(
  new MadaraParser({
    id: 40,
    baseUrl: 'https://novelsrock.com/',
    name: 'NovelsRock',
    path: { novels: 'novels', novel: 'novel', chapter: 'novel' },
    iconUrl:
      'https://github.com/LNReader/lnreader-sources/blob/main/icons/multisrc/madara/icons/novelsrock.png?raw=true',
  }),
);

SourceFactory.registerSource(
  new MadaraParser({
    id: 41,
    baseUrl: 'https://zinnovel.com/',
    name: 'ZinnNovel',
    path: { novels: 'manga', novel: 'manga', chapter: 'manga' },
    iconUrl:
      'https://github.com/LNReader/lnreader-sources/blob/main/icons/multisrc/madara/icons/zinnovel.png?raw=true',
  }),
);

SourceFactory.registerSource(
  new MadaraParser({
    id: 42,
    baseUrl: 'https://noveltranslate.com/',
    name: 'NovelTranslate',
    path: { novels: 'all-novels', novel: 'manga', chapter: 'manga' },
    iconUrl:
      'https://github.com/LNReader/lnreader-sources/blob/main/icons/multisrc/madara/icons/noveltranslate.png?raw=true',
  }),
);

SourceFactory.registerSource(
  new MadaraParser({
    id: 43,
    baseUrl: 'https://www.lunarletters.com/',
    name: 'LunarLetters',
    path: { novels: 'series', novel: 'series', chapter: 'series' },
    iconUrl:
      'https://github.com/LNReader/lnreader-sources/blob/main/icons/multisrc/madara/icons/lunarletters.png?raw=true',
  }),
);

SourceFactory.registerSource(
  new MadaraParser({
    id: 44,
    baseUrl: 'https://sleepytranslations.com/',
    name: 'SleepyTranslations',
    path: { novels: 'series', novel: 'series', chapter: 'series' },
    iconUrl:
      'https://github.com/LNReader/lnreader-sources/blob/main/icons/multisrc/madara/icons/sleepytranslations.png?raw=true',
  }),
);

export default SourceFactory;
