import React, {useCallback} from 'react';
import {FlatList, FlatListProps, StyleSheet} from 'react-native';

import {LibraryNovel} from 'database/types';
import {SourceNovel} from 'sources/types';

import {NovelItem, EmptyView} from 'components/index';

import {Spacing} from 'theme/constants';

type ListNovel = SourceNovel | LibraryNovel;

const NovelList: React.FC<
  Omit<FlatListProps<ListNovel>, 'renderItem'>
> = props => {
  const keyExtractor = useCallback(
    (item: ListNovel) => item.sourceId + item.url,
    [],
  );

  return (
    <FlatList
      keyExtractor={keyExtractor}
      numColumns={3}
      contentContainerStyle={styles.contentCtnStyle}
      {...props}
      renderItem={({item}) => <NovelItem novel={item} />}
      ListEmptyComponent={<EmptyView />}
    />
  );
};

export default NovelList;

const styles = StyleSheet.create({
  contentCtnStyle: {
    padding: Spacing.XS,
  },
});
