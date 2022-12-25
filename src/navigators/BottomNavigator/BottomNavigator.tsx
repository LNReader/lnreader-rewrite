import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import {useTheme} from 'hooks/useTheme';

import LibraryScreen from 'screens/LibraryScreen/LibraryScreen';
import BrowseScreen from 'screens/BrowseScreen/BrowseScreen';
import MoreScreen from 'screens/MoreScreen/MoreScreen';
import UpdatesScreen from 'screens/UpdatesScreen/UpdatesScreen';
import HistoryScreen from 'screens/HistoryScreen/HistoryScreen';

const Tab = createMaterialBottomTabNavigator();

const BottomNavigator = () => {
  const {theme} = useTheme();

  return (
    <Tab.Navigator
      barStyle={{
        backgroundColor: theme.surface2,
      }}>
      <Tab.Screen
        name="LibraryScreen"
        component={LibraryScreen}
        options={{tabBarIcon: 'book-variant-multiple', tabBarLabel: 'Library'}}
      />
      <Tab.Screen
        name="UpdatesScreen"
        component={UpdatesScreen}
        options={{tabBarIcon: 'alert-decagram-outline', tabBarLabel: 'Updates'}}
      />
      <Tab.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{tabBarIcon: 'history', tabBarLabel: 'History'}}
      />
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
