import React, { useRef, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import {
  NavigationState,
  SceneRendererProps,
  TabBar,
  TabView,
} from 'react-native-tab-view';
import { Portal } from 'react-native-paper';
import {
  ErrorScreen,
  LoadingScreen,
  Row,
  Searchbar,
  Text,
  BottomSheetType,
} from '@lnreader/core';

import { useTheme, useLibrary, useSearchText, useAppSettings } from '@hooks';

import LibraryView from '@components/LibraryView/LibraryView';
import LibraryBottomSheet from '@components/LibraryBottomSheet/LibraryBottomSheet';

import { Spacing } from '@theme/constants';

type State = NavigationState<{
  key: string;
  title: string;
}>;

const LibraryScreen = () => {
  const { theme } = useTheme();
  const layout = useWindowDimensions();
  const { LIBRARY_SHOW_NUMBER_OF_ITEMS } = useAppSettings();

  const { searchText, setSearchText } = useSearchText();
  const { error, loading, library } = useLibrary({ searchTerm: searchText });
  const bottomSheetRef = useRef<BottomSheetType>(null);

  const [index, setIndex] = useState(0);

  const renderTabBar = (
    props: SceneRendererProps & { navigationState: State },
  ) => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={{ backgroundColor: theme.primary }}
      style={[
        {
          backgroundColor: theme.surface,
          borderBottomColor: theme.outlineVariant,
        },
        styles.tabBar,
      ]}
      renderLabel={({ route, color }) => (
        <Row>
          <Text style={{ color }}>{route.title}</Text>
          <View
            style={[styles.badgeCtn, { backgroundColor: theme.surfaceVariant }]}
          >
            {LIBRARY_SHOW_NUMBER_OF_ITEMS && (
              <Text size={12}>{(route as any)?.novels.length}</Text>
            )}
          </View>
        </Row>
      )}
      inactiveColor={theme.secondary}
      activeColor={theme.primary}
      pressColor={theme.rippleColor}
    />
  );

  return (
    <>
      <Searchbar
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search library"
        actions={[
          {
            icon: 'filter-variant',
            onPress: () => bottomSheetRef.current?.show(),
          },
        ]}
      />
      {loading ? (
        <LoadingScreen />
      ) : (
        <TabView
          lazy
          navigationState={{
            index,
            routes: library.map(category => ({
              key: String(category.id),
              title: category.name,
              ...category,
            })),
          }}
          renderTabBar={renderTabBar}
          renderScene={({ route }) =>
            error ? (
              <ErrorScreen error={error} />
            ) : (
              <LibraryView categoryId={route.id} novels={route.novels} />
            )
          }
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      )}
      <Portal>
        <LibraryBottomSheet bottomSheetRef={bottomSheetRef} />
      </Portal>
    </>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  tabBar: {
    elevation: 0,
    borderBottomWidth: 1,
  },
  badgeCtn: {
    borderRadius: 50,
    marginHorizontal: Spacing.XS,
    paddingHorizontal: 6,
  },
});
