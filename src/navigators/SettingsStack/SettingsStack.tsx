import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SettingsScreen from '@screens/SettingsScreens/SettingsScreen';
import AppearanceSettingsScreen from '@screens/SettingsScreens/AppearanceSettingsScreen/AppearanceSettingsScreen';
import GeneralSettingsScreen from '@screens/GeneralSettingsScreen/GeneralSettingsScreen';
import LibrarySettingsScreen from '@screens/LibrarySettingsScreen/LibrarySettingsScreen';
import DownloadsSettingsScreen from '@screens/DownloadsSettingsScreen/DownloadsSettingsScreen';
import ReaderSettingsScreen from '@screens/ReaderSettingsScreen/ReaderSettingsScreen';
import AdvancedSettingsScreen from '@screens/AdvancedSettingsScreen/AdvancedSettingsScreen';

const Stack = createStackNavigator();

const stackNavigatorConfig = { headerShown: false };

const SettingsStack = () => (
  <Stack.Navigator screenOptions={stackNavigatorConfig}>
    <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    <Stack.Screen
      name="AppearanceSettingsScreen"
      component={AppearanceSettingsScreen}
    />
    <Stack.Screen
      name="GeneralSettingsScreen"
      component={GeneralSettingsScreen}
    />
    <Stack.Screen
      name="LibrarySettingsScreen"
      component={LibrarySettingsScreen}
    />
    <Stack.Screen
      name="DownloadsSettingsScreen"
      component={DownloadsSettingsScreen}
    />
    <Stack.Screen
      name="ReaderSettingsScreen"
      component={ReaderSettingsScreen}
    />
    <Stack.Screen
      name="AdvancedSettingsScreen"
      component={AdvancedSettingsScreen}
    />
  </Stack.Navigator>
);

export default SettingsStack;
