import React, { useRef } from 'react';
import { RefreshControl } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomSheetType } from '@lnreader/core';
import { useNovelDetails, useTheme } from '@hooks';
import {
  NovelDetailsContext,
  useNovelDetailsContext,
} from '@contexts/NovelDetailsContext';
import { SourceNovelDetails } from '@sources/types';

import NovelDetailsHeader from '@components/NovelDetailsHeader/NovelDetailsHeader';
import NovelDetailsBottomSheet from '@components/NovelDetailsBottomSheet/NovelDetailsBottomSheet';
import ChapterCard from '@components/ChapterCard/ChapterCard';

type NovelDetailsScreenRouteProps = RouteProp<{
  params: SourceNovelDetails & { id?: number };
}>;

interface NovelDetailsProps {
  sourceId: number;
}

const NovelDetails: React.FC<NovelDetailsProps> = ({ sourceId }) => {
  const { theme } = useTheme();
  const bottomSheetRef = useRef<BottomSheetType>(null);

  const { top: topInset } = useSafeAreaInsets();
  const progressViewOffset = topInset + 16;

  const { chapters, loading } = useNovelDetailsContext();

  return (
    <>
      <FlashList
        data={chapters}
        ListHeaderComponent={
          <NovelDetailsHeader bottomSheetRef={bottomSheetRef} />
        }
        renderItem={({ item }) => (
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
      <NovelDetailsBottomSheet bottomSheetRef={bottomSheetRef} />
    </>
  );
};

const NovelDetailsScreen = () => {
  const { params: novelParams } = useRoute<NovelDetailsScreenRouteProps>();
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
