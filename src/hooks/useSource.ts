import { useEffect, useState } from 'react';

import SourceFactory from '@sources/SourceFactory';
import { SourceNovel } from '@sources/types';

interface UseSourceParams {
  sourceId: number;
  searchText: string;
}

const useSource = (params: UseSourceParams) => {
  const [loading, setLoading] = useState(true);
  const [novels, setNovels] = useState<SourceNovel[]>([]);
  const [error, setError] = useState<Error>();
  const [page, setPage] = useState(1);

  const [hasNextPage, setHasNextPage] = useState(true);

  const source = SourceFactory.getSource(params.sourceId);

  const fetchNovels = async () => {
    try {
      const res = await source?.getPopoularNovels({ page });
      const data = res?.novels || [];

      setNovels(prevVal => (page === 1 ? data : [...prevVal, ...data]));
      setHasNextPage(data.length > 0);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const searchNovels = async () => {
    try {
      setHasNextPage(true);
      setLoading(true);
      const res = await source?.getSearchNovels({
        searchTerm: params.searchText,
        page,
      });

      const data = res?.novels || [];

      setNovels(prevVal => (page === 1 ? data : [...prevVal, ...data]));
      setHasNextPage(data.length > 0);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.searchText) {
      searchNovels();
    } else {
      fetchNovels();
    }
  }, [page]);

  const fetchNextPage = () => {
    if (hasNextPage) {
      setPage(prevState => prevState + 1);
    }
  };

  const onClearSearch = () => {
    setLoading(true);
    setPage(1);
  };

  return {
    loading,
    error,
    source,
    novels,
    fetchNextPage,
    searchNovels,
    onClearSearch,
  };
};

export default useSource;
