import React from 'react';
import {StyleSheet} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';

import {SourceNovelDetails} from 'sources/types';
import {useNovelDetails} from 'hooks/useNovelDetails';

import {Text} from 'components/index';

type NovelDetailsScreenRouteProps = RouteProp<{
  params: SourceNovelDetails & {id?: number};
}>;

const NovelDetailsScreen = () => {
  const {params: defaultNovel} = useRoute<NovelDetailsScreenRouteProps>();

  const {novel, chapters, loading, error} = useNovelDetails({
    defaultNovel,
    novelId: defaultNovel.id,
  });

  return (
    <FlashList
      data={chapters}
      renderItem={({item}) => <Text>{item.name}</Text>}
      estimatedItemSize={100}
    />
  );
};

export default NovelDetailsScreen;

const styles = StyleSheet.create({});
