export const createHistoryTableQuery = `
CREATE TABLE IF NOT EXISTS history (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    novelId INTEGER NOT NULL, 
    chapterId INTEGER NOT NULL UNIQUE, 
    lastRead INTEGER NOT NULL, 
    timeRead INTEGER, 
    FOREIGN KEY (chapterId) REFERENCES chapters (id) ON DELETE CASCADE
  );
`;

export const createHistoryChapterIdIndexQuery =
  'CREATE INDEX IF NOT EXISTS historyChapterIdIndex ON history (chapterId)';
