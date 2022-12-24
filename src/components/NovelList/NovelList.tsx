import React from 'react';
import {StyleSheet} from 'react-native';
import {FlashList, FlashListProps} from '@shopify/flash-list';

import {DatabaseNovel} from 'database/types';
import {SourceNovel} from 'sources/types';

import {NovelItem} from 'components/index';

import {Spacing} from 'theme/constants';

const NovelList: React.FC<
  Omit<FlashListProps<SourceNovel | DatabaseNovel>, 'renderItem'>
> = props => {
  return (
    <FlashList
      numColumns={3}
      estimatedItemSize={100}
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
