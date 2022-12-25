import {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {History} from 'database/types';
import {getHistory, removeHistoryById} from 'database/queries/HistoryQueries';

interface UseHistoryProps {
  searchText?: string;
}

export const useHistory = ({searchText}: UseHistoryProps) => {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<History[]>([]);
  const [error, setError] = useState('');

  const getHistoryFromDb = async () => {
    try {
      const dbHistory = await getHistory();
      console.log(JSON.stringify(dbHistory, null, 2));
      setHistory(dbHistory);
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
      getHistoryFromDb();
    }, []),
  );

  const removeHistory = async (historyId: number) => {
    removeHistoryById(historyId);
    getHistoryFromDb();
  };

  const filteredHistory = history.filter(item =>
    item.title.toLowerCase().includes(searchText?.toLowerCase() || ''),
  );

  return {
    history: filteredHistory,
    loading,
    error,
    removeHistory,
  };
};
