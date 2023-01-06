import { AbstractSourceFactory } from './AbstractSourceFactory/AbstractSourceFactory';

import { NovelForestParser } from './parsers/en/NovelForest/NovelForest';
import { MadaraParser } from './multiSrc/Madara/Madara';
import { Language } from './types';

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

SourceFactory.registerSource(
  new MadaraParser({
    id: 59,
    baseUrl: 'https://arnovel.me/',
    name: 'ArNovel',
    iconUrl:
      'https://github.com/LNReader/lnreader-sources/blob/main/icons/multisrc/madara/icons/arnovel.png?raw=true',
    lang: Language.Arabic,
  }),
);

SourceFactory.registerSource(
  new MadaraParser({
    id: 60,
    baseUrl: 'https://meionovel.id/',
    name: 'MeioNovel',
    iconUrl:
      'https://github.com/LNReader/lnreader-sources/blob/main/icons/multisrc/madara/icons/meionovel.png?raw=true',
    lang: Language.Indonesian,
  }),
);

export default SourceFactory;
