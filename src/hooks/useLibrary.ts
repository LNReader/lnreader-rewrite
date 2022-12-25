import {useCallback, useEffect, useState} from 'react';

import {getLibraryNovels} from 'database/queries/NovelQueries';
import {Category, DatabaseNovel} from 'database/types';
import {useFocusEffect} from '@react-navigation/native';
import {getCategories} from 'database/queries/CategoryQueries';

type Library = Category & {novels: DatabaseNovel[]};

export const useLibrary = () => {
  const [loading, setLoading] = useState(true);
  const [library, setLibrary] = useState<Library[]>([]);
  const [error, setError] = useState('');

  const getNovels = async () => {
    try {
      const [dbCatgories, dbNovels] = await Promise.all([
        getCategories(),
        getLibraryNovels(),
      ]);

      const data = dbCatgories.map(category => {
        if (category.id === 1) {
          category.name = 'Default';
        }

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
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getNovels();
    }, []),
  );

  return {
    library,
    loading,
    error,
  };
};
