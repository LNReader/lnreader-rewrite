import React, {useState} from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {
  NavigationState,
  SceneRendererProps,
  TabBar,
  TabView,
} from 'react-native-tab-view';

import {useSearchText} from 'hooks/useSearchText';

import {
  ErrorScreen,
  LoadingScreen,
  Row,
  Searchbar,
  Text,
} from 'components/index';
import {useLibrary} from 'hooks/useLibrary';
import {useTheme} from 'hooks/useTheme';
import LibraryView from 'components/LibraryView/LibraryView';
import {Spacing} from 'theme/constants';

type State = NavigationState<{
  key: string;
  title: string;
}>;

const LibraryScreen = () => {
  const {theme} = useTheme();
  const {searchText, setSearchText} = useSearchText();

  const {error, loading, library} = useLibrary();

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);

  const renderTabBar = (
    props: SceneRendererProps & {navigationState: State},
  ) => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={{backgroundColor: theme.primary}}
      style={[
        {
          backgroundColor: theme.surface,
          borderBottomColor: theme.outlineVariant,
        },
        styles.tabBar,
      ]}
      renderLabel={({route, color}) => (
        <Row>
          <Text style={{color}}>{route.title}</Text>
          <View
            style={[styles.badgeCtn, {backgroundColor: theme.surfaceVariant}]}>
            <Text size={12}>{(route as any)?.novels.length}</Text>
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
      />
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
        renderScene={({route}) =>
          loading ? (
            <LoadingScreen />
          ) : error ? (
            <ErrorScreen error={error} />
          ) : (
            <LibraryView categoryId={route.id} novels={route.novels} />
          )
        }
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
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
