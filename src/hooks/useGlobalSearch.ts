import { useEffect, useState } from 'react';

import { Source, SourceNovel } from '@sources/types';
import SourceFactory from '@sources/SourceFactory';
import useAppSettings from './useAppSettings';
import { defaultTo, sortBy } from 'lodash';

export interface GlobalSearchResult {
  source: Source;
  loading: boolean;
  novels: SourceNovel[];
  error?: Error;
}

export const useGlobalSearch = (defaultSearchText?: string) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<GlobalSearchResult[]>([]);
  const [error, setError] = useState<Error>();
  const [progress, setProgress] = useState(0);

  const { ONLY_INCLUDE_PINNED_SOURCES, PINNED_SOURCES } = useAppSettings();

  const globalSearch = async (searchText: string) => {
    try {
      let sources = SourceFactory.getSources();

      if (ONLY_INCLUDE_PINNED_SOURCES) {
        sources = sources.filter(source => PINNED_SOURCES?.includes(source.id));
      }

      let results: GlobalSearchResult[] = [];

      results = sources.map(source => ({
        source,
        loading: true,
        novels: [],
      }));

      setData(results);
      sources.forEach(async source => {
        try {
          const searchResults = await SourceFactory.getSource(
            source.id,
          )?.getSearchNovels({ searchTerm: searchText, page: 1 });

          setData(prevState =>
            prevState
              .map(prevResult =>
                prevResult.source.id === source.id
                  ? {
                      ...prevResult,
                      novels: defaultTo(searchResults?.novels, []),
                      loading: false,
                    }
                  : prevResult,
              )
              .sort(
                (
                  { novels: aNovels, source: { name: aName } },
                  { novels: bNovels, source: { name: bName } },
                ) => {
                  if (!aNovels.length) {
                    return 1;
                  }
                  if (!bNovels.length) {
                    return -1;
                  }

                  return aName.localeCompare(bName);
                },
              ),
          );
        } catch (err) {
          setData(prevState =>
            prevState.map(prevResult =>
              prevResult.source.id === source.id
                ? {
                    ...prevResult,
                    novels: [],
                    loading: false,
                    error,
                  }
                : prevResult,
            ),
          );
        } finally {
          setProgress(prevState => prevState + 1 / sources.length);
        }
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (defaultSearchText) {
      globalSearch(defaultSearchText);
    }
  }, []);

  return {
    loading,
    error,
    data,
    globalSearch,
    progress,
  };
};
