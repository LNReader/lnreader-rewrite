import * as SQLite from 'expo-sqlite';

import { History } from '@database/types';
import { DATABASE_NAME } from '@database/constants';
import { txnErrorCallback } from '@database/utils';

const db = SQLite.openDatabase(DATABASE_NAME);

const getHistoryQuery = `
SELECT 
  history.*, 
  C.name as chapterName,
  C.url as chapterUrl,
  N.id as novelId,
  N.title as novelName,
  N.coverUrl,
  N.sourceId
FROM 
  history 
  JOIN chapters as C ON history.chapterId = C.id 
  JOIN novels as N ON C.id  = N.id 
GROUP BY 
  N.id 
HAVING 
  history.lastRead = MAX(history.lastRead) 
ORDER BY 
  history.lastRead DESC
`;

export const getHistory = (): Promise<History[]> => {
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

const insertChapterInHistoryQuery = `
INSERT OR REPLACE INTO history (chapterId, lastRead) 
VALUES 
  (?, ?)
`;

export const insertChapterInHistory = async (chapterId: number) => {
  db.transaction(tx =>
    tx.executeSql(
      insertChapterInHistoryQuery,
      [chapterId, Date.now()],
      undefined,
      txnErrorCallback,
    ),
  );
};

export const removeHistoryById = async (historyId: number) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM history WHERE id = ?',
      [historyId],
      undefined,
      txnErrorCallback,
    );
  });
};

export const removeHistoryByChapterId = async (chapterId: number) => {
  db.transaction(tx =>
    tx.executeSql(
      'DELETE FROM history WHERE chapterId = ?',
      [chapterId],
      undefined,
      txnErrorCallback,
    ),
  );
};
