export const createDownloadTableQuery = `
CREATE TABLE IF NOT EXISTS downloads (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    chapterId INTEGER NOT NULL UNIQUE, 
    text TEXT, 
    FOREIGN KEY (chapterId) REFERENCES chapters (id) ON DELETE CASCADE
  )
`;
