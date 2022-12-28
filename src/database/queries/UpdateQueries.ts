import * as SQLite from 'expo-sqlite';

import { History } from '@database/types';
import { DATABASE_NAME } from '@database/constants';
import { txnErrorCallback } from '@database/utils';

const db = SQLite.openDatabase(DATABASE_NAME);

const getHistoryQuery = `
SELECT 
  U.id, 
  U.chapterId, 
  U.dateFetched,
  C.name as chapterName,
  N.title as novelName,
  N.id as novelId,
FROM 
  history as H 
  JOIN chapters as C ON U.chapterId = C.id
  JOIN novels as N on C.novelId = N.id
ORDER BY
    U.dateFetched DESC
`;

export const getUpdates = (): Promise<History[]> => {
  return new Promise(resolve =>
    db.transaction(tx => {
      tx.executeSql(
        getHistoryQuery,
        undefined,
        (_txObj, { rows: { _array } }) => resolve(_array),
        txnErrorCallback,
      );
    }),
  );
};
