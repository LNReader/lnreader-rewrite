import { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';

import { DATABASE_NAME } from '@database/constants';
import { txnErrorCallback } from '@database/utils';

const db = SQLite.openDatabase(DATABASE_NAME);

interface UseQueryReturn<T> {
  loading: boolean;
  data?: T;
  error?: Error;
  refetch: () => void;
}

const useQuery = <T>(query: string): UseQueryReturn<T> => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  const [data, setData] = useState<T>();

  const executeQuery = () => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          query,
          undefined,
          (txObj, { rows: { _array } }) => setData(_array as unknown as T),
          txnErrorCallback,
        );
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    executeQuery();
  }, []);

  return { loading, data, error, refetch: executeQuery };
};

export default useQuery;
