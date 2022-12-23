import {ParsedSource, Source} from 'sources/types';
import {pick} from 'lodash';

export class AbstractSourceFactory {
  protected sources: Map<number, ParsedSource>;

  constructor() {
    this.sources = new Map();
  }

  registerSource(source: ParsedSource) {
    this.sources.set(source.id, source);
  }

  getSources() {
    const sources: Source[] = [];

    this.sources.forEach(source =>
      sources.push(pick(source, ['id', 'name', 'iconUrl', 'isNsfw', 'lang'])),
    );

    return sources;
  }

  getSource(id: number) {
    return this.sources.get(id);
  }
}
