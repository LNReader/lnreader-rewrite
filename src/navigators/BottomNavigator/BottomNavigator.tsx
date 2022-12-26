import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import {useTheme} from 'hooks/useTheme';
import useAppSettings from 'hooks/useAppSettings';

import LibraryScreen from 'screens/LibraryScreen/LibraryScreen';
import BrowseScreen from 'screens/BrowseScreen/BrowseScreen';
import MoreScreen from 'screens/MoreScreen/MoreScreen';
import UpdatesScreen from 'screens/UpdatesScreen/UpdatesScreen';
import HistoryScreen from 'screens/HistoryScreen/HistoryScreen';

const Tab = createMaterialBottomTabNavigator();

const BottomNavigator = () => {
  const {theme} = useTheme();
  const {
    SHOW_UPDATES_TAB = true,
    SHOW_HISTORY_TAB = true,
    SHOW_LABELS_IN_NAV = true,
  } = useAppSettings();

  return (
    <Tab.Navigator
      barStyle={{
        backgroundColor: theme.surface2,
      }}
      labeled={SHOW_LABELS_IN_NAV}>
      <Tab.Screen
        name="LibraryScreen"
        component={LibraryScreen}
        options={{tabBarIcon: 'book-variant-multiple', tabBarLabel: 'Library'}}
      />
      {SHOW_UPDATES_TAB && (
        <Tab.Screen
          name="UpdatesScreen"
          component={UpdatesScreen}
          options={{
            tabBarIcon: 'alert-decagram-outline',
            tabBarLabel: 'Updates',
          }}
        />
      )}
      {SHOW_HISTORY_TAB && (
        <Tab.Screen
          name="HistoryScreen"
          component={HistoryScreen}
          options={{tabBarIcon: 'history', tabBarLabel: 'History'}}
        />
      )}
      <Tab.Screen
        name="BrowseScreen"
        component={BrowseScreen}
        options={{tabBarIcon: 'compass-outline', tabBarLabel: 'Browse'}}
      />
      <Tab.Screen
        name="MoreScreen"
        component={MoreScreen}
        options={{tabBarIcon: 'dots-horizontal', tabBarLabel: 'More'}}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
