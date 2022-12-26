import {DEFAULT_CATEGORIES} from 'database/constants';
import {NovelStatus} from 'database/types';

export const createNovelsTableQuery = `
CREATE TABLE IF NOT EXISTS novels (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    sourceId INTEGER NOT NULL, 
    url TEXT NOT NULL, 
    title TEXT NOT NULL, 
    status TEXT DEFAULT "${NovelStatus.UNKNOWN}", 
    coverUrl TEXT, 
    genre TEXT, 
    description TEXT, 
    author TEXT, 
    artist TEXT, 
    favorite INTEGER NOT NULL DEFAULT 0, 
    lastUpdate INTEGER, 
    nextUpdate INTEGER, 
    initialized INTEGER NOT NULL DEFAULT 0, 
    dateAdded INTEGER NOT NULL, 
    categoryIds TEXT DEFAULT "${JSON.stringify(DEFAULT_CATEGORIES)}"
  )
`;

export const createLibraryFavoriteIndex =
  'CREATE INDEX libraryFavoriteIndex ON mangas(favorite) WHERE favorite = 1';
export const createNovelUrlIndex = 'CREATE INDEX novelUrlIndex ON novels(url)';
