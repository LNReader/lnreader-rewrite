export const createUpdatesTableQuery = `
CREATE TABLE IF NOT EXISTS updates (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    chapterId INTEGER NOT NULL UNIQUE, 
    dateFetched INTEGER NOT NULL,
    FOREIGN KEY (chapterId) REFERENCES chapters (id) ON DELETE CASCADE
  )
`;
