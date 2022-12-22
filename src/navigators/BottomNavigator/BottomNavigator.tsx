import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import LibraryScreen from 'screens/LibraryScreen/LibraryScreen';
import BrowseScreen from 'screens/BrowseScreen/BrowseScreen';
import MoreScreen from 'screens/MoreScreen/MoreScreen';

const Tab = createMaterialBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="LibraryScreen"
        component={LibraryScreen}
        options={{tabBarIcon: 'book-variant-multiple', tabBarLabel: 'Library'}}
      />
      <Tab.Screen
        name="UpdatesScreen"
        component={LibraryScreen}
        options={{tabBarIcon: 'alert-decagram-outline', tabBarLabel: 'Updates'}}
      />
      <Tab.Screen
        name="HistoryScreen"
        component={LibraryScreen}
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
