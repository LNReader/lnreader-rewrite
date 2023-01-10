export const createChaptersTableQuery = `
CREATE TABLE IF NOT EXISTS chapters (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    url TEXT, 
    novelId INTEGER NOT NULL, 
    name TEXT NOT NULL,
    chapterNumber INTEGER DEFAULT -1,
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

export const createChaptersNovelIdIndex =
  'CREATE INDEX IF NOT EXISTS chaptersNovelIdIndex ON chapters (novelId)';

export const createChaptersUnreadByNovelIndex =
  'CREATE INDEX IF NOT EXISTS chaptersUnreadByNovelIndex ON chapters(novelId, `read`) WHERE `read` = 0;';
