import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BottomNavigator from 'navigators/BottomNavigator/BottomNavigator';
import SourceScreen from 'screens/SourceScreen/SourceScreen';
import NovelDetailsScreen from 'screens/NovelDetailsScreen/NovelDetailsScreen';
import ReaderScreen from 'screens/ReaderScreen/ReaderScreen';
import MoreStack from 'navigators/MoreStack/MoreStack';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
      <Stack.Screen name="SourceScreen" component={SourceScreen} />
      <Stack.Screen name="NovelDetailsScreen" component={NovelDetailsScreen} />
      <Stack.Screen name="ReaderScreen" component={ReaderScreen} />
      <Stack.Screen name="MoreStack" component={MoreStack} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
