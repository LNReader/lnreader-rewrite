import React, { useCallback } from 'react';
import { FlatList, FlatListProps, StyleSheet } from 'react-native';

import { EmptyView } from '@lnreader/core';
import { LibraryNovel } from '@database/types';
import { SourceNovel } from '@sources/types';

import NovelItem from '@components/NovelItem/NovelItem';

import { useAppSettings } from '@hooks';
import { Spacing } from '@theme/constants';
import { LibraryDisplayModes } from '@utils/libraryUtils';

type ListNovel = SourceNovel | LibraryNovel;

const NovelList: React.FC<
  Omit<FlatListProps<ListNovel>, 'renderItem'>
> = props => {
  const { LIBRARY_DISPLAY_MODE } = useAppSettings();

  const keyExtractor = useCallback(
    (item: ListNovel) => item.sourceId + item.url,
    [],
  );

  return (
    <FlatList
      keyExtractor={keyExtractor}
      numColumns={3}
      contentContainerStyle={
        LIBRARY_DISPLAY_MODE !== LibraryDisplayModes.List &&
        styles.contentCtnStyle
      }
      {...props}
      renderItem={({ item }) => <NovelItem novel={item} />}
      ListEmptyComponent={<EmptyView />}
    />
  );
};

export default NovelList;

const styles = StyleSheet.create({
  contentCtnStyle: {
    flexGrow: 1,
    padding: Spacing.XS,
  },
});
