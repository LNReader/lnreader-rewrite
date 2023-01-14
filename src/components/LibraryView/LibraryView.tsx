import React from 'react';
import { RefreshControl, StyleSheet } from 'react-native';

import { useLibraryUpdate, useTheme } from '@hooks';
import { LibraryNovel } from '@database/types';

import NovelList from '@components/NovelList/NovelList';

interface LibraryViewProps {
  categoryId: number;
  novels: LibraryNovel[];
}

const LibraryView: React.FC<LibraryViewProps> = ({ novels, categoryId }) => {
  const { theme } = useTheme();
  const { updateLibrary } = useLibraryUpdate();

  return (
    <NovelList
      data={novels}
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
