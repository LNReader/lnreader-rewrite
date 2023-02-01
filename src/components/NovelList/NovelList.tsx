import React, { useCallback } from 'react';
import { FlatList, FlatListProps, StyleSheet } from 'react-native';

import { EmptyView } from '@lnreader/core';
import { DatabaseNovel, LibraryNovel } from '@database/types';
import { SourceNovel } from '@sources/types';

import NovelItem from '@components/NovelItem/NovelItem';

import { useAppSettings } from '@hooks';
import { Spacing } from '@theme/constants';
import { LibraryDisplayModes } from '@utils/LibraryUtils';

type ListNovel = SourceNovel | LibraryNovel;

const NovelList: React.FC<
  Omit<FlatListProps<ListNovel>, 'renderItem'> & {
    selected?: DatabaseNovel[];
    setSelected?: React.Dispatch<React.SetStateAction<DatabaseNovel[]>>;
  }
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
      renderItem={({ item }) => (
        <NovelItem
          novel={item}
          selected={props.selected}
          setSelected={props.setSelected}
        />
      )}
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
