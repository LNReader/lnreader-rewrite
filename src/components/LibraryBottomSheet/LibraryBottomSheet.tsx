import React, {useMemo, useState} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SceneMap} from 'react-native-tab-view';

import {BottomSheetTabView, Checkbox} from 'components/index';
import {BottomSheetRef} from 'components/BottomSheet/BottomSheet';
import useAppSettings from 'hooks/useAppSettings';
import {
  libraryFilterLabels,
  LibraryFilters,
  LibrarySortOrder,
  librarySortOrderList,
} from 'utils/libraryUtils';
import {xor} from 'lodash';
import {SortItem} from 'components/Checkbox/Checkbox';
import {Setting} from 'types/SettingTypes';

interface LibraryBottomSheetProps {
  bottomSheetRef: BottomSheetRef;
}

export const FilterRoute = () => {
  const {LIBRARY_FILTERS, setAppSettings} = useAppSettings();

  const onPress = (filter: LibraryFilters) =>
    setAppSettings('LIBRARY_FILTERS', xor(LIBRARY_FILTERS, [filter]));

  return (
    <View>
      {Object.values(LibraryFilters).map(filter => (
        <Checkbox
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
  const {LIBRARY_SORT_ORDER, setAppSettings} = useAppSettings();

  const onPress = (sortOrder: LibrarySortOrder) =>
    setAppSettings(Setting.LIBRARY_SORT_ORDER, sortOrder);

  return (
    <View>
      {librarySortOrderList.map(sortOrder => (
        <SortItem
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
  return <Text>DisplayRoute</Text>;
};

const LibraryBottomSheet: React.FC<LibraryBottomSheetProps> = ({
  bottomSheetRef,
}: LibraryBottomSheetProps) => {
  const {bottom: bottomInset} = useSafeAreaInsets();
  const [animatedValue] = useState(new Animated.Value(0));

  const routes = useMemo(
    () => [
      {key: 'first', title: 'Filter'},
      {key: 'second', title: 'Sort'},
      {key: 'third', title: 'Display'},
    ],
    [],
  );

  const renderScene = SceneMap({
    first: FilterRoute,
    second: SortRoute,
    third: DisplayRoute,
  });

  const bottomSheetHeight = 400 + bottomInset;

  return (
    <BottomSheetTabView
      renderScene={renderScene}
      routes={routes}
      bottomSheetRef={bottomSheetRef}
      animatedValue={animatedValue}
      draggableRange={{top: bottomSheetHeight, bottom: 0}}
      snappingPoints={[0, bottomSheetHeight]}
      height={bottomSheetHeight}
    />
  );
};

export default LibraryBottomSheet;

const styles = StyleSheet.create({});
