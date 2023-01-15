import { lazy, useEffect, useState } from 'react';

import { Category } from '@database/types';
import { getCategories } from '@database/queries/CategoryQueries';

interface UseCategoriesProps {
  showDefaultCategory?: boolean;
  lazy?: boolean;
}

export const useCategories = ({
  showDefaultCategory = false,
  lazy,
}: UseCategoriesProps) => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<Error>();

  const getCategoriesFromDb = async () => {
    try {
      const dbCategories = await getCategories();

      if (!showDefaultCategory) {
        dbCategories.shift();
      }

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
    if (!lazy) {
      getCategoriesFromDb();
    }
  }, [lazy]);

  return {
    categories,
    loading,
    error,
    refetch: getCategoriesFromDb,
  };
};
