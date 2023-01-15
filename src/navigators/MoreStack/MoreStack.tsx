import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SettingsStack from '@navigators/SettingsStack/SettingsStack';
import AboutScreen from '@screens/AboutScreen/AboutScreen';
import CategoriesScreen from '@screens/CategoriesScreen/CategoriesScreen';
import DownloadQueueScreen from '@screens/DownloadQueueScreen/DownloadQueueScreen';
import DownloadsScreen from '@screens/DownloadsScreen/DownloadsScreen';

const Stack = createStackNavigator();

const stackNavigatorConfig = { headerShown: false };

const MoreStack = () => (
  <Stack.Navigator screenOptions={stackNavigatorConfig}>
    <Stack.Screen name="SettingsStack" component={SettingsStack} />
    <Stack.Screen name="AboutScreen" component={AboutScreen} />
    <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
    <Stack.Screen name="DownloadQueueScreen" component={DownloadQueueScreen} />
    <Stack.Screen name="DownloadsScreen" component={DownloadsScreen} />
  </Stack.Navigator>
);

export default MoreStack;
