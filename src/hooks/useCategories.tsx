import { useEffect, useState } from 'react';

import { Category } from '@database/types';

import { getCategories } from '@database/queries/CategoryQueries';

export const useCategories = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<Error>();

  const getCategoriesFromDb = async () => {
    try {
      const dbCategories = await getCategories();

      /** Exclude Default Category */
      dbCategories.shift();

      setCategories(dbCategories);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategoriesFromDb();
  }, []);

  return {
    categories,
    loading,
    error,
    refetch: getCategoriesFromDb,
  };
};
