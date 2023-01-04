import React, { createContext, useContext } from 'react';

import { LibraryNovel } from '@database/types';
import { useLibraryNovels } from '@hooks';

interface LibraryContextProps {
  novels: LibraryNovel[];
  refetch: () => Promise<void>;
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
  const { novels, refetch } = useLibraryNovels();

  return (
    <LibraryContext.Provider value={{ novels, refetch }}>
      {props.children}
    </LibraryContext.Provider>
  );
};

export const useLibraryContext = () => useContext(LibraryContext);
