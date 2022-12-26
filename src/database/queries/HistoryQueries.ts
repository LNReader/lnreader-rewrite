import * as SQLite from 'expo-sqlite';

import {History} from 'database/types';
import {DATABASE_NAME} from 'database/constants';
import {txnErrorCallback} from 'database/utils';

const db = SQLite.openDatabase(DATABASE_NAME);

const getHistoryQuery = `
SELECT 
  history.*, 
  chapters.id as CTChapterId,
  chapters.name,
  chapters.url,
  novels.id as NTNovelId,
  novels.title,
  novels.coverUrl,
  novels.sourceId
FROM 
  history 
  JOIN chapters ON history.chapterId = CTChapterId 
  JOIN novels ON history.novelId = NTNovelId 
GROUP BY 
  NTNovelId 
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
        (_txObj, {rows: {_array}}) => resolve(_array),
        txnErrorCallback,
      );
    }),
  );
};

const insertChapterInHistoryQuery = `
INSERT OR REPLACE INTO history (novelId, chapterId, lastRead) 
VALUES 
  (?, ?, ?)
`;

export const insertChapterInHistory = async (
  novelId: number,
  chapterId: number,
) => {
  db.transaction(tx =>
    tx.executeSql(
      insertChapterInHistoryQuery,
      [novelId, chapterId, Date.now()],
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
