import * as SQLite from 'expo-sqlite';

import {DATABASE_NAME} from 'database/constants';
import {Category} from 'database/types';

import {txnErrorCallback} from 'database/utils';

const db = SQLite.openDatabase(DATABASE_NAME);

const getCategoriesQuery = `
SELECT 
  * 
FROM 
  categories 
ORDER BY 
  CASE WHEN id > 1 THEN 1 ELSE 0 END, 
  IFNULL(sort, 9999)
`;

export const getCategories = (): Promise<Category[]> => {
  return new Promise(resolve =>
    db.transaction(tx => {
      tx.executeSql(
        getCategoriesQuery,
        [],
        (txObj, {rows: {_array}}) => resolve(_array),
        txnErrorCallback,
      );
    }),
  );
};
