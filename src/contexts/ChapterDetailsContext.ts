import { createContext, useContext } from 'react';

import { DatabaseChapter } from '@database/types';

interface ChapterDetailsContextProps {
  sourceId: number;
  novelName: string;
  chapter: DatabaseChapter;
}

export const ChapterDetailsContext = createContext(
  {} as ChapterDetailsContextProps,
);

export const useChapterDetailsContext = () => useContext(ChapterDetailsContext);
