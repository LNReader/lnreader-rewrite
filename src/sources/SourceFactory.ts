import { AbstractSourceFactory } from './AbstractSourceFactory/AbstractSourceFactory';

import { NovelForestParser } from './parsers/NovelForest/NovelForest';
import { ReadLightNovelParser } from './parsers/ReadLightNovel/ReadLightNovel';

const SourceFactory = new AbstractSourceFactory();

SourceFactory.registerSource(new NovelForestParser());
SourceFactory.registerSource(new ReadLightNovelParser());

export default SourceFactory;
