import { useEffect } from 'react';
import * as SQLite from 'expo-sqlite';

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
  txnErrorCallback,
  txnErrorCallbackWithoutToast,
} from '@database/utils';
import {
  createHistoryChapterIdIndexQuery,
  createHistoryTableQuery,
} from '@database/tables/HistoryTable';
import { noop } from 'lodash';
import {
  createUpdatesChapterIdIndexQuery,
  createUpdatesTableQuery,
} from '@database/tables/UpdatesTable';

const db = SQLite.openDatabase(DATABASE_NAME);

const useDatabase = () => {
  useEffect(() => {
    db.transaction(tx => {
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
      tx.executeSql(createUpdatesTableQuery, undefined, noop, txnErrorCallback);

      tx.executeSql(createNovelUrlIndex);
      tx.executeSql(createLibraryFavoriteIndex);
      tx.executeSql(createChaptersNovelIdIndex);
      tx.executeSql(createChaptersUnreadByNovelIndex);
      tx.executeSql(createHistoryChapterIdIndexQuery);
      // tx.executeSql(createUpdatesChapterIdIndexQuery);
    });
  }, []);
  // useEffect(() => {
  //   db.transaction(tx => {
  //     tx.executeSql('DROP TABLE novels');
  //     tx.executeSql('DROP TABLE chapters');
  //     tx.executeSql('DROP TABLE categories');
  //     tx.executeSql('DROP TABLE history');
  //     tx.executeSql('DROP TABLE updates');
  //   });
  // }, []);
};

export default useDatabase;
