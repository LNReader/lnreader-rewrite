import { useEffect, useState } from 'react';
import { defaultTo } from 'lodash';

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
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const hasNextPage = page <= totalPages;
  const source = SourceFactory.getSource(params.sourceId);

  const fetchNovels = async () => {
    try {
      const res = await source?.getPopoularNovels({ page });

      const data = res?.novels || [];

      setNovels(prevVal => (page === 1 ? data : [...prevVal, ...data]));
      setTotalPages(defaultTo(res?.totalPages, 1));
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
      setLoading(true);
      const res = await source?.getSearchNovels({
        searchTerm: params.searchText,
        page,
      });

      const data = res?.novels || [];

      setNovels(prevVal => (page === 1 ? data : [...prevVal, ...data]));
      setTotalPages(defaultTo(res?.totalPages, 1));
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNovels();
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
