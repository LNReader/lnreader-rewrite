import { useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import { useMMKVBoolean } from 'react-native-mmkv';

import { DATABASE_NAME } from '@database/constants';

import {
  createLibraryFavoriteIndex,
  createNovelsTableQuery,
  createNovelUrlIndex,
} from '@database/tables/NovelsTable';
import {
  createCategoriesTableQuery,
  createDefaultCategoryQuery,
} from '@database/tables/CategoriesTable';
import {
  createChaptersNovelIdIndex,
  createChaptersTableQuery,
  createChaptersUnreadByNovelIndex,
} from '@database/tables/ChaptersTable';
import {
  dbTxnErrorCallback,
  txnErrorCallbackWithoutToast,
} from '@database/utils';
import {
  createHistoryChapterIdIndexQuery,
  createHistoryTableQuery,
} from '@database/tables/HistoryTable';
import { noop } from 'lodash-es';
import { createUpdatesTableQuery } from '@database/tables/UpdatesTable';
import { createDownloadTableQuery } from '@database/tables/DownloadsTable';
import { MMKVStorage } from '@utils/mmkv/mmkv';

const db = SQLite.openDatabase(DATABASE_NAME);

const DB_CREATED = 'DB_CREATED';

const useDatabase = () => {
  const [dbCreated = false, setDbCreated] = useMMKVBoolean(
    DB_CREATED,
    MMKVStorage,
  );

  const createTables = () => {
    db.transaction(
      tx => {
        tx.executeSql(createCategoriesTableQuery, [], () => {
          tx.executeSql(
            createDefaultCategoryQuery,
            undefined,
            noop,
            txnErrorCallbackWithoutToast,
          );
        });
        tx.executeSql(createNovelsTableQuery);
        tx.executeSql(createChaptersTableQuery);
        tx.executeSql(createHistoryTableQuery);
        tx.executeSql(createUpdatesTableQuery);
        tx.executeSql(createDownloadTableQuery);
      },
      dbTxnErrorCallback,
      () => {
        setDbCreated(true);
        createIndexes();
      },
    );
  };

  const createIndexes = () => {
    db.transaction(tx => {
      tx.executeSql(createNovelUrlIndex);
      tx.executeSql(createLibraryFavoriteIndex);
      tx.executeSql(createChaptersNovelIdIndex);
      tx.executeSql(createChaptersUnreadByNovelIndex);
      tx.executeSql(createHistoryChapterIdIndexQuery);
    });
  };

  useEffect(() => {
    if (!dbCreated) {
      createTables();
      createIndexes();
    }
  }, []);

  const dropTables = () => {
    db.transaction(tx => {
      tx.executeSql('DROP TABLE novels');
      tx.executeSql('DROP TABLE chapters');
      tx.executeSql('DROP TABLE categories');
      tx.executeSql('DROP TABLE history');
      tx.executeSql('DROP TABLE updates');
      tx.executeSql('DROP TABLE downloads');
    });
  };

  return { dropTables, isDbCreated: dbCreated };
};

export default useDatabase;
