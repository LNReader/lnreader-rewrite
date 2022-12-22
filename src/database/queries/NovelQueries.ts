import {DATABASE_NAME} from 'database/constants';
import * as SQLite from 'expo-sqlite';

import {Novel} from 'database/types';

import {txnErrorCallback} from 'database/utils';

const db = SQLite.openDatabase(DATABASE_NAME);

const getLibraryNovelsQuery = `
SELECT 
  * 
FROM 
  novels 
WHERE 
  favourite = 1
`;

export const getLibraryNovels = (): Promise<Novel[]> => {
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
