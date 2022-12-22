export const createCategoriesTableQuery = `
    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER NOT NULL PRIMARY KEY,
        name TEXT NOT NULL,
        sort INTEGER DEFAULT NULL,
        flags INTEGER DEFAULT 0
    )
`;

export const createDefaultCategoryQuery =
  'INSERT INTO categories (id, name, sort) VALUES (1, "", -1);';
