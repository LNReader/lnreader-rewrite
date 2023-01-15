import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BottomNavigator from '@navigators/BottomNavigator/BottomNavigator';
import MoreStack from '@navigators/MoreStack/MoreStack';
import SourceScreen from '@screens/SourceScreen/SourceScreen';
import NovelDetailsScreen from '@screens/NovelDetailsScreen/NovelDetailsScreen';
import ReaderScreen from '@screens/ReaderScreen/ReaderScreen';
import WebviewScreen from '@screens/WebviewScreen/WebviewScreen';
import BrowseSettingsScreen from '@screens/BrowseSettingsScreen/BrowseSettingsScreen';
import GlobalSearchScreen from '@screens/GlobalSearchScreen/GlobalSearchScreen';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
      <Stack.Screen name="SourceScreen" component={SourceScreen} />
      <Stack.Screen
        name="BrowseSettingsScreen"
        component={BrowseSettingsScreen}
      />
      <Stack.Screen name="WebviewScreen" component={WebviewScreen} />
      <Stack.Screen name="GlobalSearchScreen" component={GlobalSearchScreen} />
      <Stack.Screen name="NovelDetailsScreen" component={NovelDetailsScreen} />
      <Stack.Screen name="ReaderScreen" component={ReaderScreen} />
      <Stack.Screen name="MoreStack" component={MoreStack} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
