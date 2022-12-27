import { AbstractSourceFactory } from './AbstractSourceFactory/AbstractSourceFactory';
import { LightNovelPubParser } from './parsers/en/LightNovelPub/LightNovelPub';

import { NovelForestParser } from './parsers/en/NovelForest/NovelForest';
import { ReadLightNovelParser } from './parsers/en/NovelForest/ReadLightNovel/ReadLightNovel';
import { SakuraNovelParser } from './parsers/id/SakuraNovel/SakuraNovel';

const SourceFactory = new AbstractSourceFactory();

SourceFactory.registerSource(new NovelForestParser());
SourceFactory.registerSource(new ReadLightNovelParser());
SourceFactory.registerSource(new SakuraNovelParser());
SourceFactory.registerSource(new LightNovelPubParser());

export default SourceFactory;
