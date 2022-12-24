import * as SQLite from 'expo-sqlite';

import {DATABASE_NAME} from 'database/constants';
import {DatabaseChapter} from 'database/types';
import {txnErrorCallback} from 'database/utils';
import {SourceNovelChapter} from 'sources/types';
import {escape, noop} from 'lodash';

const db = SQLite.openDatabase(DATABASE_NAME);

const getChaptersByNovelIdQuery = `
SELECT 
  * 
FROM 
  chapters 
WHERE 
  novelId = ? 
ORDER BY 
  id
`;

export const getChaptersByNovelId = (
  novelId: number,
): Promise<DatabaseChapter[]> => {
  return new Promise(resolve =>
    db.transaction(tx => {
      tx.executeSql(
        getChaptersByNovelIdQuery,
        [novelId],
        (txObj, {rows: {_array}}) => resolve(_array),
        txnErrorCallback,
      );
    }),
  );
};

export const insertChapters = async (
  novelId: number,
  chapters?: SourceNovelChapter[],
) => {
  let insertChaptersQuery = `
    INSERT INTO chapters (
        novelId, url, name, dateUpload, dateFetched, 
        scanlator
    ) 
    VALUES 
  `;

  const valuesArr: string[] = [];

  chapters?.forEach(chapter => {
    valuesArr.push(
      `(
        ${novelId}, 
        "${escape(chapter.url)}", 
        "${escape(chapter.name)}", 
        ${chapter.dateUpload || 'NULL'}, 
        ${Date.now()}, 
        ${chapter.scanlator || 'NULL'}
      )`,
    );
  });

  insertChaptersQuery += valuesArr.toString() + ';';

  db.transaction(tx => {
    tx.executeSql(insertChaptersQuery, undefined, undefined, txnErrorCallback);
  });
};
