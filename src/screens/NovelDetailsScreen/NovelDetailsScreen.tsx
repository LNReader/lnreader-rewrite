import React, { useRef } from 'react';
import { RefreshControl, StatusBar, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Appbar, BottomSheetType } from '@lnreader/core';
import { useBoolean, useNovelDetails, useTheme } from '@hooks';
import {
  NovelDetailsContext,
  useNovelDetailsContext,
} from '@contexts/NovelDetailsContext';
import { SourceNovelDetails } from '@sources/types';

import NovelDetailsHeader from '@components/NovelDetailsHeader/NovelDetailsHeader';
import NovelDetailsBottomSheet from '@components/NovelDetailsBottomSheet/NovelDetailsBottomSheet';
import ChapterCard from '@components/ChapterCard/ChapterCard';
import SettingBanners from '@components/SettingBanners/SettingBanners';
import ChapterSelection from '@components/ChapterSelection/ChapterSelection';
import { useState } from 'react';
import JumpToChapterModal from '@components/JumpToChapterModal/JumpToChapterModal';
import { DatabaseChapter } from '@database/types';

type NovelDetailsScreenRouteProps = RouteProp<{
  params: SourceNovelDetails & { id?: number };
}>;

interface NovelDetailsProps {
  sourceId: number;
}

const NovelDetails: React.FC<NovelDetailsProps> = ({ sourceId }) => {
  const { theme } = useTheme();
  const { top: topInset } = useSafeAreaInsets();
  const progressViewOffset = topInset + 16;

  const { chapters, loading, updateNovel } = useNovelDetailsContext();

  const [selectedChapterIds, setSelectedChapterIds] = useState<number[]>([]);

  const bottomSheetRef = useRef<BottomSheetType>(null);
  const listRef = useRef<FlashList<DatabaseChapter> | null>(null);

  const handleSelectAll = () =>
    setSelectedChapterIds(chapters?.map(chapter => chapter.id) || []);

  const jumpToChapterModalState = useBoolean();

  return (
    <>
      <Appbar
        mode="small"
        style={styles.appbarCtn}
        statusBarHeight={0}
        actions={[
          {
            icon: 'text-box-search-outline',
            onPress: jumpToChapterModalState.setTrue,
          },
        ]}
      />
      <FlashList
        ref={listRef}
        data={chapters}
        ListHeaderComponent={
          <NovelDetailsHeader bottomSheetRef={bottomSheetRef} />
        }
        extraData={[selectedChapterIds]}
        renderItem={({ item }) => (
          <ChapterCard
            chapter={item}
            sourceId={sourceId}
            selectedChapterIds={selectedChapterIds}
            setSelectedChapterIds={setSelectedChapterIds}
          />
        )}
        estimatedItemSize={100}
        refreshControl={
          <RefreshControl
            progressViewOffset={progressViewOffset}
            refreshing={loading}
            colors={[theme.primary]}
            progressBackgroundColor={theme.onPrimary}
            onRefresh={updateNovel}
          />
        }
        contentContainerStyle={styles.listCtn}
      />
      <ChapterSelection
        selectedChapterIds={selectedChapterIds}
        setSelectedChapterIds={setSelectedChapterIds}
        handleSelectAll={handleSelectAll}
      />
      <NovelDetailsBottomSheet bottomSheetRef={bottomSheetRef} />
      <JumpToChapterModal
        listRef={listRef.current}
        onDismiss={jumpToChapterModalState.setFalse}
        visible={jumpToChapterModalState.value}
      />
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
    <>
      <SettingBanners />
      <NovelDetailsContext.Provider value={novelDetails}>
        <NovelDetails sourceId={novelParams.sourceId} />
      </NovelDetailsContext.Provider>
    </>
  );
};

export default NovelDetailsScreen;

const styles = StyleSheet.create({
  listCtn: {
    paddingBottom: 80,
  },
  appbarCtn: {
    position: 'absolute',
    zIndex: 1,
    top: StatusBar.currentHeight,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
});
