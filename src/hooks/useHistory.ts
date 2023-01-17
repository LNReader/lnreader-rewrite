import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { History } from '@database/types';
import {
  deleteAllHistory,
  getHistory,
  removeHistoryById,
} from '@database/queries/HistoryQueries';

interface UseHistoryProps {
  searchText?: string;
}

export const useHistory = ({ searchText = '' }: UseHistoryProps) => {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<History[]>([]);
  const [error, setError] = useState<Error>();

  const getHistoryFromDb = async () => {
    try {
      const dbHistory = await getHistory();
      setHistory(dbHistory);
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
      getHistoryFromDb();
    }, []),
  );

  const clearHistoryById = async (historyId: number) => {
    removeHistoryById(historyId);
    getHistoryFromDb();
  };

  const clearAllHistory = async () => {
    deleteAllHistory();
    setHistory([]);
  };

  const filteredHistory = history.filter(item =>
    item.novelName.toLowerCase().includes(searchText?.toLowerCase()),
  );

  return {
    history: filteredHistory,
    loading,
    error,
    refetch: getHistoryFromDb,
    clearHistoryById,
    clearAllHistory,
  };
};
