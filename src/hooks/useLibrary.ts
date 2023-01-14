import { useCallback, useState } from 'react';

import { getLibraryNovels } from '@database/queries/NovelQueries';
import { Category, LibraryNovel } from '@database/types';
import { useFocusEffect } from '@react-navigation/native';
import { getCategories } from '@database/queries/CategoryQueries';
import useAppSettings from './useAppSettings';

export type Library = Category & { novels: LibraryNovel[] };

interface UseLibraryProps {
  searchTerm?: string;
}

export const useLibrary = ({ searchTerm }: UseLibraryProps) => {
  const [loading, setLoading] = useState(true);
  const [library, setLibrary] = useState<Library[]>([]);
  const [error, setError] = useState<Error>();
  const { LIBRARY_FILTERS } = useAppSettings();

  const getNovels = async () => {
    try {
      const [dbCatgories, dbNovels] = await Promise.all([
        getCategories(),
        getLibraryNovels(searchTerm),
      ]);

      const data = dbCatgories.map(category => {
        return {
          ...category,
          novels: dbNovels.filter(novel =>
            JSON.parse(novel.categoryIds).includes(category.id),
          ),
        };
      });

      setLibrary(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getNovels();
    }, [searchTerm, LIBRARY_FILTERS]),
  );

  return {
    library,
    loading,
    error,
  };
};
