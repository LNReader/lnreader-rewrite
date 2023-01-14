import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { Update } from '@database/types';
import { getUpdates } from '@database/queries/UpdateQueries';
import useDownloader from './useDownloader';

interface UseUpdatesProps {
  searchText?: string;
}

export const useUpdates = ({ searchText = '' }: UseUpdatesProps) => {
  const [loading, setLoading] = useState(true);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [error, setError] = useState<Error>();

  const { downloadQueue } = useDownloader();

  const getUpdatesFromDb = async () => {
    try {
      const dbHistory = await getUpdates();
      setUpdates(dbHistory);
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
      getUpdatesFromDb();
    }, [JSON.stringify(downloadQueue)]),
  );

  const filteredUpdates = updates.filter(item =>
    item.novelName.toLowerCase().includes(searchText?.toLowerCase()),
  );

  return {
    updates: filteredUpdates,
    loading,
    error,
  };
};
