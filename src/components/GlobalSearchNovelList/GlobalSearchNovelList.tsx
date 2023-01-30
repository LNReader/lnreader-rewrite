import React, { useCallback } from 'react';
import { FlatList, FlatListProps, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EmptyView } from '@lnreader/core';
import { useAppSettings } from '@hooks';
import { GlobalSearchResult } from '@hooks/useGlobalSearch';
import GlobalSearchItem from './GlobalSearchItem';

interface GlobalSearchNovelList extends FlatListProps<GlobalSearchResult> {
  searchText?: string;
}

const GlobalSearchNovelList: React.FC<
  Omit<GlobalSearchNovelList, 'renderItem'>
> = props => {
  const { ONLY_INCLUDE_PINNED_SOURCES = true } = useAppSettings();
  const { bottom: paddingBottom } = useSafeAreaInsets();

  const keyExtractor = useCallback(
    (item: GlobalSearchResult) => `${item.source.id}`,
    [],
  );

  return (
    <FlatList
      keyExtractor={keyExtractor}
      contentContainerStyle={[styles.contentCtnStyle, { paddingBottom }]}
      {...props}
      renderItem={({ item }) => (
        <GlobalSearchItem data={item} searchText={props.searchText} />
      )}
      ListEmptyComponent={
        <EmptyView
          description={`Search in ${
            ONLY_INCLUDE_PINNED_SOURCES ? 'pinned sources' : 'all sources'
          }.`}
        />
      }
    />
  );
};

export default GlobalSearchNovelList;

const styles = StyleSheet.create({
  contentCtnStyle: {
    flexGrow: 1,
  },
});
