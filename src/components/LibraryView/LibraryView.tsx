import React from 'react';
import { RefreshControl, StyleSheet } from 'react-native';

import { useLibraryUpdate, useTheme } from '@hooks';
import { DatabaseNovel, LibraryNovel } from '@database/types';

import NovelList from '@components/NovelList/NovelList';

interface LibraryViewProps {
  categoryId: number;
  novels: LibraryNovel[];
  selected: DatabaseNovel[];
  setSelected?: React.Dispatch<React.SetStateAction<DatabaseNovel[]>>;
}

const LibraryView: React.FC<LibraryViewProps> = ({
  novels,
  categoryId,
  selected,
  setSelected,
}) => {
  const { theme } = useTheme();
  const { updateLibrary } = useLibraryUpdate();

  return (
    <NovelList
      data={novels}
      selected={selected}
      setSelected={setSelected}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => updateLibrary({ categoryId })}
          colors={[theme.onPrimary]}
          progressBackgroundColor={theme.primary}
        />
      }
    />
  );
};

export default LibraryView;

const styles = StyleSheet.create({});
