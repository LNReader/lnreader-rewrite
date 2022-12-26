import * as SQLite from 'expo-sqlite';

import {DATABASE_NAME} from 'database/constants';
import {DatabaseChapter} from 'database/types';
import {txnErrorCallback} from 'database/utils';
import {SourceNovelChapter} from 'sources/types';
import {escape, noop} from 'lodash';
import {MMKVStorage} from 'utils/mmkv/mmkv';
import {NovelStorageMap, NOVEL_STORAGE} from 'hooks/useNovelStorage';
import {NovelSortOrder} from 'utils/novelUtils';

const db = SQLite.openDatabase(DATABASE_NAME);

const getChaptersByNovelIdQuery = `
SELECT 
  * 
FROM 
  chapters 
WHERE 
  novelId = ? 
`;

export const getChaptersByNovelId = (
  novelId: number,
): Promise<DatabaseChapter[]> => {
  const rawSettings = MMKVStorage.getString(NOVEL_STORAGE) || '{}';
  const parsedSettings: NovelStorageMap = JSON.parse(rawSettings);

  const {FILTERS, SORT_ORDER = NovelSortOrder.BY_SOURCE_ASC} =
    parsedSettings[novelId] || {};

  let query = getChaptersByNovelIdQuery;

  if (FILTERS) {
    query += FILTERS?.join('');
  }

  if (SORT_ORDER) {
    query += ' ORDER BY  ' + SORT_ORDER;
  }

  return new Promise(resolve =>
    db.transaction(tx => {
      tx.executeSql(
        query,
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
        scanlator, chapterNumber
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
        ${chapter.scanlator || 'NULL'},
        ${chapter.chapterNumber || -1}
      )`,
    );
  });

  insertChaptersQuery += valuesArr.toString() + ';';

  db.transaction(tx => {
    tx.executeSql(insertChaptersQuery, undefined, undefined, txnErrorCallback);
  });
};
