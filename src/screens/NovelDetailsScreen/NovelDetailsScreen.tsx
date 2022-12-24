import React from 'react';
import {RefreshControl, StyleSheet} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';

import {SourceNovelDetails} from 'sources/types';
import {useNovelDetails} from 'hooks/useNovelDetails';

import {ChapterCard, Text} from 'components/index';
import NovelDetailsHeader from 'components/NovelDetailsHeader/NovelDetailsHeader';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from 'hooks/useTheme';

type NovelDetailsScreenRouteProps = RouteProp<{
  params: SourceNovelDetails & {id?: number};
}>;

const NovelDetailsScreen = () => {
  const {theme} = useTheme();
  const {params: defaultNovel} = useRoute<NovelDetailsScreenRouteProps>();
  const {top: topInset} = useSafeAreaInsets();

  const progressViewOffset = topInset + 16;

  const {novel, chapters, loading, error} = useNovelDetails({
    defaultNovel,
    novelId: defaultNovel.id,
  });

  return (
    <FlashList
      data={chapters}
      ListHeaderComponent={<NovelDetailsHeader novel={novel} />}
      renderItem={({item}) => <ChapterCard chapter={item} />}
      estimatedItemSize={100}
      refreshControl={
        <RefreshControl
          progressViewOffset={progressViewOffset}
          refreshing={loading}
          colors={[theme.primary]}
          progressBackgroundColor={theme.onPrimary}
        />
      }
    />
  );
};

export default NovelDetailsScreen;

const styles = StyleSheet.create({});
