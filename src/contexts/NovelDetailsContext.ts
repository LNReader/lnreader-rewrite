import {createContext, useContext} from 'react';

import {DatabaseChapter, DatabaseNovel} from 'database/types';

interface NovelContextProps {
  loading: boolean;
  novel: DatabaseNovel;
  chapters?: DatabaseChapter[];
  error?: string;
  handleSetNovelFavorite: (val: boolean) => void;
}

const novelDetails = {
  loading: true,
};

export const NovelDetailsContext = createContext<NovelContextProps>(
  novelDetails as NovelContextProps,
);

export const useNovelDetailsContext = () => useContext(NovelDetailsContext);
