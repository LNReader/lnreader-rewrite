import * as SQLite from 'expo-sqlite';
import { noop } from 'lodash-es';

import { DATABASE_NAME } from '@database/constants';
import {
  txnErrorCallback,
  txnErrorCallbackWithoutToast,
} from '@database/utils';
import SourceFactory from '@sources/SourceFactory';
import { DownloadedChapter } from '@database/types';

const db = SQLite.openDatabase(DATABASE_NAME);

const getDownloadedChapterQuery = `
SELECT 
  downloads.* 
FROM 
  downloads 
  JOIN chapters ON downloads.chapterId = chapters.id 
WHERE 
  downloads.chapterId = ?
`;

export const getDownloadedChapter = async (
  chapterId: number,
): Promise<DownloadedChapter> => {
  return new Promise(resolve =>
    db.transaction(tx => {
      tx.executeSql(
        getDownloadedChapterQuery,
        [chapterId],
        (_txObj, { rows }) => resolve(rows.item(0)),
        txnErrorCallback,
      );
    }),
  );
};

const setChapterDownloadedQuery = `
UPDATE 
  chapters 
SET 
  downloaded = 1 
WHERE 
  id = ?
`;

const insertIntoDownloadsQuery = `
INSERT INTO downloads (chapterId, text) 
VALUES 
  (?, ?)
`;

export const insertChapterInDownloads = async (
  sourceId: number,
  chapterId: number,
  url: string,
) => {
  const chapter = await SourceFactory.getSource(sourceId)?.getChapter({ url });

  db.transaction(tx => {
    tx.executeSql(
      insertIntoDownloadsQuery,
      [chapterId, chapter?.text || null],
      noop,
      txnErrorCallbackWithoutToast,
    );
    tx.executeSql(
      setChapterDownloadedQuery,
      [chapterId],
      noop,
      txnErrorCallbackWithoutToast,
    );
  });
};

const setChapterNotDownloadedQuery = `
UPDATE 
  chapters 
SET 
  downloaded = 0 
WHERE 
  id IN 
`;

const deleteDownloadsQuery = `
DELETE FROM downloads
WHERE 
  id IN 
`;

export const deleteDownloads = async (chapterIds: number[]) => {
  const chapterIdsString = chapterIds.toString();

  const deleteDownloadsQueryWithIds = `${deleteDownloadsQuery} (${chapterIdsString})`;
  const setChapterNotDownloadedQueryWithIds = `${setChapterNotDownloadedQuery} (${chapterIdsString})`;

  db.transaction(tx => {
    tx.executeSql(
      deleteDownloadsQueryWithIds,
      undefined,
      noop,
      txnErrorCallbackWithoutToast,
    );
    tx.executeSql(
      setChapterNotDownloadedQueryWithIds,
      undefined,
      noop,
      txnErrorCallbackWithoutToast,
    );
  });
};

const setChapterNotDownloadedByNovelIdsQuery = `
UPDATE 
  chapters 
SET 
  downloaded = 0 
WHERE 
  novelId IN 
`;

const deleteDownloadsByNovelIdsQuery = `
DELETE FROM downloads
JOIN chapters on chapters.id = downloads.chapterId
JOIN novels on novels.id = chapters.id
WHERE 
  novelId IN 
`;

export const deleteDownloadsByNovelIds = async (novelIds: number[]) => {
  const chapterIdsString = novelIds.toString();

  const deleteDownloadsQueryWithIds = `${deleteDownloadsByNovelIdsQuery} (${chapterIdsString})`;
  const setChapterNotDownloadedQueryWithIds = `${setChapterNotDownloadedByNovelIdsQuery} (${chapterIdsString})`;

  db.transaction(tx => {
    tx.executeSql(
      deleteDownloadsQueryWithIds,
      undefined,
      noop,
      txnErrorCallbackWithoutToast,
    );
    tx.executeSql(
      setChapterNotDownloadedQueryWithIds,
      undefined,
      noop,
      txnErrorCallbackWithoutToast,
    );
  });
};
