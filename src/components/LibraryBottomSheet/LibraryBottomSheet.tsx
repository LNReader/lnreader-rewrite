import React, { useMemo, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SceneMap } from 'react-native-tab-view';
import { xor } from 'lodash';

import { useAppSettings } from '@hooks';
import {
  BottomSheetRef,
  BottomSheetTabView,
  Checkbox,
  Text,
  SortItem,
} from '@lnreader/core';
import {
  LibraryDisplayModes,
  libraryDisplayModesList,
  libraryFilterLabels,
  LibraryFilters,
  LibrarySortOrder,
  librarySortOrderList,
} from '@utils/libraryUtils';
import { Setting } from 'types/SettingTypes';

interface LibraryBottomSheetProps {
  bottomSheetRef: BottomSheetRef;
}

export const FilterRoute = () => {
  const { LIBRARY_FILTERS, setAppSettings } = useAppSettings();

  const onPress = (filter: LibraryFilters) =>
    setAppSettings(Setting.LIBRARY_FILTERS, xor(LIBRARY_FILTERS, [filter]));

  return (
    <View>
      {Object.values(LibraryFilters).map(filter => (
        <Checkbox
          key={filter}
          status={LIBRARY_FILTERS?.includes(filter)}
          label={libraryFilterLabels[filter]}
          onPress={() => {
            onPress(filter);
          }}
        />
      ))}
    </View>
  );
};

export const SortRoute = () => {
  const {
    LIBRARY_SORT_ORDER = LibrarySortOrder.DateAdded_ASC,
    setAppSettings,
  } = useAppSettings();

  const onPress = (sortOrder: LibrarySortOrder) =>
    setAppSettings(Setting.LIBRARY_SORT_ORDER, sortOrder);

  return (
    <View>
      {librarySortOrderList.map(sortOrder => (
        <SortItem
          key={sortOrder.ASC}
          status={
            LIBRARY_SORT_ORDER === sortOrder.ASC
              ? 'ASC'
              : LIBRARY_SORT_ORDER === sortOrder.DESC
              ? 'DESC'
              : undefined
          }
          label={sortOrder.label}
          onPress={() => {
            onPress(
              LIBRARY_SORT_ORDER === sortOrder.ASC
                ? sortOrder.DESC
                : sortOrder.ASC,
            );
          }}
        />
      ))}
    </View>
  );
};

export const DisplayRoute = () => {
  const {
    LIBRARY_SHOW_DOWNLOADS_BADGE = true,
    LIBRARY_SHOW_UNREAD_BADGE = true,
    LIBRARY_SHOW_NUMBER_OF_ITEMS,
    LIBRARY_DISPLAY_MODE = LibraryDisplayModes.Comfortable,
    setAppSettings,
  } = useAppSettings();

  return (
    <View>
      <Text style={styles.sectionHeader}>Display mode</Text>
      {libraryDisplayModesList.map(displayMode => (
        <Checkbox
          key={displayMode.value}
          status={displayMode.value === LIBRARY_DISPLAY_MODE}
          label={displayMode.label}
          onPress={() =>
            setAppSettings(Setting.LIBRARY_DISPLAY_MODE, displayMode.value)
          }
        />
      ))}

      <Text style={styles.sectionHeader}>Badges</Text>
      <Checkbox
        status={LIBRARY_SHOW_DOWNLOADS_BADGE}
        label="Downloaded chapters"
        onPress={() =>
          setAppSettings(
            Setting.LIBRARY_SHOW_DOWNLOADS_BADGE,
            !LIBRARY_SHOW_DOWNLOADS_BADGE,
          )
        }
      />
      <Checkbox
        status={LIBRARY_SHOW_UNREAD_BADGE}
        label="Unread chapters"
        onPress={() =>
          setAppSettings(
            Setting.LIBRARY_SHOW_UNREAD_BADGE,
            !LIBRARY_SHOW_UNREAD_BADGE,
          )
        }
      />
      <Text style={styles.sectionHeader}>Tabs</Text>
      <Checkbox
        status={LIBRARY_SHOW_NUMBER_OF_ITEMS}
        label="Show number of items"
        onPress={() =>
          setAppSettings(
            Setting.LIBRARY_SHOW_NUMBER_OF_ITEMS,
            !LIBRARY_SHOW_NUMBER_OF_ITEMS,
          )
        }
      />
    </View>
  );
};

const LibraryBottomSheet: React.FC<LibraryBottomSheetProps> = ({
  bottomSheetRef,
}: LibraryBottomSheetProps) => {
  const { bottom: bottomInset } = useSafeAreaInsets();
  const [animatedValue] = useState(new Animated.Value(0));

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

  const bottomSheetHeight = 600 + bottomInset;

  return (
    <BottomSheetTabView
      renderScene={renderScene}
      routes={routes}
      bottomSheetRef={bottomSheetRef}
      animatedValue={animatedValue}
      draggableRange={{ top: bottomSheetHeight, bottom: 0 }}
      snappingPoints={[0, 400, bottomSheetHeight]}
      height={bottomSheetHeight}
    />
  );
};

export default LibraryBottomSheet;

const styles = StyleSheet.create({
  sectionHeader: {
    padding: 16,
    paddingBottom: 8,
  },
});
