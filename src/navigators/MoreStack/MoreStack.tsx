import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SettingsScreen from 'screens/SettingsScreen/SettingsScreen';
import AboutScreen from 'screens/AboutScreen/AboutScreen';

const Stack = createStackNavigator();

const stackNavigatorConfig = { headerShown: false };

const SettingsStack = () => (
  <Stack.Navigator screenOptions={stackNavigatorConfig}>
    <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
  </Stack.Navigator>
);

const MoreStack = () => (
  <Stack.Navigator screenOptions={stackNavigatorConfig}>
    <Stack.Screen name="SettingsStack" component={SettingsStack} />
    <Stack.Screen name="AboutScreen" component={AboutScreen} />
  </Stack.Navigator>
);

export default MoreStack;
