import * as SQLite from 'expo-sqlite';
import { defaultTo, noop } from 'lodash-es';

import { DATABASE_NAME } from '@database/constants';
import { Category } from '@database/types';

import { txnErrorCallback } from '@database/utils';

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
        (txObj, { rows: { _array } }) => resolve(_array),
        txnErrorCallback,
      );
    }),
  );
};

const isCategoryDuplicateQuery = `
SELECT 
  COUNT(*) as isDuplicate 
FROM 
  categories 
WHERE 
  name = ?
`;

export const isCategoryDuplicate = (name: string): Promise<boolean> => {
  return new Promise(resolve =>
    db.transaction(tx => {
      tx.executeSql(
        isCategoryDuplicateQuery,
        [name],
        (txObj, { rows: { _array } }) =>
          resolve(Boolean(_array[0]?.isDuplicate)),
        txnErrorCallback,
      );
    }),
  );
};

const createCategoryQuery = `
INSERT INTO categories (name) 
VALUES 
  (?)`;

export const createCategory = (name: string): void =>
  db.transaction(tx =>
    tx.executeSql(createCategoryQuery, [name], noop, txnErrorCallback),
  );

const updateCategoryQuery = `
UPDATE 
  categories 
SET 
  name = ? 
WHERE 
  id = ?`;

export const updateCategory = (id: number, name: string): void =>
  db.transaction(tx =>
    tx.executeSql(updateCategoryQuery, [name, id], noop, txnErrorCallback),
  );

const deleteCategoryQuery = `
DELETE FROM 
  categories 
WHERE 
  id = ?
`;

export const deleteCategoryById = (id: number): void =>
  db.transaction(tx =>
    tx.executeSql(deleteCategoryQuery, [id], noop, txnErrorCallback),
  );

const updateCategoriesSortQuery = `
UPDATE 
  categories 
SET 
  sort = ? 
WHERE 
  id = ?
`;

export const updateCategoriesSort = (categories: Category[]): void =>
  db.transaction(tx => {
    categories.map(category => {
      tx.executeSql(
        updateCategoriesSortQuery,
        [defaultTo(category.sort, 0), category.id],
        noop,
        txnErrorCallback,
      );
    });
  });
