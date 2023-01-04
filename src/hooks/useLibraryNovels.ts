import { useEffect, useState } from 'react';

import { LibraryNovel } from '@database/types';
import { getLibraryNovels } from '@database/queries/NovelQueries';

const useLibraryNovels = () => {
  const [loading, setLoading] = useState(true);
  const [novels, setNovels] = useState<LibraryNovel[]>([]);
  const [error, setError] = useState<Error>();

  const getNovels = async () => {
    try {
      const dbNovels = await getLibraryNovels();

      setNovels(dbNovels);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNovels();
  }, []);

  return { loading, novels, error, refetch: getNovels };
};

export default useLibraryNovels;
