import React, { createContext, useContext } from 'react';

import { LibraryNovel } from '@database/types';
import { useQuery } from '@hooks';
import { GetLibraryNovelsQuery } from '@database/queries/NovelQueries';

interface LibraryContextProps {
  novels: LibraryNovel[];
  refetch: () => void;
}

const libraryNovels = {
  novels: [],
  refetch: () => undefined,
};

export const LibraryContext = createContext<LibraryContextProps>(
  libraryNovels as unknown as LibraryContextProps,
);

export const LibraryProvider = (
  props: React.PropsWithChildren<unknown>,
): React.ReactElement => {
  const { data: novels = [], refetch } = useQuery<LibraryNovel[]>(
    GetLibraryNovelsQuery,
  );

  return (
    <LibraryContext.Provider value={{ novels, refetch }}>
      {props.children}
    </LibraryContext.Provider>
  );
};

export const useLibraryContext = () => useContext(LibraryContext);
