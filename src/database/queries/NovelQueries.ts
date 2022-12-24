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
  favorite = 1
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

export const toggleNovelFavorite = async (id: number, value: boolean) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE novels SET favorite = ? WHERE id = ?',
      [+value, id],
      undefined,
      txnErrorCallback,
    );
  });
};

const insertNovelQuery = `
INSERT INTO novels (
  url, title, status, coverUrl, genre, 
  description, dateAdded, 
  author, artist, sourceId
) 
VALUES 
  (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
