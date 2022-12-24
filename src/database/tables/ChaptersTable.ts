export const createChaptersTableQuery = `
CREATE TABLE IF NOT EXISTS chapters (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    url TEXT, 
    novelId INTEGER NOT NULL, 
    name TEXT NOT NULL, 
    dateUpload INTEGER, 
    dateFetched INTEGER, 
    scanlator TEXT, 
    bookmark BOOLEAN NOT NULL DEFAULT 0, 
    \`read\` INTEGER NOT NULL DEFAULT 0, 
    downloaded INTEGER NOT NULL DEFAULT 0, 
    UNIQUE(novelId, url), 
    FOREIGN KEY (novelId) REFERENCES novels(id) ON DELETE CASCADE
  )
`;
