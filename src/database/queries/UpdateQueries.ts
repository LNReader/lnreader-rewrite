import * as SQLite from 'expo-sqlite';

import { DatabaseChapter, Update } from '@database/types';
import { DATABASE_NAME } from '@database/constants';
import { txnErrorCallback } from '@database/utils';

const db = SQLite.openDatabase(DATABASE_NAME);

const getUpdatesQuery = `
SELECT 
  U.id, 
  U.chapterId, 
  U.dateFetched,
  C.name as chapterName,
  N.title as novelName,
  N.id as novelId
FROM 
  updates as U
  JOIN chapters as C ON U.chapterId = C.id
  JOIN novels as N on C.novelId = N.id
ORDER BY
  U.dateFetched DESC
`;

export const getUpdates = (): Promise<Update[]> => {
  return new Promise(resolve =>
    db.transaction(tx => {
      tx.executeSql(
        getUpdatesQuery,
        undefined,
        (_txObj, { rows: { _array } }) => resolve(_array),
        txnErrorCallback,
      );
    }),
  );
};

export const insertUpdates = async (chapters?: DatabaseChapter[]) => {
  let insertUpdatesQuery = `
    INSERT INTO updates (chapterId, dateFetched) 
    VALUES
  `;

  const valuesArr: string[] = [];

  chapters?.forEach(chapter => {
    valuesArr.push(
      `(
        ${chapter.id}, 
        ${Date.now()} 
      )`,
    );
  });

  insertUpdatesQuery += valuesArr.toString() + ';';

  db.transaction(tx => {
    tx.executeSql(insertUpdatesQuery, undefined, undefined, txnErrorCallback);
  });
};
