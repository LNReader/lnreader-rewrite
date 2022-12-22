import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import LibraryScreen from '../../screens/LibraryScreen/LibraryScreen';

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
        component={LibraryScreen}
        options={{tabBarIcon: 'compass-outline', tabBarLabel: 'Browse'}}
      />
      <Tab.Screen
        name="MoreScreen"
        component={LibraryScreen}
        options={{tabBarIcon: 'dots-horizontal', tabBarLabel: 'More'}}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
