import * as SQLite from 'expo-sqlite';
import { noop } from 'lodash-es';

import { getAppSettings } from '@hooks/useAppSettings';

import { DATABASE_NAME, DEFAULT_CATEGORIES } from '@database/constants';
import { DatabaseNovel, LibraryNovel } from '@database/types';
import { txnErrorCallback } from '@database/utils';

import { SourceNovelDetails } from '@sources/types';
import { LibrarySortOrder } from '@utils/LibraryUtils';

const db = SQLite.openDatabase(DATABASE_NAME);

export const GetLibraryNovelsQuery = `
SELECT 
  * 
FROM 
  novels 
LEFT JOIN (
  SELECT chapters.novelId, COUNT(*) AS chaptersUnread 
  FROM chapters
  WHERE chapters.read = 0
  GROUP BY chapters.novelId
) AS C
ON novels.id = C.novelId
LEFT JOIN (
  SELECT chapters.novelId, COUNT(*) AS chaptersDownloaded 
  FROM chapters
  WHERE chapters.downloaded = 1
  GROUP BY chapters.novelId
) AS D
ON novels.id = D.novelId
LEFT JOIN (
  SELECT history.id as novelId, lastRead
  FROM history
  GROUP BY history.id
  HAVING history.lastRead = MAX(history.lastRead)
  ORDER BY history.lastRead DESC
) AS H
ON novels.id = H.novelId
WHERE 
  favorite = 1
`;

export const getLibraryNovels = (
  searchTerm?: string,
): Promise<LibraryNovel[]> => {
  let query = GetLibraryNovelsQuery;

  const {
    LIBRARY_FILTERS,
    LIBRARY_SORT_ORDER = LibrarySortOrder.DateAdded_ASC,
  } = getAppSettings();

  if (LIBRARY_FILTERS) {
    query += LIBRARY_FILTERS?.join('');
  }

  if (searchTerm) {
    query += ` AND title LIKE '%${searchTerm}%'`;
  }

  if (LIBRARY_SORT_ORDER) {
    query += ' ORDER BY  ' + LIBRARY_SORT_ORDER;
  }

  return new Promise(resolve =>
    db.transaction(tx => {
      tx.executeSql(
        query,
        undefined,
        (_txObj, { rows: { _array } }) => resolve(_array),
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
        (_txObj, { rows }) => resolve(rows.item(0)),
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
        (_txObj, { rows }) => resolve(rows.item(0)),
        txnErrorCallback,
      );
    }),
  );
};

export const setNovelFavorite = async (id: number, value: boolean) => {
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
  author, artist, sourceId, categoryIds
) 
VALUES 
  (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

export const insertNovel = async (
  novel: SourceNovelDetails,
): Promise<number> => {
  const { DEFAULT_CATEGORY = 1 } = getAppSettings();

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
          JSON.stringify([DEFAULT_CATEGORY]),
        ],
        (_txObj, { insertId: novelId }) => {
          if (novelId) {
            resolve(novelId);
          }
        },
        txnErrorCallback,
      ),
    ),
  );
};

const updateNovelMetadataQuery = `
UPDATE 
  novels 
SET 
  title = ?, 
  status = ?, 
  coverUrl = ?, 
  genre = ?, 
  description = ?, 
  author = ?, 
  artist = ? 
WHERE 
  id = ?
`;

export const updateNovelMetadata = async (
  novel: SourceNovelDetails,
): Promise<number> => {
  return new Promise(resolve =>
    db.transaction(tx =>
      tx.executeSql(
        updateNovelMetadataQuery,
        [
          novel.title,
          novel.status || null,
          novel.coverUrl || null,
          novel.genre || null,
          novel.description || null,
          novel.author || null,
          novel.artist || null,
        ],
        (_txObj, { insertId: novelId }) => {
          if (novelId) {
            resolve(novelId);
          }
        },
        txnErrorCallback,
      ),
    ),
  );
};

const updateNovelCategoryByIdsQuery = `
UPDATE 
  novels 
SET 
  categoryIds = ? 
WHERE 
  id IN 
`;

export const updateNovelCategoryByIds = async (
  novelIds: number[],
  categoryIds: number[],
) => {
  const query = updateNovelCategoryByIdsQuery + `(${novelIds.toString()})`;

  db.transaction(tx => {
    tx.executeSql(
      query,
      [JSON.stringify(categoryIds.length ? categoryIds : DEFAULT_CATEGORIES)],
      noop,
      txnErrorCallback,
    );
  });
};
