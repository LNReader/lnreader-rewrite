import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SettingsScreen from '@screens/SettingsScreens/SettingsScreen';
import AppearanceSettingsScreen from '@screens/SettingsScreens/AppearanceSettingsScreen/AppearanceSettingsScreen';
import GeneralSettingsScreen from '@screens/GeneralSettingsScreen/GeneralSettingsScreen';

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
  </Stack.Navigator>
);

export default SettingsStack;
