import {AbstractSourceFactory} from './AbstractSourceFactory/AbstractSourceFactory';
import {NovelForestParser} from './parsers/NovelForest/NovelForest';

const SourceFactory = new AbstractSourceFactory();

SourceFactory.registerSource(new NovelForestParser());

export default SourceFactory;
