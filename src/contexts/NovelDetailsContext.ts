import { createContext, useContext } from 'react';

import { DatabaseChapter, DatabaseNovel, NovelStatus } from '@database/types';

interface NovelContextProps {
  loading: boolean;
  novel: DatabaseNovel;
  chapters?: DatabaseChapter[];
  error?: string;
  handleSetNovelFavorite: (val: boolean) => void;
}

const novelDetails = {
  loading: true,
  novel: {
    author: 'Unknown author',
    status: NovelStatus.UNKNOWN,
  },
};

export const NovelDetailsContext = createContext<NovelContextProps>(
  novelDetails as unknown as NovelContextProps,
);

export const useNovelDetailsContext = () => useContext(NovelDetailsContext);
