import * as SQLite from 'expo-sqlite';
import { escape, noop } from 'lodash';

import { NovelStorageMap, NOVEL_STORAGE } from '@hooks/useNovelStorage';

import { DATABASE_NAME } from '@database/constants';
import { DatabaseChapter, DatabaseChapterWithSourceId } from '@database/types';
import { txnErrorCallback } from '@database/utils';

import { SourceNovelChapter } from '@sources/types';

import { MMKVStorage } from '@utils/mmkv/mmkv';
import { NovelSortOrder } from '@utils/NovelUtils';

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

  const { FILTERS, SORT_ORDER = NovelSortOrder.BY_SOURCE_ASC } =
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
        (txObj, { rows: { _array } }) => resolve(_array),
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
    INSERT OR IGNORE INTO chapters (
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

const setChapterReadQuery = `
UPDATE 
  chapters 
SET 
  \`read\` = 1 
WHERE 
  id = ?
`;

export const setChapterRead = async (id: number) =>
  db.transaction(tx =>
    tx.executeSql(setChapterReadQuery, [id], noop, txnErrorCallback),
  );

const setChaptersReadQuery = `
UPDATE 
  chapters 
SET 
  \`read\` = 1 
WHERE 
  id IN
`;

export const setChaptersRead = async (ids: number[]) => {
  const query = `${setChaptersReadQuery} (${ids.toString()})`;
  db.transaction(tx => tx.executeSql(query, undefined, noop, txnErrorCallback));
};

const setChaptersUnreadQuery = `
UPDATE 
  chapters 
SET 
  \`read\` = 0 
WHERE 
  id IN
`;

export const setChaptersUnread = async (ids: number[]) => {
  const query = `${setChaptersUnreadQuery} (${ids.toString()})`;
  db.transaction(tx => tx.executeSql(query, undefined, noop, txnErrorCallback));
};

const getPrevChapterQuery = `
SELECT 
  * 
FROM 
  chapters 
WHERE 
  novelId = ? 
  AND id < ? 
LIMIT 
  1
`;

export const getPrevChapter = (
  novelId: number,
  chapterId: number,
): Promise<DatabaseChapter> => {
  return new Promise(resolve =>
    db.transaction(tx => {
      tx.executeSql(
        getPrevChapterQuery,
        [novelId, chapterId],
        (_txObj, results) => resolve(results.rows.item(0)),
        txnErrorCallback,
      );
    }),
  );
};

const getNextChapterQuery = `
SELECT 
  * 
FROM 
  chapters 
WHERE 
  novelId = ? 
  AND id > ? 
LIMIT 
  1
`;

export const getNextChapter = (
  novelId: number,
  chapterId: number,
): Promise<DatabaseChapter> => {
  return new Promise(resolve =>
    db.transaction(tx => {
      tx.executeSql(
        getNextChapterQuery,
        [novelId, chapterId],
        (_txObj, results) => resolve(results.rows.item(0)),
        txnErrorCallback,
      );
    }),
  );
};

const getChaptersByNovelIdsQuery = `
SELECT 
  chapters.*,
  novels.sourceId 
FROM 
  chapters
  JOIN
    novels ON novels.id = chapters.novelId
WHERE 
  novelId
IN 
`;

export const getChaptersByNovelIds = (
  novelIds: number[],
): Promise<Array<DatabaseChapter & { sourceId: number }>> => {
  const query = getChaptersByNovelIdsQuery + `(${novelIds.toString()})`;

  return new Promise(resolve =>
    db.transaction(tx => {
      tx.executeSql(
        query,
        undefined,
        (txObj, { rows: { _array } }) => resolve(_array),
        txnErrorCallback,
      );
    }),
  );
};

const setChaptersReadByNovelIdsQuery = `
UPDATE 
  chapters
SET 
  \`read\` = 1 
WHERE 
  novelId IN
`;

export const setChaptersReadByNovelIds = async (ids: number[]) => {
  const query = `${setChaptersReadByNovelIdsQuery} (${ids.toString()})`;
  db.transaction(tx => tx.executeSql(query, undefined, noop, txnErrorCallback));
};

const setChaptersUnreadByNovelIdsQuery = `
UPDATE 
  chapters 
SET 
  \`read\` = 0 
WHERE 
  novelId IN
`;

export const setChaptersUnreadByNovelIds = async (ids: number[]) => {
  const query = `${setChaptersUnreadByNovelIdsQuery} (${ids.toString()})`;
  db.transaction(tx => tx.executeSql(query, undefined, noop, txnErrorCallback));
};

const getChaptersByChapterIdsQuery = `
SELECT 
  * 
FROM 
  chapters 
WHERE 
  id
IN 
`;

export const getChaptersByChapterIds = (
  chapterIds: number[],
): Promise<DatabaseChapterWithSourceId[]> => {
  const query = `${getChaptersByChapterIdsQuery} (${chapterIds.toString()})`;

  return new Promise(resolve =>
    db.transaction(tx => {
      tx.executeSql(
        query,
        undefined,
        (txObj, { rows: { _array } }) => resolve(_array),
        txnErrorCallback,
      );
    }),
  );
};
