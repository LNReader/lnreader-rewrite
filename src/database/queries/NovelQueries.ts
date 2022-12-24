import * as SQLite from 'expo-sqlite';

import {DATABASE_NAME} from 'database/constants';
import {DatabaseNovel} from 'database/types';

import {txnErrorCallback} from 'database/utils';
import {SourceNovelDetails} from 'sources/types';

const db = SQLite.openDatabase(DATABASE_NAME);

const getLibraryNovelsQuery = `
SELECT 
  * 
FROM 
  novels 
WHERE 
  favourite = 1
`;

export const getLibraryNovels = (): Promise<DatabaseNovel[]> => {
  return new Promise(resolve =>
    db.transaction(tx => {
      tx.executeSql(
        getLibraryNovelsQuery,
        undefined,
        (_txObj, {rows: {_array}}) => resolve(_array),
        txnErrorCallback,
      );
    }),
  );
};

export const getNovelById = async (id: number): Promise<DatabaseNovel> => {
  return new Promise(resolve =>
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM novels WHERE id = ?',
        [id],
        (_txObj, {rows}) => resolve(rows.item(0)),
        txnErrorCallback,
      );
    }),
  );
};

export const getNovel = async (
  sourceId: number,
  url: string,
): Promise<DatabaseNovel> => {
  return new Promise(resolve =>
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM novels WHERE url = ? AND sourceId = ?',
        [url, sourceId],
        (_txObj, {rows}) => resolve(rows.item(0)),
        txnErrorCallback,
      );
    }),
  );
};

const insertNovelQuery = `
INSERT INTO novels (
  url, title, status, coverUrl, genre, 
  description, favorite, dateAdded, 
  author, artist, sourceId
) 
VALUES 
  (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

export const insertNovel = async (
  novel: SourceNovelDetails,
): Promise<number> => {
  return new Promise(resolve =>
    db.transaction(tx =>
      tx.executeSql(
        insertNovelQuery,
        [
          novel.url,
          novel.title,
          novel.status || null,
          novel.coverUrl || null,
          novel.genre || null,
          novel.description || null,
          1,
          Date.now(),
          novel.author || null,
          novel.artist || null,
          novel.sourceId,
        ],
        (_txObj, {insertId: novelId}) => {
          if (novelId) {
            resolve(novelId);
          }
        },
        txnErrorCallback,
      ),
    ),
  );
};
