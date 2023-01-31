import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Appbar } from '@lnreader/core';
import { useBackHandler, useBoolean, useDownloader, useTheme } from '@hooks';

import { ReaderFooterButton } from '@components/ReaderFooter/ReaderFooter';
import { useLibraryContext } from '@contexts/LibraryContext';
import { deleteDownloadsByNovelIds } from '@database/queries/DownloadQueries';
import {
  setChaptersReadByNovelIds,
  setChaptersUnreadByNovelIds,
} from '@database/queries/ChapterQueries';
import SetCategoriesModal from '@components/SetCategoriesModal/SetCategoriesModal';
import { DatabaseNovel } from '@database/types';
import { flatten, uniq } from 'lodash-es';

interface Props {
  selected: DatabaseNovel[];
  setSelected: React.Dispatch<React.SetStateAction<DatabaseNovel[]>>;
  refetchLibrary: () => void;
}

const NovelSelection: React.FC<Props> = ({
  selected,
  setSelected,
  refetchLibrary,
}) => {
  const { theme } = useTheme();
  const { bottom: paddingBottom } = useSafeAreaInsets();

  const { downloadNovel } = useDownloader();
  const { novels } = useLibraryContext();

  const clearSelection = () => setSelected([]);
  const onSelectAll = () => setSelected(novels);

  const selectedIds = selected.map(novel => novel.id);
  const selectedCategories = uniq(
    flatten(selected.map(novel => JSON.parse(novel.categoryIds || ''))),
  ).filter(id => id !== 1);

  useBackHandler(() => {
    if (selected.length) {
      clearSelection();
      return true;
    }
    return false;
  });

  const onSelect = () => {
    clearSelection();
    refetchLibrary();
  };

  const setCategoriesModalState = useBoolean();

  if (!selected.length) {
    return null;
  }

  return (
    <>
      <Animated.View
        style={[styles.appbarCtn]}
        entering={FadeIn.duration(150)}
        exiting={FadeOut.duration(150)}
      >
        <Appbar
          mode="small"
          style={{ backgroundColor: theme.surface2 }}
          title={`${selected.length} selected`}
          backAction={clearSelection}
          actions={[{ icon: 'select-all', onPress: onSelectAll }]}
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
        <ReaderFooterButton
          iconName="label-outline"
          onPress={setCategoriesModalState.setTrue}
        />
        <ReaderFooterButton
          iconName="download-outline"
          onPress={() => {
            downloadNovel(selectedIds);
            onSelect();
          }}
        />
        <ReaderFooterButton
          iconName="check"
          onPress={() => {
            setChaptersReadByNovelIds(selectedIds);
            onSelect();
          }}
        />
        <ReaderFooterButton
          iconName="check-outline"
          onPress={() => {
            setChaptersUnreadByNovelIds(selectedIds);
            onSelect();
          }}
        />
        <ReaderFooterButton
          iconName="delete-outline"
          onPress={() => {
            deleteDownloadsByNovelIds(selectedIds);
            onSelect();
          }}
        />
      </Animated.View>
      <SetCategoriesModal
        novelIds={selectedIds}
        selectedCategories={selectedCategories}
        onDismiss={() => {
          setCategoriesModalState.setFalse();
          onSelect();
        }}
        visible={setCategoriesModalState.value}
      />
    </>
  );
};

export default NovelSelection;

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
