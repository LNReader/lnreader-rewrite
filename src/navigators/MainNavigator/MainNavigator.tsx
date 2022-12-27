import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BottomNavigator from '@navigators/BottomNavigator/BottomNavigator';
import MoreStack from '@navigators/MoreStack/MoreStack';
import SourceScreen from '@screens/SourceScreen/SourceScreen';
import NovelDetailsScreen from '@screens/NovelDetailsScreen/NovelDetailsScreen';
import ReaderScreen from '@screens/ReaderScreen/ReaderScreen';
import SourceWebviewScreen from '@screens/SourceWebviewScreen/SourceWebviewScreen';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
      <Stack.Screen name="SourceScreen" component={SourceScreen} />
      <Stack.Screen
        name="SourceWebviewScreen"
        component={SourceWebviewScreen}
      />
      <Stack.Screen name="NovelDetailsScreen" component={NovelDetailsScreen} />
      <Stack.Screen name="ReaderScreen" component={ReaderScreen} />
      <Stack.Screen name="MoreStack" component={MoreStack} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
