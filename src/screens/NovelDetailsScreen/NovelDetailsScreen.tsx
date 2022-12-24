import React from 'react';
import {RefreshControl} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';

import {SourceNovelDetails} from 'sources/types';
import {useNovelDetails} from 'hooks/useNovelDetails';

import {ChapterCard} from 'components/index';
import NovelDetailsHeader from 'components/NovelDetailsHeader/NovelDetailsHeader';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from 'hooks/useTheme';
import {
  NovelDetailsContext,
  useNovelDetailsContext,
} from 'contexts/NovelDetailsContext';
import {
  setMangaFavorite,
  toggleNovelFavorite,
} from 'database/queries/NovelQueries';

type NovelDetailsScreenRouteProps = RouteProp<{
  params: SourceNovelDetails & {id?: number};
}>;

interface NovelDetailsProps {
  sourceId: number;
}

const NovelDetails: React.FC<NovelDetailsProps> = ({sourceId}) => {
  const {theme} = useTheme();

  const {top: topInset} = useSafeAreaInsets();

  const progressViewOffset = topInset + 16;

  const {chapters, loading} = useNovelDetailsContext();

  return (
    <FlashList
      data={chapters}
      ListHeaderComponent={<NovelDetailsHeader />}
      renderItem={({item}) => (
        <ChapterCard chapter={item} sourceId={sourceId} />
      )}
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

const NovelDetailsScreen = () => {
  const {params: novelParams} = useRoute<NovelDetailsScreenRouteProps>();
  const novelDetails = useNovelDetails({
    novelParams,
    novelId: novelParams.id,
  });

  return (
    <NovelDetailsContext.Provider value={novelDetails}>
      <NovelDetails sourceId={novelParams.sourceId} />
    </NovelDetailsContext.Provider>
  );
};

export default NovelDetailsScreen;
