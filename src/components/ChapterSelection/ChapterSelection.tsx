import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Appbar } from '@lnreader/core';
import { useTheme } from '@hooks';

import { ReaderFooterButton } from '@components/ReaderFooter/ReaderFooter';
import { useNovelDetailsContext } from '@contexts/NovelDetailsContext';

type Props = {
  selectedChapterIds: number[];
  setSelectedChapterIds: (chapterIds: number[]) => void;
  handleSelectAll: () => void;
};

const ChapterSelection: React.FC<Props> = ({
  selectedChapterIds,
  setSelectedChapterIds,
  handleSelectAll,
}) => {
  const { theme } = useTheme();
  const { bottom: paddingBottom } = useSafeAreaInsets();
  const { handleSetChaptersRead, handleSetChaptersUnread } =
    useNovelDetailsContext();

  const clearSelection = () => setSelectedChapterIds([]);

  if (!selectedChapterIds.length) {
    return null;
  }

  return (
    <>
      <Animated.View
        style={styles.appbarCtn}
        entering={FadeIn.duration(150)}
        exiting={FadeOut.duration(150)}
      >
        <Appbar
          mode="small"
          title={`${selectedChapterIds.length} selected`}
          backAction={clearSelection}
          actions={[{ icon: 'select-all', onPress: handleSelectAll }]}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.footerCtn,
          { backgroundColor: theme.surface2, paddingBottom },
        ]}
        entering={FadeIn.duration(150)}
        exiting={FadeOut.duration(150)}
      >
        <ReaderFooterButton iconName="download-outline" />
        <ReaderFooterButton iconName="trash-can-outline" />
        <ReaderFooterButton
          iconName="check"
          onPress={() => {
            handleSetChaptersRead(selectedChapterIds);
            clearSelection();
          }}
        />
        <ReaderFooterButton
          iconName="check-outline"
          onPress={() => {
            handleSetChaptersUnread(selectedChapterIds);
            clearSelection();
          }}
        />
      </Animated.View>
    </>
  );
};

export default ChapterSelection;

const styles = StyleSheet.create({
  appbarCtn: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
  },
  footerCtn: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    left: 0,
    right: 0,
    height: 96,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
});