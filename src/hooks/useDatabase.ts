import {useEffect} from 'react';
import * as SQLite from 'expo-sqlite';

import {DATABASE_NAME} from 'database/constants';

import {createNovelsTableQuery} from 'database/tables/NovelsTable';
import {
  createCategoriesTableQuery,
  createDefaultCategoryQuery,
} from 'database/tables/CategoriesTable';
import {createChaptersTableQuery} from 'database/tables/ChaptersTable';

const db = SQLite.openDatabase(DATABASE_NAME);

const useDatabase = () => {
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(createCategoriesTableQuery);
      tx.executeSql(createNovelsTableQuery);
      tx.executeSql(createChaptersTableQuery);
    });
  }, []);

  // useEffect(() => {
  //   db.transaction(tx => {
  //     tx.executeSql('DROP TABLE novels');
  //     tx.executeSql('DROP TABLE chapters');
  //     tx.executeSql('DROP TABLE categories');
  //   });
  // }, []);

  return true;
};

export default useDatabase;
