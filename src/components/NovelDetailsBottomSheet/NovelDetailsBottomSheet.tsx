import React, { useMemo, useState } from 'react';
import { Animated, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SceneMap } from 'react-native-tab-view';
import { xor } from 'lodash';

import {
  BottomSheetRef,
  BottomSheetTabView,
  Checkbox,
  SortItem,
} from '@lnreader/core';
import { useNovelStorage } from '@hooks';
import { NovelStorageSetting } from '@hooks/useNovelStorage';
import { useNovelDetailsContext } from '@contexts/NovelDetailsContext';
import {
  NovelFilterLabels,
  NovelFilters,
  NovelSortOrder,
  novelSortOrderList,
} from '@utils/NovelUtils';

interface NovelDetailsBottomSheetProps {
  bottomSheetRef: BottomSheetRef;
}

export const FilterRoute = () => {
  const { novel } = useNovelDetailsContext();
  const { FILTERS, setNovelStorage } = useNovelStorage(novel.id);

  const onPress = (filter: NovelFilters) =>
    setNovelStorage(NovelStorageSetting.FILTERS, xor(FILTERS, [filter]));

  return (
    <View>
      {Object.values(NovelFilters).map(filter => (
        <Checkbox
          key={filter}
          status={FILTERS?.includes(filter)}
          label={NovelFilterLabels[filter]}
          onPress={() => {
            onPress(filter);
          }}
        />
      ))}
    </View>
  );
};

export const SortRoute = () => {
  const { novel } = useNovelDetailsContext();
  const { SORT_ORDER = NovelSortOrder.BY_SOURCE_ASC, setNovelStorage } =
    useNovelStorage(novel.id);

  const onPress = (sortOrder: NovelSortOrder) =>
    setNovelStorage(NovelStorageSetting.SORT_ORDER, sortOrder);

  return (
    <View>
      {novelSortOrderList.map(sortOrder => (
        <SortItem
          key={sortOrder.ASC}
          status={
            SORT_ORDER === sortOrder.ASC
              ? 'ASC'
              : SORT_ORDER === sortOrder.DESC
              ? 'DESC'
              : undefined
          }
          label={sortOrder.label}
          onPress={() => {
            onPress(
              SORT_ORDER === sortOrder.ASC ? sortOrder.DESC : sortOrder.ASC,
            );
          }}
        />
      ))}
    </View>
  );
};

export const DisplayRoute = () => {
  const { novel } = useNovelDetailsContext();
  const { SHOW_CHAPTER_NUMBERS = false, setNovelStorage } = useNovelStorage(
    novel.id,
  );

  return (
    <View>
      <Checkbox
        status={!SHOW_CHAPTER_NUMBERS}
        label="Source title"
        onPress={() =>
          setNovelStorage(NovelStorageSetting.SHOW_CHAPTER_NUMBERS, false)
        }
      />
      <Checkbox
        status={SHOW_CHAPTER_NUMBERS}
        label="Chapter number"
        onPress={() =>
          setNovelStorage(NovelStorageSetting.SHOW_CHAPTER_NUMBERS, true)
        }
      />
    </View>
  );
};

const NovelDetailsBottomSheet: React.FC<NovelDetailsBottomSheetProps> = ({
  bottomSheetRef,
}: NovelDetailsBottomSheetProps) => {
  const { bottom: bottomInset } = useSafeAreaInsets();

  const routes = useMemo(
    () => [
      { key: 'first', title: 'Filter' },
      { key: 'second', title: 'Sort' },
      { key: 'third', title: 'Display' },
    ],
    [],
  );

  const renderScene = SceneMap({
    first: FilterRoute,
    second: SortRoute,
    third: DisplayRoute,
  });

  const bottomSheetHeight = 200 + bottomInset;

  return (
    <BottomSheetTabView
      renderScene={renderScene}
      routes={routes}
      bottomSheetRef={bottomSheetRef}
      snapPoints={[0.1, bottomSheetHeight]}
      containerHeight={bottomSheetHeight}
    />
  );
};

export default NovelDetailsBottomSheet;
