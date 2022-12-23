import {NovelStatus} from '../types';

const DEFAULT_CATEGORIES = [1];

export const createNovelTableQuery = `
    CREATE TABLE IF NOT EXISTS novels (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT NOT NULL,
        title TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT ${NovelStatus.UNKNOWN},
        coverUrl TEXT,
        genre TEXT,
        description TEXT,
        favorite INTEGER NOT NULL DEFAULT 0,
        lastUpdate INTEGER,
        nextUpdate INTEGER,
        initialized INTEGER NOT NULL DEFAULT 0,
        dateAdded INTEGER NOT NULL,
        categoryIds TEXT DEFAULT ${JSON.stringify(DEFAULT_CATEGORIES)}
    )
`;
