import React from 'react';
import {FlatList, FlatListProps, StyleSheet} from 'react-native';
import {FlashList, FlashListProps} from '@shopify/flash-list';

import {DatabaseNovel} from 'database/types';
import {SourceNovel} from 'sources/types';

import {NovelItem} from 'components/index';

import {Spacing} from 'theme/constants';

const NovelList: React.FC<
  Omit<FlatListProps<SourceNovel | DatabaseNovel>, 'renderItem'>
> = props => {
  return (
    <FlatList
      numColumns={3}
      contentContainerStyle={styles.contentCtnStyle}
      {...props}
      renderItem={({item}) => <NovelItem novel={item} />}
    />
  );
};

export default NovelList;

const styles = StyleSheet.create({
  contentCtnStyle: {
    padding: Spacing.XS,
  },
});
